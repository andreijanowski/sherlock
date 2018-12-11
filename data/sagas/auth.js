import { takeEvery, put, all, select, takeLatest } from "redux-saga/effects";
import { REHYDRATE } from "redux-persist";
import { fetchProfile } from "actions/users";
import { Router } from "routes";
import {
  LOGIN_SUCCESS,
  FACEBOOK_LOGIN_SUCCESS,
  LOGOUT,
  REFRESH_TOKEN_SUCCESS,
  REDIRECT_TO_REGISTER
} from "types/auth";

import { refreshToken as refresh } from "actions/auth";

function* initialTokenRefresh() {
  const refreshToken = yield select(state => state.auth.refreshToken);
  if (refreshToken) {
    yield put(refresh({ refreshToken }));
  }
}

function* fetchUserData() {
  yield put(fetchProfile());
}

function* redirectHomepage() {
  yield put(Router.pushRoute("/"));
}

function* redirectToRegisterPage() {
  yield put(Router.pushRoute("/register"));
}

export default all([
  takeLatest(REHYDRATE, initialTokenRefresh),
  takeEvery(
    [LOGIN_SUCCESS, FACEBOOK_LOGIN_SUCCESS, REFRESH_TOKEN_SUCCESS],
    fetchUserData
  ),
  takeEvery([LOGOUT], redirectHomepage),
  takeEvery([REDIRECT_TO_REGISTER], redirectToRegisterPage)
]);
