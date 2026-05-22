import React, { useEffect, useRef, useState } from "react";
import {
  Video,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Loader,
} from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { useSearchParams } from "react-router-dom";
import {
  videoPresignRequest,
  videoUploadReset,
  CreateVideoPayload,
} from "../../redux/actions";
import {
  getOneVideoByVideoId,
  updateVideo,
  updateVideoType,
} from "../../redux/actions";

// ─── Constants ────────────────────────────────────────────────────────────────

const ALLOWED_MIME_TYPES = [
  "video/mp4",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
];
const MAX_FILE_SIZE_BYTES = 500 * 1024 * 1024; // 500MB

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatBytes = (bytes: number): string => {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const validateVideoFile = (file: File): string | null => {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return "Only MP4, MOV, WebM, and AVI files are allowed.";
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return `File size must not exceed 500MB. Your file is ${formatBytes(file.size)}.`;
  }
  return null;
};

// ─── Upload Status UI ─────────────────────────────────────────────────────────

const statusConfig: Record<string, { label: string; color: string }> = {
  idle: { label: "", color: "" },
  presigning: { label: "Preparing upload...", color: "text-blue-400" },
  uploading: { label: "Uploading to storage...", color: "text-blue-400" },
  confirming: { label: "Finalizing...", color: "text-blue-400" },
  processing: { label: "Processing your video...", color: "text-yellow-400" },
  completed: { label: "Video uploaded successfully!", color: "text-green-400" },
  failed: { label: "Upload failed.", color: "text-red-400" },
};

// ─── Component ────────────────────────────────────────────────────────────────

const AddNewVideo = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("videoId");

  const { userDetails, oneVideo } = useSelector(
    (state: RootState) => state.reducer
  );

  // Video upload state from the new reducer
  const { status, uploadProgress, error } = useSelector(
    (state: RootState) => state.videoUpload // wire this in your root reducer
  );

  const isLoading = [
    "presigning",
    "uploading",
    "confirming",
    "processing",
  ].includes(status);

  // ── Load existing video for update mode ──
  useEffect(() => {
    if (videoId) {
      dispatch(getOneVideoByVideoId(videoId));
      setIsUpdating(true);
    }
    // Reset upload state when component mounts
    dispatch(videoUploadReset());
  }, [videoId]);

  useEffect(() => {
    if (isUpdating && oneVideo) {
      setName(oneVideo.name || "");
      setDescription(oneVideo.description || "");
      setPreviewURL(oneVideo.s3Url || null);
    }
  }, [isUpdating, oneVideo]);

  // ── Reset form after successful upload ──
  useEffect(() => {
    if (status === "completed" && !isUpdating) {
      setName("");
      setDescription("");
      setVideoFile(null);
      if (previewURL && previewURL.startsWith("blob:")) {
        URL.revokeObjectURL(previewURL);
      }
      setPreviewURL(null);
    }
  }, [status]);

  // ── Cleanup blob URL on unmount ──
  useEffect(() => {
    return () => {
      if (previewURL && previewURL.startsWith("blob:")) {
        URL.revokeObjectURL(previewURL);
      }
      dispatch(videoUploadReset());
    };
  }, []);

  // ─── Handlers ────────────────────────────────────────────────────────────────

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate before doing anything else
    const validationError = validateVideoFile(file);
    if (validationError) {
      setFileError(validationError);
      setVideoFile(null);
      return;
    }

    setFileError(null);

    // Revoke old preview URL to prevent memory leaks
    if (previewURL && previewURL.startsWith("blob:")) {
      URL.revokeObjectURL(previewURL);
    }

    setVideoFile(file);
    setPreviewURL(URL.createObjectURL(file));
    dispatch(videoUploadReset()); // clear any previous upload state
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isUpdating && videoId) {
      // Update flow — unchanged from original
      const payload: updateVideoType = { name, description };
      if (videoFile) payload.video = videoFile;
      dispatch(updateVideo(videoId, payload));
      return;
    }

    // ── Validation ──
    if (!videoFile || !name.trim() || !description.trim()) {
      return;
    }

    // ── Dispatch new presign flow ──
    const payload: CreateVideoPayload = {
      name: name.trim(),
      description: description.trim(),
      file: videoFile, // stays client-side only
      mimetype: videoFile.type,
      originalName: videoFile.name,
      fileSize: videoFile.size,
    };

    dispatch(videoPresignRequest(payload, userDetails.userId));
  };

  // ─── Render ───────────────────────────────────────────────────────────────────

  const currentStatus = statusConfig[status];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-zinc-900 rounded-xl shadow-lg text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-6">
        {isUpdating ? "Update Video" : "Upload a Video"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* ── File Input ── */}
        <div>
          <label className="block text-sm font-medium mb-1">Video File</label>
          <input
            type="file"
            accept="video/mp4,video/quicktime,video/webm,video/x-msvideo"
            className="w-full"
            onChange={handleVideoChange}
            disabled={isLoading}
          />
          {fileError && (
            <p className="text-red-400 text-xs mt-1">{fileError}</p>
          )}
          {videoFile && !fileError && (
            <p className="text-zinc-400 text-xs mt-1">
              {videoFile.name} — {formatBytes(videoFile.size)}
            </p>
          )}
        </div>

        {/* ── Video Preview ── */}
        <div className="mt-4 w-full rounded border-2 border-dashed border-zinc-700 bg-zinc-800 flex items-center justify-center aspect-video relative overflow-hidden">
          {previewURL ? (
            <video
              key={previewURL}
              controls
              className="w-full h-full object-contain rounded"
            >
              <source src={previewURL} type={videoFile?.type || "video/mp4"} />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="flex flex-col items-center justify-center text-zinc-400">
              <Video size={60} />
              <p className="text-center text-sm mt-2">Upload your video here</p>
            </div>
          )}
        </div>

        {/* ── Upload Progress Bar — shown only during uploading ── */}
        {status === "uploading" && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-zinc-400">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-zinc-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* ── Status Message ── */}
        {status !== "idle" && (
          <div
            className={`flex items-center gap-2 text-sm ${currentStatus.color}`}
          >
            {isLoading && <Loader size={14} className="animate-spin" />}
            {status === "completed" && <CheckCircle size={14} />}
            {status === "failed" && <AlertCircle size={14} />}
            <span>{currentStatus.label}</span>
          </div>
        )}

        {/* ── Error Message ── */}
        {status === "failed" && error && (
          <p className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded p-2">
            {error}
          </p>
        )}

        {/* ── Name Field ── */}
        <div>
          <label className="block text-sm font-medium mb-1">Video Name</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-blue-500 disabled:opacity-50"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a title"
            maxLength={100}
            disabled={isLoading}
          />
        </div>

        {/* ── Description Field ── */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-blue-500 disabled:opacity-50"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Enter description"
            maxLength={2000}
            disabled={isLoading}
          />
        </div>

        {/* ── Submit Button ── */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          disabled={
            isLoading ||
            status === "completed" ||
            (!isUpdating && (!videoFile || !name.trim() || !description.trim()))
          }
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader size={16} className="animate-spin" />
              {currentStatus.label}
            </span>
          ) : isUpdating ? (
            "Update Video"
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Upload size={16} />
              Upload Video
            </span>
          )}
        </button>

        {/* ── Retry Button — shown on failure ── */}
        {status === "failed" && (
          <button
            type="button"
            onClick={() => dispatch(videoUploadReset())}
            className="w-full bg-zinc-700 hover:bg-zinc-600 text-white py-2 rounded transition-colors"
          >
            Try Again
          </button>
        )}
      </form>
    </div>
  );
};

export default AddNewVideo;
