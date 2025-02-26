import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { actionTypes, registerDataType } from "./actions";
import { API } from "../utils/axios";
import { fireAlertError } from "../utils/customUtil";
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

export default function* rootSaga() {
  yield takeLatest(actionTypes.GET_ALL_MOVIES, getAllMovies);
  yield takeLatest(actionTypes.LOGIN_LISTEN, loginUser);
  yield takeLatest(actionTypes.REGISTER_USER, registerUserSaga);
}
