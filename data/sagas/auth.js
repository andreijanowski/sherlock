import { takeEvery, put, all } from "redux-saga/effects";
import {
  fetchProfile,
  fetchProfileBusinesses,
  fetchProfileCards,
  fetchProfileSubscriptions
} from "actions/users";
import { fetchGroups } from "actions/groups";
import { postBusiness } from "actions/businesses";
import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  FACEBOOK_LOGIN_SUCCESS,
  REFRESH_TOKEN_SUCCESS,
  CHANGE_PASSWORD_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_BY_TOKEN_SUCCESS,
  DELETE_BY_TOKEN_SUCCESS,
  REFRESH_TOKEN_REQUEST,
  LOGIN_FAIL,
  REGISTER_FAIL,
  FACEBOOK_LOGIN_FAIL,
  REFRESH_TOKEN_FAIL,
  LOGOUT
} from "types/auth";
import Notifications from "react-notification-system-redux";
import { logout as logoutAction, refreshToken as refresh } from "actions/auth";
import { setCurrentBusiness, saveCurrentUserId } from "actions/app";
import isServer from "utils/isServer";
import { fetchAllUserData } from "./utils";

const delay = ms => new Promise(res => setTimeout(res, ms));

function* subscribeForRefresh() {
  if (!isServer) {
    try {
      const credentials = JSON.parse(
        window.localStorage.getItem("credentials")
      );
      if (credentials.expiresIn && credentials.refreshToken) {
        const { expiresIn, refreshToken } = credentials;
        const msBeforeExpires = 300000;
        yield delay(expiresIn * 1000 - msBeforeExpires);
        yield put(refresh({ refreshToken }));
      }
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}

function* fetchUserData({
  payload: {
    rawData: { accessToken, refreshToken, createdAt, expiresIn }
  }
}) {
  let lastBusinessId;
  let lastUserId;
  if (!isServer) {
    window.localStorage.setItem("areCredentialsRefreshing", "false");
    window.localStorage.setItem(
      "credentials",
      JSON.stringify({
        accessToken,
        refreshToken,
        createdAt,
        expiresIn
      })
    );
    lastBusinessId = window.localStorage.getItem("currentBusinessId");
    lastUserId = window.localStorage.getItem("currentUserId");
  }
  const {
    rawData: {
      data: { id: userId }
    }
  } = yield put.resolve(fetchProfile());
  yield fetchAllUserData(fetchProfileCards);
  yield put(fetchProfileSubscriptions());
  yield put(fetchGroups());
  if (lastBusinessId && userId === lastUserId) {
    yield put(setCurrentBusiness(lastBusinessId));
    yield fetchAllUserData(fetchProfileBusinesses);
  } else {
    const {
      rawData: {
        data,
        meta: { totalPages }
      }
    } = yield put.resolve(fetchProfileBusinesses());
    if (data && data.length) {
      yield put(setCurrentBusiness(data[0].id));
      if (totalPages > 1) {
        for (let i = 2; i <= totalPages; i += 1) {
          yield put(fetchProfileBusinesses(i));
        }
      }
    } else {
      yield put(postBusiness());
    }
  }
  yield put(saveCurrentUserId(userId));
}

function* showSuccessPasswordChangeMsg() {
  yield put(
    Notifications.success({
      message: "changePasswordSuccess"
    })
  );
}

function* showSuccessResetPasswordMsg() {
  yield put(
    Notifications.success({
      message: "passwordResetSuccess"
    })
  );
}

function* onSuccessPasswordChangeByToken() {
  yield put(
    Notifications.success({
      message: "changePasswordSuccess"
    })
  );
}

function* logout() {
  yield put(logoutAction());
}

function* setRefreshing() {
  if (!isServer) {
    yield window.localStorage.setItem("areCredentialsRefreshing", "true");
  }
}

function* removeToken() {
  if (!isServer) {
    yield window.localStorage.removeItem("credentials");
  }
}

export default all([
  takeEvery(
    [
      LOGIN_SUCCESS,
      REGISTER_SUCCESS,
      FACEBOOK_LOGIN_SUCCESS,
      REFRESH_TOKEN_SUCCESS
    ],
    fetchUserData
  ),
  takeEvery(
    [
      LOGIN_SUCCESS,
      REGISTER_SUCCESS,
      FACEBOOK_LOGIN_SUCCESS,
      REFRESH_TOKEN_SUCCESS
    ],
    subscribeForRefresh
  ),
  takeEvery(CHANGE_PASSWORD_SUCCESS, showSuccessPasswordChangeMsg),
  takeEvery(RESET_PASSWORD_SUCCESS, showSuccessResetPasswordMsg),
  takeEvery(CHANGE_PASSWORD_BY_TOKEN_SUCCESS, onSuccessPasswordChangeByToken),
  takeEvery(DELETE_BY_TOKEN_SUCCESS, logout),
  takeEvery([REFRESH_TOKEN_REQUEST], setRefreshing),
  takeEvery(
    [
      LOGIN_FAIL,
      REGISTER_FAIL,
      FACEBOOK_LOGIN_FAIL,
      REFRESH_TOKEN_FAIL,
      LOGOUT
    ],
    removeToken
  )
]);
