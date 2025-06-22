import { combineReducers } from "redux";
import { actionTypes } from "./actions";

const initialState = {
  moviesList: null,
  tvSeriesList: null,
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
        moviesList: action.data,
      };
    case actionTypes.GET_TV_SERIES_FAIL:
      return {
        ...state,
        moviesList: null,
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
