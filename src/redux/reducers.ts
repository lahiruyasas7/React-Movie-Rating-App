import { combineReducers } from "redux";
import { actionTypes, getAllMessages } from "./actions";

const initialState = {
  moviesList: null,
  tvSeriesList: null,
  userDetails: null,
  loader: false,
  allMessages: null,
  userVideos: null,
  oneVideo: null,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.GET_MOVIES_SUCCESS:
      return {
        ...state,
        moviesList: action.data,
      };
    case actionTypes.GET_MOVIES_FAIL:
      return {
        ...state,
        moviesList: null,
      };
    case actionTypes.GET_TV_SERIES_SUCCESS:
      return {
        ...state,
        tvSeriesList: action.data,
      };
    case actionTypes.GET_TV_SERIES_FAIL:
      return {
        ...state,
        tvSeriesList: null,
      };
    case actionTypes.GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        userDetails: action.data,
      };
    case actionTypes.GET_USER_DETAILS_FAIL:
      return {
        ...state,
        userDetails: null,
      };
    case actionTypes.LOADER_HANDLE:
      return {
        ...state,
        loader: action.data,
      };

    case actionTypes.GET_ALL_MESSAGES_SUCCESS:
      return {
        ...state,
        allMessages: action.data,
      };
    case actionTypes.GET_ALL_MESSAGES_FAIL:
      return {
        ...state,
        allMessages: null,
      };
    case actionTypes.GET_USER_VIDEOS_SUCCESS:
      return {
        ...state,
        userVideos: action.data,
      };
    case actionTypes.GET_USER_VIDEOS_FAIL:
      return {
        ...state,
        userVideos: null,
      };
    case actionTypes.GET_ONE_VIDEO_BY_ID_SUCCESS:
      return {
        ...state,
        oneVideo: action.data,
      };
    case actionTypes.GET_ONE_VIDEO_BY_ID_FAIL:
      return {
        ...state,
        oneVideo: null,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
