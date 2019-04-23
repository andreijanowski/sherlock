import {
  takeEvery,
  put,
  all,
  select,
  takeLatest,
  call,
  take,
  fork
} from "redux-saga/effects";
import { eventChannel } from "redux-saga";
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
  fetchBusinessOrders,
  fetchBusinessCaterings
} from "actions/businesses";
import { fetchStripePlans } from "actions/stripe";
import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  FACEBOOK_LOGIN_SUCCESS,
  REFRESH_TOKEN_SUCCESS,
  CHANGE_PASSWORD_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_BY_TOKEN_SUCCESS
} from "types/auth";
import Notifications from "react-notification-system-redux";
import {
  refreshToken as refresh,
  setAuthSynchronizedFromStorage
} from "actions/auth";
import { setCurrentBusiness } from "actions/app";

const delay = ms => new Promise(res => setTimeout(res, ms));

function createLocalstorageChannel() {
  return eventChannel(emit => {
    const watchHandler = event => {
      emit(event);
    };
    window.addEventListener("storage", watchHandler);
    const unsubscribe = () => {
      window.removeEventListener("storage", watchHandler);
    };

    return unsubscribe;
  });
}

function* syncWithLocalStorage() {
  const storageChanel = yield call(createLocalstorageChannel);
  while (true) {
    const payload = yield take(storageChanel);
    if (payload.key === "persist:sherlock") {
      const parsedNewValue = JSON.parse(payload.newValue);
      const parsedOldValue = JSON.parse(payload.oldValue);
      if (parsedNewValue.auth !== parsedOldValue.auth) {
        const parsedAuth = JSON.parse(parsedNewValue.auth);
        yield put(setAuthSynchronizedFromStorage(parsedAuth));
      }
    }
  }
}

function* subscribeForRefresh() {
  const { expiresIn } = yield select(state => state.auth);
  // 5 minutes before expires
  const msBeforeExpires = 300000;
  yield delay(expiresIn * 1000 - msBeforeExpires);
  const refreshToken = yield select(state => state.auth.refreshToken);
  if (refreshToken) {
    yield put(refresh({ refreshToken }));
  }
}

function* fetchBusinessData(id) {
  yield put(fetchProfileBusiness(id));
  yield put(fetchBusinessMembers(id));
  yield put(fetchBusinessDeliveries(id));
  yield put(fetchBusinessDishes(id));
  yield put(fetchBusinessOrders(id));
  yield put(fetchBusinessCaterings(id));
}

function* fetchUserData() {
  yield put(fetchProfile());
  yield put(fetchProfileCards());
  yield put(fetchProfileSubscriptions());
  yield put(fetchGroups());
  yield put(fetchStripePlans());
  const currentBusinessId = yield select(state => state.app.currentBusinessId);
  if (currentBusinessId) {
    yield fetchBusinessData(currentBusinessId);
    yield put(fetchProfileBusinesses());
  } else {
    const {
      rawData: { data }
    } = yield put.resolve(fetchProfileBusinesses());
    if (data && data.length) {
      yield fetchBusinessData(data[0].id);
      yield put(setCurrentBusiness(data[0].id));
    } else {
      yield put(postBusiness());
    }
  }
}

function* initialTokenRefresh() {
  const refreshToken = yield select(state => state.auth.refreshToken);
  const createdAt = yield select(state => state.auth.createdAt);
  const expiresIn = yield select(state => state.auth.expiresIn);
  if (refreshToken) {
    if ((createdAt + expiresIn) * 1000 < new Date().getTime()) {
      yield put(refresh({ refreshToken }));
    } else {
      yield fetchUserData();
      yield fork(syncWithLocalStorage);
      yield subscribeForRefresh();
    }
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
}

export default all([
  takeLatest(REHYDRATE, initialTokenRefresh),
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
    syncWithLocalStorage
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
  takeEvery(CHANGE_PASSWORD_BY_TOKEN_SUCCESS, onSuccessPasswordChangeByToken)
]);
