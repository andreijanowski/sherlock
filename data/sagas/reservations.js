/* eslint-disable camelcase */
import { takeEvery, put, all, select } from "redux-saga/effects";
import {
  PATCH_RESERVATION_SUCCESS,
  PATCH_RESERVATION_REJECT_SUCCESS,
  PATCH_RESERVATION_CANCEL_SUCCESS,
  HANDLE_RESERVATION_UPDATE
} from "types/reservations";
import { fetchReservation } from "actions/reservations";

function* getReservation({
  payload: {
    rawData: {
      data: { id }
    }
  }
}) {
  yield put(fetchReservation(id));
}

function* updateReservation({ payload: { business_uuid, reservation_uuid } }) {
  const id = yield select(state =>
    state
      .getIn(["users", "currentBusiness", "data", "businesses"])
      .first()
      .get("id")
  );

  if (business_uuid === id) {
    yield put(fetchReservation(reservation_uuid));
  }
}

export default all([
  takeEvery(
    [
      PATCH_RESERVATION_SUCCESS,
      PATCH_RESERVATION_REJECT_SUCCESS,
      PATCH_RESERVATION_CANCEL_SUCCESS
    ],
    getReservation
  ),
  takeEvery([HANDLE_RESERVATION_UPDATE], updateReservation)
]);
