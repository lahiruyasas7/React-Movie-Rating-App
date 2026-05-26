// ─── State ────────────────────────────────────────────────────────────────────

import { actionTypes, VideoUploadStatus } from "../actions";

export interface VideoUploadState {
  status: VideoUploadStatus;
  uploadProgress: number; // 0–100, only relevant during 'uploading'
  videoId: string | null; // assigned after presign succeeds
  s3Url: string | null; // assigned after processing completes
  error: string | null;
}

const initialState: VideoUploadState = {
  status: "idle",
  uploadProgress: 0,
  videoId: null,
  s3Url: null,
  error: null,
};

// ─── Reducer ──────────────────────────────────────────────────────────────────

export const videoUploadReducer = (
  state: VideoUploadState = initialState,
  action: any
): VideoUploadState => {
  switch (action.type) {
    case actionTypes.VIDEO_PRESIGN_REQUEST:
      return { ...initialState, status: "presigning" };

    case actionTypes.VIDEO_PRESIGN_SUCCESS:
      return {
        ...state,
        status: "uploading",
        videoId: action.videoId,
        uploadProgress: 0,
      };

    case actionTypes.VIDEO_PRESIGN_FAILURE:
      return { ...state, status: "failed", error: action.error };

    case actionTypes.VIDEO_S3_UPLOAD_PROGRESS:
      return { ...state, uploadProgress: action.progress };

    case actionTypes.VIDEO_S3_UPLOAD_SUCCESS:
      return { ...state, uploadProgress: 100, status: "confirming" };

    case actionTypes.VIDEO_S3_UPLOAD_FAILURE:
      return { ...state, status: "failed", error: action.error };

    case actionTypes.VIDEO_CONFIRM_SUCCESS:
      return { ...state, status: "processing" };

    case actionTypes.VIDEO_CONFIRM_FAILURE:
      return { ...state, status: "failed", error: action.error };

    case actionTypes.VIDEO_POLL_SUCCESS:
      return { ...state, status: "completed", s3Url: action.s3Url };

    case actionTypes.VIDEO_POLL_FAILURE:
      return { ...state, status: "failed", error: action.error };

    case actionTypes.VIDEO_UPLOAD_RESET:
      return initialState;

    default:
      return state;
  }
};
