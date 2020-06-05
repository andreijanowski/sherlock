/* eslint-disable camelcase */
import { takeEvery, put, all, select } from "redux-saga/effects";
import { HANDLE_ORDER_UPDATE } from "types/orders";
import { fetchOrder } from "actions/orders";
import { togglePlayNotification } from "actions/app";

function* handleFetch({ payload: { business_uuid, order_uuid, state } }) {
  const id = yield select(appState =>
    appState
      .getIn(["users", "currentBusiness", "data", "businesses"])
      .first()
      .get("id")
  );

  if (business_uuid === id) {
    yield put(fetchOrder(order_uuid));
  }

  if (business_uuid === id && state === "waiting_for_approval") {
    yield put(togglePlayNotification());
  }
}

export default all([takeEvery([HANDLE_ORDER_UPDATE], handleFetch)]);
