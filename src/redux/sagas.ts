import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { actionTypes, handleLoader, registerDataType } from "./actions";
import { API } from "../utils/axios";
import { fireAlertError, jsonToFormData } from "../utils/customUtil";
import { USER_ITEM } from "../utils/constants";
import { toast } from "react-toastify";

export function* getAllMovies() {
  try {
    const { data } = yield axios.get(
      `${import.meta.env.VITE_MOVIE_API_URL}discover/movie?api_key=${
        import.meta.env.VITE_MOVIE_DB_API_KEY
      }`
    );

    yield put({ type: actionTypes.GET_MOVIES_SUCCESS, data: data });
  } catch (e: any) {
    console.error(
      e.response?.data?.message || "Error in retrieving movie data"
    );
    yield put({ type: actionTypes.GET_MOVIES_FAIL });
  }
}

export function* getAllTvSeriesSaga() {
  try {
    const { data } = yield axios.get(
      `${import.meta.env.VITE_MOVIE_API_URL}discover/tv?api_key=${
        import.meta.env.VITE_MOVIE_DB_API_KEY
      }`
    );

    yield put({ type: actionTypes.GET_TV_SERIES_SUCCESS, data: data });
  } catch (e: any) {
    console.error(
      e.response?.data?.message || "Error in retrieving Tv series data"
    );
    yield put({ type: actionTypes.GET_TV_SERIES_FAIL });
  }
}

export function* loginUser(action: any) {
  const { data } = action;
  try {
    yield put({
      type: actionTypes.LOGIN_LOADER_HANDLE,
      data: true,
    });

    yield API.post(`auth/login`, data).then((res) => {
      window.localStorage.setItem(USER_ITEM, JSON.stringify(res?.data));
      location.replace("/");
    });
    toast.success("User Login Success");
    yield put({
      type: actionTypes.LOGIN_LOADER_HANDLE,
      data: false,
    });
  } catch (e: any) {
    yield put({
      type: actionTypes.LOGIN_LOADER_HANDLE,
      data: false,
    });
    yield put({
      type: actionTypes.IS_LOGIN_ERROR,
      data: true,
    });
    fireAlertError("Error", e.response?.data?.message || "Error in login");
    console.error(e);
  }
}

export function* logoutUserSaga(): Generator<any, void, any> {
  try {
    const response = yield API.post(`/auth/logout`);
    if (response.status === 200) {
      localStorage.removeItem("user");
      location.replace("/");
    }
  } catch (e: any) {
    fireAlertError("Error", e.response?.data?.message || "Error in logout");
    console.error(e);
  }
}

export function* registerUserSaga(action: {
  type: string;
  payload: registerDataType;
}): Generator<any, void, any> {
  try {
    yield put(handleLoader(true));
    const response = yield API.post(`/auth/register`, action.payload);
    if (response.status === 201) {
      toast.success("User Register Success");
    }
    yield put(handleLoader(false));
  } catch (e: any) {
    yield put(handleLoader(false));
    let message = "Cannot Register User";
    if (e?.response?.data?.message) {
      message = `${message}: ${e.response.data.message}`;
    } else if (e?.response?.data?.error) {
      message = `${message}: ${e.response.data.error}`;
    }
    toast.error(message);
    console.error(e);
  }
}

export function* getUserDetailsSaga(action: { type: string; userId: string }) {
  try {
    const { data } = yield API.get(`auth/${action.userId}`);
    yield put({
      type: actionTypes.GET_USER_DETAILS_SUCCESS,
      data: data,
    });
  } catch (e: any) {
    toast.error(
      e.response?.data?.message || "Error in retrieving user details data"
    );
    yield put({ type: actionTypes.GET_USER_DETAILS_FAIL });
  }
}

export function* updateUserDetailsSaga({
  userId,
  payload,
}: any): Generator<any, void, any> {
  try {
    yield put(handleLoader(true));
    const response = yield API.patch(
      `/auth/update/${userId}`,
      jsonToFormData(payload),
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status === 200) {
      yield put(handleLoader(false));
      toast.success("User profile updated successfully");
    }
  } catch (e: any) {
    yield put(handleLoader(false));
    toast.error(e.response?.data?.message || "Error in updating User Details");
  }
}

export function* getAllMessagesSaga(action: {
  type: string;
  userId: string;
  targetUserId: string;
}) {
  try {
    const { data } = yield API.get(
      `chat/messages?user1=${action.userId}&user2=${action.targetUserId}`
    );
    yield put({
      type: actionTypes.GET_ALL_MESSAGES_SUCCESS,
      data: data,
    });
  } catch (e: any) {
    toast.error(e.response?.data?.message || "Error in retrieving messages");
    yield put({ type: actionTypes.GET_ALL_MESSAGES_FAIL });
  }
}

export function* createVideoSaga({
  userId,
  payload,
}: any): Generator<any, void, any> {
  try {
    yield put(handleLoader(true));
    const response = yield API.post(
      `/videos/add/${userId}`,
      jsonToFormData(payload),
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status === 201) {
      yield put(handleLoader(false));
      toast.success("Video uploaded successfully");
    }
  } catch (e: any) {
    yield put(handleLoader(false));
    toast.error(e.response?.data?.message || "Error in uploading video");
  }
}

export function* getUserVideosSaga(action: { type: string; userId: string }) {
  try {
    const { data } = yield API.get(`videos/by-userId/${action.userId}`);
    yield put({
      type: actionTypes.GET_USER_VIDEOS_SUCCESS,
      data: data,
    });
  } catch (e: any) {
    toast.error(
      e.response?.data?.message || "Error in retrieving user Videos data"
    );
    yield put({ type: actionTypes.GET_USER_VIDEOS_FAIL });
  }
}

export function* updateVideoSaga({
  videoId,
  payload,
}: any): Generator<any, void, any> {
  try {
    yield put(handleLoader(true));
    const response = yield API.put(
      `/videos/update/${videoId}`,
      jsonToFormData(payload),
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status === 200) {
      yield put(handleLoader(false));
      toast.success("Video updated successfully");
    }
  } catch (e: any) {
    yield put(handleLoader(false));
    toast.error(e.response?.data?.message || "Error in updating Video data");
  }
}

export function* getOneVideoByVideoIdSaga(action: {
  type: string;
  videoId: string;
}) {
  try {
    const { data } = yield API.get(`videos/one-video/${action.videoId}`);
    yield put({
      type: actionTypes.GET_ONE_VIDEO_BY_ID_SUCCESS,
      data: data,
    });
  } catch (e: any) {
    toast.error(
      e.response?.data?.message || "Error in retrieving Video by ID data"
    );
    yield put({ type: actionTypes.GET_ONE_VIDEO_BY_ID_FAIL });
  }
}

export function* deleteVideoSaga({ videoId }: any): Generator<any, void, any> {
  try {
    yield put(handleLoader(true));
    const response = yield API.delete(`videos/delete/${videoId}`);
    if (response.status === 200) {
      toast.success("Video deleted successfully");
      yield put(handleLoader(false));
    }
  } catch (e: any) {
    toast.error(e.response?.data?.message || "Error in deleting Video");
    yield put(handleLoader(false));
  }
}

export function* getPopularMovies({ page }: { type: string; page: number }) {
  try {
    const { data } = yield axios.get(
      `${
        import.meta.env.VITE_MOVIE_API_URL
      }movie/popular?language=en-US&page=${page}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${
            import.meta.env.VITE_MOVIE_DB_READ_ACCESS_TOKEN
          }`,
        },
      }
    );

    yield put({ type: actionTypes.GET_POPULAR_MOVIES_SUCCESS, data: data });
  } catch (e: any) {
    console.error(
      e.response?.data?.message || "Error in retrieving popular movie data"
    );
    yield put({ type: actionTypes.GET_POPULAR_MOVIES_FAIL });
  }
}

export function* getTopRatedMoviesSaga({ page }: { type: string; page: number }) {
  try {
    const { data } = yield axios.get(
      `${
        import.meta.env.VITE_MOVIE_API_URL
      }movie/top_rated?language=en-US&page=${page}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${
            import.meta.env.VITE_MOVIE_DB_READ_ACCESS_TOKEN
          }`,
        },
      }
    );

    yield put({ type: actionTypes.GET_TOP_RATED_MOVIES_SUCCESS, data: data });
  } catch (e: any) {
    console.error(
      e.response?.data?.message || "Error in retrieving top rated movie data"
    );
    yield put({ type: actionTypes.GET_TOP_RATED_MOVIES_FAIL });
  }
}

export default function* rootSaga() {
  yield takeLatest(actionTypes.GET_ALL_MOVIES, getAllMovies);
  yield takeLatest(actionTypes.GET_ALL_TV_SERIES, getAllTvSeriesSaga);
  yield takeLatest(actionTypes.LOGIN_LISTEN, loginUser);
  yield takeLatest(actionTypes.REGISTER_USER, registerUserSaga);
  yield takeLatest(actionTypes.GET_USER_DETAILS, getUserDetailsSaga);
  yield takeLatest(actionTypes.UPDATE_USER_DETAILS, updateUserDetailsSaga);
  yield takeLatest(actionTypes.GET_ALL_MESSAGES, getAllMessagesSaga);
  yield takeLatest(actionTypes.CREATE_VIDEO, createVideoSaga);
  yield takeLatest(actionTypes.GET_USER_VIDEOS, getUserVideosSaga);
  yield takeLatest(actionTypes.UPDATE_VIDEO, updateVideoSaga);
  yield takeLatest(actionTypes.GET_ONE_VIDEO_BY_ID, getOneVideoByVideoIdSaga);
  yield takeLatest(actionTypes.DELETE_VIDEO, deleteVideoSaga);
  yield takeLatest(actionTypes.GET_POPULAR_MOVIES, getPopularMovies);
  yield takeLatest(actionTypes.LOG_OUT, logoutUserSaga);
  yield takeLatest(actionTypes.GET_TOP_RATED_MOVIES, getTopRatedMoviesSaga);
}
