import { fetchProfileBusiness } from "actions/users";
import {
  fetchBusinessMembers,
  fetchBusinessDeliveries
} from "actions/businesses";
import { SET_CURRENT_BUSINESS, UPDATE_PROFILE_SUCCESS } from "types/users";
import { POST_BUSINESS_SUCCESS } from "types/businesses";
import { takeEvery, all, put } from "redux-saga/effects";
import Notifications from "react-notification-system-redux";

function* fetchBusinessData({
  payload: {
    rawData: {
      data: { id }
    }
  }
}) {
  yield put(fetchProfileBusiness(id));
  yield put(fetchBusinessMembers(id));
  yield put(fetchBusinessDeliveries(id));
}

function* showSuccesNotification() {
  yield put(
    Notifications.success({
      message: "updateProfileSuccess"
    })
  );
}

export default all([
  takeEvery([SET_CURRENT_BUSINESS, POST_BUSINESS_SUCCESS], fetchBusinessData),
  takeEvery(UPDATE_PROFILE_SUCCESS, showSuccesNotification)
]);
