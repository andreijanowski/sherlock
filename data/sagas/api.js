import axios from "axios";
import normalize from "json-api-normalizer";
import Notifications from "react-notification-system-redux";
import getErrorMessage from "utils/getErrorMessage";
import { takeEvery, call, put, select } from "redux-saga/effects";
import { logout } from "actions/auth";
import { REFRESH_TOKEN_REQUEST } from "types/auth";
import isServer from "utils/isServer";
import { contentTypes, APP_URL } from "consts";
import qs from "qs";
import humps from "humps";

const delay = ms => new Promise(res => setTimeout(res, ms));

function* waitForToken() {
  yield delay(1000);
  const isTokenRefreshing = window.localStorage.getItem("refreshingToken");
  if (isTokenRefreshing === "true") {
    yield waitForToken();
  }
}

export const client = axios.create({
  baseURL: APP_URL,
  method: "GET",
  headers: {
    "Content-Type": contentTypes.JSONAPI
  },
  paramsSerializer: params => qs.stringify(params, { arrayFormat: "brackets" }),
  transformResponse: [
    ...axios.defaults.transformResponse,
    data => humps.camelizeKeys(data)
  ],
  transformRequest: [
    data => humps.decamelizeKeys(data),
    ...axios.defaults.transformRequest
  ]
});

function* makeApiCall({ type, payload: { endpoint, ...options } = {}, meta }) {
  const [HEAD] = type.split("_REQUEST");

  try {
    const response = yield call(client, endpoint, options);

    if (type === REFRESH_TOKEN_REQUEST) {
      yield window.localStorage.setItem("refreshingToken", "false");
      yield window.localStorage.setItem("refreshingTokenAppInstance", null);
    }

    yield put({
      type: `${HEAD}_SUCCESS`,
      payload: {
        ...response,
        data: normalize(response.data),
        rawData: response.data
      },
      meta
    });
  } catch (error) {
    if (
      `${HEAD}` !== "CONNECT_PARTNER_WITH_UBER_EATS" &&
      error.response &&
      error.response.status === 401
    ) {
      yield put(logout());
      yield put(
        Notifications.error({
          message: "loggedOut",
          uid: "logout"
        })
      );
    } else if (
      error.response &&
      error.response.data &&
      error.response.data.errors &&
      !meta.hideErrorNotification
    ) {
      const { errors } = error.response.data;
      yield put(getErrorMessage(errors));
    } else {
      yield put(Notifications.error({ message: error.message }));
    }

    if (type === REFRESH_TOKEN_REQUEST) {
      yield window.localStorage.setItem("refreshingToken", "false");
      yield window.localStorage.setItem("refreshingTokenAppInstance", null);
    }

    yield put({
      type: `${HEAD}_FAIL`,
      payload: error,
      meta,
      error: true
    });
  }
}

function* handleApiCall({ type, payload, meta }) {
  const [HEAD] = type.split("_REQUEST");
  if (!isServer) {
    const isTokenRefreshing = window.localStorage.getItem("refreshingToken");
    if (isTokenRefreshing === "true") {
      if (type === REFRESH_TOKEN_REQUEST) {
        yield put({
          type: `${HEAD}_CANCEL`
        });
      } else {
        yield waitForToken();
        yield makeApiCall({
          type,
          payload,
          meta
        });
      }
    } else {
      if (type === REFRESH_TOKEN_REQUEST) {
        const uuid = yield select(state =>
          state.getIn(["app", "instanceUuid"])
        );
        yield window.localStorage.setItem("refreshingToken", "true");
        yield window.localStorage.setItem("refreshingTokenAppInstance", uuid);
      }
      yield makeApiCall({
        type,
        payload,
        meta
      });
    }
  } else {
    yield makeApiCall({
      type,
      payload,
      meta
    });
  }
}

export default takeEvery(
  action => /\s*_REQUEST$/.test(action.type),
  handleApiCall
);
