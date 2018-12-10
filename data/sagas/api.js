import axios from "axios";
import humps from "humps";
import normalize from "json-api-normalizer";
import Notifications from "react-notification-system-redux";
import qs from "qs";
import isLoginRequest from "utils/isLoginRequest";
import isServer from "utils/isServer";
import getErrorMessage from "utils/getErrorMessage";
import { takeEvery, call, put, select } from "redux-saga/effects";
import { logout, redirectToRegister } from "actions/auth";
import { contentTypes, API_URL, NETGURU_DEV_PASSWORD } from "consts";
import { REFRESH_TOKEN_REQUEST } from "types/auth";

const delay = ms => new Promise(res => setTimeout(res, ms));

function* waitForToken() {
  yield delay(1000);
  const isRefreshing = yield select(state => state.auth.isRefreshing);
  if (isRefreshing) {
    yield waitForToken();
  }
}

const headers = {
  Accept: contentTypes.JSONAPI
};

if (isServer) {
  headers.Cookie = `staging_auth=netguru; domain=${API_URL}; expires=30-Dec-2039 3:59:59 #GMT`;
}

// eslint-disable-next-line no-undef
if (!isServer && window.location.host === "localhost:3000") {
  headers.NETGURU_DEV_PASSWORD = NETGURU_DEV_PASSWORD;
}

export const client = axios.create({
  baseURL: API_URL,
  method: "GET",
  headers,
  transformResponse: [
    ...axios.defaults.transformResponse,
    data => humps.camelizeKeys(data)
  ],
  transformRequest: [
    data => humps.decamelizeKeys(data),
    ...axios.defaults.transformRequest
  ],
  paramsSerializer: params => qs.stringify(params, { arrayFormat: "brackets" })
});

function* handleApiCall(action) {
  const {
    type,
    payload: { endpoint, jsonapi = true, authRequired = true, ...options } = {},
    meta
  } = action;

  const additionalOptions = {
    headers: {
      "Content-Type": jsonapi ? contentTypes.JSONAPI : contentTypes.JSON
    }
  };

  if (authRequired) {
    const isRefreshing = yield select(state => state.auth.isRefreshing);
    if (isRefreshing && type !== REFRESH_TOKEN_REQUEST) {
      yield waitForToken();
    }
    const token = yield select(state => state.auth.accessToken);
    additionalOptions.headers = {
      ...additionalOptions.headers,
      Authorization: `Bearer ${token}`
    };
  }

  const mergedOptions = {
    ...options,
    headers: {
      ...options.headers,
      ...additionalOptions.headers
    }
  };

  const [HEAD] = type.split("_REQUEST");
  try {
    const response = yield call(client, endpoint, mergedOptions);
    const isJsonapi = response.headers["content-type"] === contentTypes.JSONAPI;

    yield put({
      type: `${HEAD}_SUCCESS`,
      payload: {
        ...response,
        data: isJsonapi ? normalize(response.data) : response.data,
        rawData: response.data
      },
      meta
    });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      if (isLoginRequest(error.response)) {
        if (error.response.data.error === "terms_agreement_error") {
          yield put(
            Notifications.error({
              message: "termsAgreementError"
            })
          );
          yield put(redirectToRegister());
        } else {
          yield put(
            Notifications.error({
              message: "loginFailed"
            })
          );
        }
      } else {
        yield put(logout());
        yield put(
          Notifications.error({
            message: "loggedOut",
            uid: "logout"
          })
        );
      }
    } else if (
      error.response &&
      error.response.data &&
      error.response.data.errors
    ) {
      const { errors } = error.response.data;
      yield put(getErrorMessage(errors));
    } else {
      yield put(Notifications.error({ message: error.message }));
    }

    yield put({
      type: `${HEAD}_FAIL`,
      payload: error,
      meta,
      error: true
    });
  }
}

export default takeEvery(
  action => /\s*_REQUEST$/.test(action.type),
  handleApiCall
);
