import Cookies from "js-cookie";
import { takeEvery, put, putResolve, all, select } from "redux-saga/effects";
import Notifications from "react-notification-system-redux";
import {
  fetchProfile,
  fetchProfileBusinesses,
  fetchProfileCards,
  fetchProfileSubscriptions
} from "actions/users";
import { fetchGroups } from "actions/groups";
import {
  LOAD_USER_DATA,
  REFRESH_TOKEN_SUCCESS,
  LOGOUT,
  CHANGE_PASSWORD_SUCCESS
} from "types/auth";
import { API_URL, APP_URL } from "consts";
import { setCurrentBusiness, saveCurrentUserId } from "actions/app";
import { refreshToken } from "actions/auth";
import isServer from "utils/isServer";
import fetchAllUserData from "./utils/fetchAllUserData";

function* fetchUserData() {
  let lastBusinessId;
  let lastUserId;
  if (!isServer) {
    lastBusinessId = window.localStorage.getItem("currentBusinessId");
    lastUserId = window.localStorage.getItem("currentUserId");
  }
  const {
    rawData: {
      data: { id: userId }
    }
  } = yield putResolve(fetchProfile());
  const profile = yield select(state =>
    state.getIn(["users", "profile", "data", "users", userId])
  );

  const subscriptionInEffect =
    profile && profile.getIn(["attributes", "subscriptionInEffect"]);

  if (subscriptionInEffect) {
    yield fetchAllUserData(fetchProfileCards);
    yield put(fetchProfileSubscriptions());
  }

  yield fetchAllUserData(fetchGroups);
  yield fetchAllUserData(fetchProfileBusinesses);
  const profileBusinesses = yield select(state =>
    state.getIn(["users", "profileBusinesses", "data", "businesses"])
  );
  if (profileBusinesses && profileBusinesses.size) {
    if (
      lastUserId === userId &&
      profileBusinesses.find((v, k) => k === lastBusinessId)
    ) {
      yield put(setCurrentBusiness(lastBusinessId));
    } else {
      yield put(setCurrentBusiness(profileBusinesses.first().get("id")));
    }
  }
  yield put(saveCurrentUserId(userId));
}

const delay = ms => new Promise(res => setTimeout(res, ms));

function* subscribeForRefreshToken() {
  if (!isServer && Cookies.get("isAuthenticated")) {
    const msBeforeExpires = 30000;
    yield delay(Cookies.get("accessTokenExpiresIn") * 1000 - msBeforeExpires);
    yield put(refreshToken());
  }
}

function* showSuccessPasswordChangeMsg() {
  yield put(
    Notifications.success({
      message: "changePasswordSuccess"
    })
  );
}

function* handleLogout() {
  yield (window.location.href = `${API_URL}/logout_user?origin_url=${APP_URL}`);
}

export default all([
  takeEvery([LOAD_USER_DATA], fetchUserData),
  takeEvery([REFRESH_TOKEN_SUCCESS], subscribeForRefreshToken),
  takeEvery([CHANGE_PASSWORD_SUCCESS], showSuccessPasswordChangeMsg),
  takeEvery([LOGOUT], handleLogout)
]);
