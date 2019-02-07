import { all } from "redux-saga/effects";
import app from "./app";
import api from "./api";
import auth from "./auth";
import users from "./users";

export default function* rootSaga() {
  try {
    yield all([app, api, auth, users]);
  } catch (e) {
    // eslint-disable-next-line  no-console
    console.warn(e.message);
  }
}
