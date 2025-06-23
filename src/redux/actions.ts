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

export const handleLoginLoader = (data: any) => {
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
