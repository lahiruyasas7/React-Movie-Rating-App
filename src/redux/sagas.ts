import axios from "axios";
import { all, fork, put, takeLatest } from "redux-saga/effects";
import { actionTypes } from "./actions";

export function* getAllMovies() {
  try {
    const { data } = yield axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=96b9dd19fdc034edccdba6d81881343a`
    );
    console.log('data', data);
    
    yield put({ type: actionTypes.GET_MOVIES_SUCCESS, data: data });
  } catch(e: any) {
    console.error(e.response?.data?.message || 'Error in retrieving students data');
    yield put({type: actionTypes.GET_MOVIES_FAIL})
  }
}

export default function* rootSaga() {
    yield takeLatest(actionTypes.GET_ALL_MOVIES, getAllMovies);
}
