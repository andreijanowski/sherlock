import { all } from "redux-saga/effects";
import app from "./app";
import api from "./api";

export default function* rootSaga() {
  try {
    yield all([app, api]);
  } catch (e) {
    // eslint-disable-next-line  no-console
    console.warn(e.message);
  }
}
