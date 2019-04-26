import { fetchProfileBusiness } from "actions/users";
import {
  fetchBusinessMembers,
  fetchBusinessDeliveries,
  fetchBusinessDishes,
  fetchBusinessOrders,
  fetchBusinessCaterings
} from "actions/businesses";
import { UPDATE_PROFILE_SUCCESS } from "types/users";
import { SET_CURRENT_BUSINESS } from "types/app";
import { POST_BUSINESS_SUCCESS } from "types/businesses";
import { takeEvery, all, put } from "redux-saga/effects";
import Notifications from "react-notification-system-redux";
import { setCurrentBusiness } from "actions/app";
import { fetchAllData } from "./utils";

function* fetchBusinessData({ payload: { id } }) {
  yield put(fetchProfileBusiness(id));
  yield fetchAllData(fetchBusinessMembers, id);
  yield fetchAllData(fetchBusinessDeliveries, id);
  yield fetchAllData(fetchBusinessDishes, id);
  yield fetchAllData(fetchBusinessOrders, id);
  yield fetchAllData(fetchBusinessCaterings, id);
}

function* showSuccesNotification() {
  yield put(
    Notifications.success({
      message: "updateProfileSuccess"
    })
  );
}

function* setBusiness({
  payload: {
    rawData: {
      data: { id }
    }
  }
}) {
  yield put(setCurrentBusiness(id));
}

export default all([
  takeEvery([POST_BUSINESS_SUCCESS], setBusiness),
  takeEvery([SET_CURRENT_BUSINESS], fetchBusinessData),
  takeEvery(UPDATE_PROFILE_SUCCESS, showSuccesNotification)
]);
