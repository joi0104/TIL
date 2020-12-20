import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import counter, { counterSaga } from "./counter";
import sample, { sampleSaga } from "./sample";
import loading from "./loading";

const rootReducer = combineReducers({ counter, sample, loading });

export function* rootSage() {
  yield all([counterSaga(), sampleSaga()]);
}

export default rootReducer;
