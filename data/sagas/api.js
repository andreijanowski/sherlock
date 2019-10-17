import axios from "axios";
import normalize from "json-api-normalizer";
import Notifications from "react-notification-system-redux";
import isLoginRequest from "utils/isLoginRequest";
import getErrorMessage from "utils/getErrorMessage";
import { takeEvery, call, put } from "redux-saga/effects";
import { logout } from "actions/auth";
import { contentTypes, APP_URL } from "consts";
import qs from "qs";
import humps from "humps";

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

function* handleApiCall({
  type,
  payload: { endpoint, ...options } = {},
  meta
}) {
  const [HEAD] = type.split("_REQUEST");
  try {
    const response = yield call(client, endpoint, options);

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
    if (error.response && error.response.status === 401) {
      if (isLoginRequest(error.response)) {
        if (error.response.data.error === "terms_agreement_error") {
          yield put(
            Notifications.error({
              message: "termsAgreementError"
            })
          );
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
