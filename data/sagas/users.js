import { fetchProfileBusiness } from "actions/users";
import {
  fetchBusinessMembers,
  fetchBusinessDeliveries,
  fetchBusinessDishes,
  fetchBusinessOrders
} from "actions/businesses";
import { patchOrder } from "actions/orders";
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
  yield put(fetchBusinessDishes(id));
  const {
    rawData: { data: orders }
  } = yield put.resolve(fetchBusinessOrders(id));
  for (let i = 0; i < orders.length; i += 1) {
    if (orders[i].state === "placed") {
      yield put(patchOrder({ state: "waiting_for_approval" }, orders[i].id));
    }
  }
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
