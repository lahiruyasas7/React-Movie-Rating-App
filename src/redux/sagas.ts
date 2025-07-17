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
      `https://api.themoviedb.org/3/discover/movie?api_key=96b9dd19fdc034edccdba6d81881343a`
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
      `https://api.themoviedb.org/3/discover/tv?api_key=96b9dd19fdc034edccdba6d81881343a`
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
      payload: true,
    });

    yield API.post(`auth/login`, data).then((res) => {
      window.localStorage.setItem(USER_ITEM, JSON.stringify(res?.data));
      location.replace("/");
    });
    toast.success("User Login Success");
    yield put({
      type: actionTypes.LOGIN_LOADER_HANDLE,
      payload: false,
    });
  } catch (e: any) {
    yield put({
      type: actionTypes.LOGIN_LOADER_HANDLE,
      payload: false,
    });
    yield put({
      type: actionTypes.IS_LOGIN_ERROR,
      data: true,
    });
    fireAlertError("Error", e.response?.data?.message || "Error in login");
    console.error(e);
  }
}

export function* registerUserSaga(action: {
  type: string;
  payload: registerDataType;
}): Generator<any, void, any> {
  try {
    //yield put(setIsAddLoader(true));
    const response = yield API.post(`/auth/register`, action.payload);
    if (response.status === 201) {
      toast.success("User Register Success");
    }
    //yield put(setIsAddLoader(false));
  } catch (e: any) {
    //yield put(setIsAddLoader(false));
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

export default function* rootSaga() {
  yield takeLatest(actionTypes.GET_ALL_MOVIES, getAllMovies);
  yield takeLatest(actionTypes.GET_ALL_TV_SERIES, getAllTvSeriesSaga);
  yield takeLatest(actionTypes.LOGIN_LISTEN, loginUser);
  yield takeLatest(actionTypes.REGISTER_USER, registerUserSaga);
  yield takeLatest(actionTypes.GET_USER_DETAILS, getUserDetailsSaga);
  yield takeLatest(actionTypes.UPDATE_USER_DETAILS, updateUserDetailsSaga);
}
