/* eslint-disable camelcase */
import { takeEvery, put, all, select } from "redux-saga/effects";
import { HANDLE_ORDER_UPDATE } from "types/orders";
import { fetchOrder } from "actions/orders";

function* handleFetch({ payload: { business_uuid, order_uuid } }) {
  const id = yield select(state =>
    state
      .getIn(["users", "currentBusiness", "data", "businesses"])
      .first()
      .get("id")
  );

  if (business_uuid === id) {
    yield put(fetchOrder(order_uuid));
  }
}

export default all([takeEvery([HANDLE_ORDER_UPDATE], handleFetch)]);
