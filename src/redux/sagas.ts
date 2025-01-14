import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { actionTypes } from "./actions";
import { API } from "../utils/axios";
import { fireAlertError } from "../utils/customUtil";
import { USER_ITEM } from "../utils/constants";

export function* getAllMovies() {
  try {
    const { data } = yield axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=96b9dd19fdc034edccdba6d81881343a`
    );
    
    yield put({ type: actionTypes.GET_MOVIES_SUCCESS, data: data });
  } catch(e: any) {
    console.error(e.response?.data?.message || 'Error in retrieving movie data');
    yield put({type: actionTypes.GET_MOVIES_FAIL})
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
			location.replace('/');
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
		fireAlertError('Error', e.response?.data?.message || 'Error in login');
		console.error(e);
	}
}

export default function* rootSaga() {
    yield takeLatest(actionTypes.GET_ALL_MOVIES, getAllMovies);
    yield takeLatest(actionTypes.LOGIN_LISTEN, loginUser);
}
