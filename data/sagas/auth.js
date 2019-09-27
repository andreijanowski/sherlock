import { takeEvery, put, putResolve, all, select } from "redux-saga/effects";
import {
  fetchProfile,
  fetchProfileBusinesses,
  fetchProfileCards,
  fetchProfileSubscriptions
} from "actions/users";
import { fetchGroups } from "actions/groups";
import { postBusiness } from "actions/businesses";
import {
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_FAIL,
  LOGOUT
} from "types/auth";
import { refreshToken as refresh } from "actions/auth";
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
  } = yield putResolve(fetchProfile());
  yield fetchAllUserData(fetchProfileCards);
  yield put(fetchProfileSubscriptions());
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
  } else {
    yield put(postBusiness());
  }
  yield put(saveCurrentUserId(userId));
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
  takeEvery([REFRESH_TOKEN_SUCCESS], fetchUserData),
  takeEvery([REFRESH_TOKEN_SUCCESS], subscribeForRefresh),
  takeEvery([REFRESH_TOKEN_REQUEST], setRefreshing),
  takeEvery([REFRESH_TOKEN_FAIL, LOGOUT], removeToken)
]);
