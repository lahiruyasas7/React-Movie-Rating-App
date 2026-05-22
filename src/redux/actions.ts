export const actionTypes = {
  GET_ALL_MOVIES: "GET_ALL_MOVIES",
  GET_MOVIES_SUCCESS: "GET_MOVIES_SUCCESS",
  GET_MOVIES_FAIL: "GET_MOVIES_FAIL",
  LOGIN_LISTEN: "LOGIN_LISTEN",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_LOADER_HANDLE: "LOGIN_LOADER_HANDLE",
  IS_LOGIN_ERROR: "IS_LOGIN_ERROR",
  REGISTER_USER: "REGISTER_USER",
  GET_ALL_TV_SERIES: "GET_ALL_TV_SERIES",
  GET_TV_SERIES_SUCCESS: "GET_TV_SERIES_SUCCESS",
  GET_TV_SERIES_FAIL: "GET_TV_SERIES_FAIL",
  GET_USER_DETAILS: "GET_USER_DETAILS",
  GET_USER_DETAILS_SUCCESS: "GET_USER_DETAILS_SUCCESS",
  GET_USER_DETAILS_FAIL: "GET_USER_DETAILS_FAIL",
  UPDATE_USER_DETAILS: "UPDATE_USER_DETAILS",
  LOADER_HANDLE: "LOADER_HANDLE",
  GET_ALL_MESSAGES: "GET_ALL_MESSAGES",
  GET_ALL_MESSAGES_SUCCESS: "GET_ALL_MESSAGES_SUCCESS",
  GET_ALL_MESSAGES_FAIL: "GET_ALL_MESSAGES_FAIL",
  CREATE_VIDEO: "CREATE_VIDEO",
  GET_USER_VIDEOS: "GET_USER_VIDEOS",
  GET_USER_VIDEOS_SUCCESS: "GET_USER_VIDEOS_SUCCESS",
  GET_USER_VIDEOS_FAIL: "GET_USER_VIDEOS_FAIL",
  UPDATE_VIDEO: "UPDATE_VIDEO",
  GET_ONE_VIDEO_BY_ID: "GET_ONE_VIDEO_BY_ID",
  GET_ONE_VIDEO_BY_ID_SUCCESS: "GET_ONE_VIDEO_BY_ID_SUCCESS",
  GET_ONE_VIDEO_BY_ID_FAIL: "GET_ONE_VIDEO_BY_ID_FAIL",
  DELETE_VIDEO: "DELETE_VIDEO",
  GET_POPULAR_MOVIES: "GET_POPULAR_MOVIES",
  GET_POPULAR_MOVIES_SUCCESS: "GET_POPULAR_MOVIES_SUCCESS",
  GET_POPULAR_MOVIES_FAIL: "GET_POPULAR_MOVIES_FAIL",
  LOG_OUT: "LOG_OUT",
  GET_TOP_RATED_MOVIES: "GET_TOP_RATED_MOVIES",
  GET_TOP_RATED_MOVIES_SUCCESS: "GET_TOP_RATED_MOVIES_SUCCESS",
  GET_TOP_RATED_MOVIES_FAIL: "GET_TOP_RATED_MOVIES_FAIL",
  VIDEO_PRESIGN_REQUEST: "VIDEO_PRESIGN_REQUEST",
  VIDEO_PRESIGN_SUCCESS: "VIDEO_PRESIGN_SUCCESS",
  VIDEO_PRESIGN_FAILURE: "VIDEO_PRESIGN_FAILURE",

  // Phase 2 — Upload directly to S3 (progress tracked client-side)
  VIDEO_S3_UPLOAD_PROGRESS: "VIDEO_S3_UPLOAD_PROGRESS",
  VIDEO_S3_UPLOAD_SUCCESS: "VIDEO_S3_UPLOAD_SUCCESS",
  VIDEO_S3_UPLOAD_FAILURE: "VIDEO_S3_UPLOAD_FAILURE",

  // Phase 3 — Confirm upload with backend
  VIDEO_CONFIRM_REQUEST: "VIDEO_CONFIRM_REQUEST",
  VIDEO_CONFIRM_SUCCESS: "VIDEO_CONFIRM_SUCCESS",
  VIDEO_CONFIRM_FAILURE: "VIDEO_CONFIRM_FAILURE",

  // Phase 4 — Poll processing status
  VIDEO_POLL_STATUS: "VIDEO_POLL_STATUS",
  VIDEO_POLL_SUCCESS: "VIDEO_POLL_SUCCESS",
  VIDEO_POLL_FAILURE: "VIDEO_POLL_FAILURE",

  // Reset
  VIDEO_UPLOAD_RESET: "VIDEO_UPLOAD_RESET",
};

export interface registerDataType {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  password?: string;
}

export interface createVideoType {
  name: string;
  description: string;
  video: File;
}

export interface updateVideoType {
  name?: string;
  description?: string;
  video?: File;
}

export type VideoUploadStatus =
  | "idle"
  | "presigning"
  | "uploading"
  | "confirming"
  | "processing"
  | "completed"
  | "failed";

export interface VideoPresignPayload {
  name: string;
  description: string;
  mimetype: string;
  originalName: string;
  fileSize: number;
}

export interface CreateVideoPayload extends VideoPresignPayload {
  file: File; // the actual File object — only used client-side, never sent to your server
}
export function getAllMovies() {
  return { type: actionTypes.GET_ALL_MOVIES };
}

export function getAllTvSeries() {
  return { type: actionTypes.GET_ALL_TV_SERIES };
}

export const loginListen = (data: any, history: any) => {
  return {
    type: actionTypes.LOGIN_LISTEN,
    data,
    history,
  };
};

export const loginSuccess = (data: any) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    data,
  };
};

export const handleLoginLoader = (data: boolean) => {
  return {
    type: actionTypes.LOGIN_LOADER_HANDLE,
    data,
  };
};

export const registerUser = (payload: registerDataType) => {
  return {
    type: actionTypes.REGISTER_USER,
    payload,
  };
};

export const getUserDetails = (userId: string) => {
  return {
    type: actionTypes.GET_USER_DETAILS,
    userId,
  };
};

export const updateUserDetails = (userId: string, payload: any) => {
  return {
    type: actionTypes.UPDATE_USER_DETAILS,
    userId,
    payload,
  };
};

export const handleLoader = (data: boolean) => {
  return {
    type: actionTypes.LOADER_HANDLE,
    data,
  };
};

export const getAllMessages = (userId: string, targetUserId: string) => {
  return {
    type: actionTypes.GET_ALL_MESSAGES,
    userId,
    targetUserId,
  };
};

export const createVideo = (payload: createVideoType, userId: string) => {
  return {
    type: actionTypes.CREATE_VIDEO,
    payload,
    userId,
  };
};

export const getVideosByUserId = (userId: string) => {
  return {
    type: actionTypes.GET_USER_VIDEOS,
    userId,
  };
};

export const updateVideo = (videoId: string, payload: updateVideoType) => {
  return {
    type: actionTypes.UPDATE_VIDEO,
    videoId,
    payload,
  };
};

export const getOneVideoByVideoId = (videoId: string) => {
  return {
    type: actionTypes.GET_ONE_VIDEO_BY_ID,
    videoId,
  };
};

export const deleteVideo = (videoId: string) => {
  return {
    type: actionTypes.DELETE_VIDEO,
    videoId,
  };
};

export const getPopularMovies = (page: number) => {
  return {
    type: actionTypes.GET_POPULAR_MOVIES,
    page,
  };
};

export const logOutUser = () => {
  return {
    type: actionTypes.LOG_OUT,
  };
};

export const getTopRatedMovies = (page: number) => {
  return {
    type: actionTypes.GET_TOP_RATED_MOVIES,
    page,
  };
};

export const videoPresignRequest = (
  payload: CreateVideoPayload,
  userId: string
) => ({
  type: actionTypes.VIDEO_PRESIGN_REQUEST,
  payload,
  userId,
});

export const videoPresignSuccess = (videoId: string, presignedUrl: string) => ({
  type: actionTypes.VIDEO_PRESIGN_SUCCESS,
  videoId,
  presignedUrl,
});

export const videoPresignFailure = (error: string) => ({
  type: actionTypes.VIDEO_PRESIGN_FAILURE,
  error,
});

export const videoS3UploadProgress = (progress: number) => ({
  type: actionTypes.VIDEO_S3_UPLOAD_PROGRESS,
  progress,
});

export const videoS3UploadSuccess = () => ({
  type: actionTypes.VIDEO_S3_UPLOAD_SUCCESS,
});

export const videoS3UploadFailure = (error: string) => ({
  type: actionTypes.VIDEO_S3_UPLOAD_FAILURE,
  error,
});

export const videoConfirmRequest = (videoId: string, userId: string) => ({
  type: actionTypes.VIDEO_CONFIRM_REQUEST,
  videoId,
  userId,
});

export const videoConfirmSuccess = () => ({
  type: actionTypes.VIDEO_CONFIRM_SUCCESS,
});

export const videoConfirmFailure = (error: string) => ({
  type: actionTypes.VIDEO_CONFIRM_FAILURE,
  error,
});

export const videoPollStatus = (videoId: string, userId: string) => ({
  type: actionTypes.VIDEO_POLL_STATUS,
  videoId,
  userId,
});

export const videoPollSuccess = (s3Url: string) => ({
  type: actionTypes.VIDEO_POLL_SUCCESS,
  s3Url,
});

export const videoPollFailure = (error: string) => ({
  type: actionTypes.VIDEO_POLL_FAILURE,
  error,
});

export const videoUploadReset = () => ({
  type: actionTypes.VIDEO_UPLOAD_RESET,
});
