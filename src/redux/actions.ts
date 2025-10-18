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
