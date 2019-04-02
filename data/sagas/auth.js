import { takeEvery, put, all, select, takeLatest } from "redux-saga/effects";
import { REHYDRATE } from "redux-persist";
import {
  fetchProfile,
  fetchProfileBusinesses,
  fetchProfileBusiness,
  fetchProfileCards,
  fetchProfileSubscriptions
} from "actions/users";
import { fetchGroups } from "actions/groups";
import {
  fetchBusinessMembers,
  postBusiness,
  fetchBusinessDeliveries,
  fetchBusinessDishes,
  fetchBusinessOrders
} from "actions/businesses";
import {
  LOGIN_SUCCESS,
  FACEBOOK_LOGIN_SUCCESS,
  REFRESH_TOKEN_SUCCESS,
  CHANGE_PASSWORD_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_BY_TOKEN_SUCCESS
} from "types/auth";
import Notifications from "react-notification-system-redux";
import { refreshToken as refresh } from "actions/auth";

function* initialTokenRefresh() {
  const refreshToken = yield select(state => state.auth.refreshToken);
  if (refreshToken) {
    yield put(refresh({ refreshToken }));
  }
}

function* fetchUserData() {
  yield put(fetchProfile());
  yield put(fetchGroups());
  const {
    rawData: { data }
  } = yield put.resolve(fetchProfileBusinesses());
  if (data && data.length) {
    yield put(fetchProfileBusiness(data[0].id));
    yield put(fetchBusinessMembers(data[0].id));
    yield put(fetchBusinessDeliveries(data[0].id));
    yield put(fetchBusinessDishes(data[0].id));
    yield put(fetchBusinessOrders(data[0].id));
    yield put(fetchProfileCards());
    yield put(fetchProfileSubscriptions());
  } else {
    yield put(postBusiness());
  }
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
  Router.pushRoute("/login");
}

export default all([
  takeLatest(REHYDRATE, initialTokenRefresh),
  takeEvery(
    [LOGIN_SUCCESS, FACEBOOK_LOGIN_SUCCESS, REFRESH_TOKEN_SUCCESS],
    fetchUserData
  ),
  takeEvery(CHANGE_PASSWORD_SUCCESS, showSuccessPasswordChangeMsg),
  takeEvery(RESET_PASSWORD_SUCCESS, showSuccessResetPasswordMsg),
  takeEvery(CHANGE_PASSWORD_BY_TOKEN_SUCCESS, onSuccessPasswordChangeByToken)
]);
