import { call, put, take, delay, race } from "redux-saga/effects";
import { eventChannel, END, EventChannel } from "redux-saga";
import axios, { CancelTokenSource } from "axios";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";
// your existing axios instance
import {
  CreateVideoPayload,
  videoPresignSuccess,
  videoPresignFailure,
  videoS3UploadProgress,
  videoS3UploadSuccess,
  videoS3UploadFailure,
  videoConfirmSuccess,
  videoConfirmFailure,
  videoPollSuccess,
  videoPollFailure,
} from "../actions";
import { API } from "../../utils/axios";

// ─── Constants ────────────────────────────────────────────────────────────────

const POLL_INTERVAL_MS = 5000;
const POLL_MAX_ATTEMPTS = 24; // 24 × 5s = 2 minutes max
const POLL_TIMEOUT_MS = 130000; // 2 min 10 sec hard timeout

// ─── Internal Types ───────────────────────────────────────────────────────────

interface PresignResponse {
  videoId: string;
  presignedUrl: string;
  expiresInSeconds: number;
}

interface StatusResponse {
  videoId: string;
  status: "pending" | "processing" | "completed" | "failed";
  s3Url: string | null;
  errorMessage: string | null;
}

interface PresignResult {
  videoId: string;
  presignedUrl: string;
}

interface S3UploadEvent {
  type: "PROGRESS" | "SUCCESS" | "ERROR";
  percent?: number;
  message?: string;
}

interface VideoPresignRequestAction {
  type: string;
  payload: CreateVideoPayload;
  userId: string;
}

// ─── Phase 1: Request Presigned URL ──────────────────────────────────────────

function* presignSaga(
  payload: CreateVideoPayload,
  userId: string
): Generator<unknown, PresignResult | null, AxiosResponse<PresignResponse>> {
  try {
    const response = yield call([API, API.post], `/videos/presign/${userId}`, {
      name: payload.name,
      description: payload.description,
      mimetype: payload.mimetype,
      originalName: payload.originalName,
      fileSize: payload.fileSize,
    });

    const { videoId, presignedUrl } = response.data;
    yield put(videoPresignSuccess(videoId, presignedUrl));
    return { videoId, presignedUrl };
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    const message = err.response?.data?.message || "Failed to prepare upload";
    yield put(videoPresignFailure(message));
    return null;
  }
}

// ─── Phase 2: Upload Directly to S3 ──────────────────────────────────────────
// Uses an event channel to bridge axios onUploadProgress callbacks
// into the Redux Saga world cleanly.

function createS3UploadChannel(
  presignedUrl: string,
  file: File,
  cancelSource: CancelTokenSource
): EventChannel<S3UploadEvent> {
  return eventChannel<S3UploadEvent>((emit) => {
    axios
      .put(presignedUrl, file, {
        headers: {
          // Only Content-Type — no Authorization header for S3 presigned URLs
          "Content-Type": file.type,
        },
        cancelToken: cancelSource.token,
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            emit({ type: "PROGRESS", percent });
          }
        },
      })
      .then(() => {
        emit({ type: "SUCCESS" });
        emit(END);
      })
      .catch((error: unknown) => {
        if (!axios.isCancel(error)) {
          const err = error as { message?: string };
          emit({ type: "ERROR", message: err.message });
        }
        emit(END);
      });

    // Unsubscribe function — called when channel is closed
    return () => {
      cancelSource.cancel("Upload cancelled by user");
    };
  });
}

function* s3UploadSaga(
  presignedUrl: string,
  file: File
): Generator<unknown, boolean, unknown> {
  const cancelSource = axios.CancelToken.source();
  const channel = (yield call(
    createS3UploadChannel,
    presignedUrl,
    file,
    cancelSource
  )) as EventChannel<S3UploadEvent>;

  try {
    while (true) {
      const event = (yield take(channel)) as S3UploadEvent;

      if (event.type === "PROGRESS") {
        yield put(videoS3UploadProgress(event.percent ?? 0));
      } else if (event.type === "SUCCESS") {
        yield put(videoS3UploadSuccess());
        return true;
      } else if (event.type === "ERROR") {
        yield put(videoS3UploadFailure(event.message || "Upload to S3 failed"));
        return false;
      }
    }
  } finally {
    channel.close();
  }
}

// ─── Phase 3: Confirm Upload ──────────────────────────────────────────────────

function* confirmUploadSaga(
  videoId: string,
  userId: string
): Generator<unknown, boolean, void> {
  try {
    yield call([API, API.post], `/videos/${videoId}/confirm/${userId}`);
    yield put(videoConfirmSuccess());
    return true;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    const message = err.response?.data?.message || "Failed to confirm upload";
    yield put(videoConfirmFailure(message));
    return false;
  }
}

// ─── Phase 4: Poll Processing Status ─────────────────────────────────────────

function* pollStatusSaga(
  videoId: string,
  userId: string
): Generator<unknown, void, AxiosResponse<StatusResponse>> {
  let attempts = 0;

  while (attempts < POLL_MAX_ATTEMPTS) {
    try {
      const response = yield call(
        [API, API.get],
        `/videos/${videoId}/status/${userId}`
      );

      const { status, s3Url, errorMessage } = response.data;

      if (status === "completed") {
        if (!s3Url) {
          yield put(
            videoPollFailure("Video completed but no URL was returned")
          );
          toast.error("Video processing failed. Please try again.");
          return;
        }

        yield put(videoPollSuccess(s3Url));
        toast.success("Video uploaded and processed successfully!");
        return;
      }

      if (status === "failed") {
        yield put(videoPollFailure(errorMessage || "Video processing failed"));
        toast.error("Video processing failed. Please try again.");
        return;
      }

      // Still processing — wait and poll again
      attempts++;
      yield delay(POLL_INTERVAL_MS);
    } catch (error: unknown) {
      yield put(videoPollFailure("Failed to check video status"));
      return;
    }
  }

  // Exceeded max attempts
  yield put(
    videoPollFailure(
      "Processing is taking longer than expected. Check back later."
    )
  );
}

// ─── Root Upload Saga — Orchestrates All 4 Phases ────────────────────────────

export function* createVideoSaga({
  payload,
  userId,
}: VideoPresignRequestAction): Generator<unknown, void, void> {
  // Race the entire upload flow against a hard timeout
  yield race({
    task: call(runUploadFlow, payload, userId),
    timeout: delay(POLL_TIMEOUT_MS),
  });
}

function* runUploadFlow(
  payload: CreateVideoPayload,
  userId: string
): Generator<unknown, void, PresignResult | null | boolean> {
  // ── Phase 1 ──
  const presignResult = (yield call(
    presignSaga,
    payload,
    userId
  )) as PresignResult | null;
  if (!presignResult) return; // presign failed — saga already dispatched failure

  const { videoId, presignedUrl } = presignResult;

  // ── Phase 2 ──
  const uploadOk = (yield call(
    s3UploadSaga,
    presignedUrl,
    payload.file
  )) as boolean;
  if (!uploadOk) return; // S3 upload failed

  // ── Phase 3 ──
  const confirmOk = (yield call(confirmUploadSaga, videoId, userId)) as boolean;
  if (!confirmOk) return; // confirm failed

  // ── Phase 4 ──
  yield call(pollStatusSaga, videoId, userId);
}
