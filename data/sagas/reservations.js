/* eslint-disable camelcase */
import { takeEvery, put, all } from "redux-saga/effects";
import {
  PATCH_RESERVATION_SUCCESS,
  PATCH_RESERVATION_REJECT_SUCCESS,
  PATCH_RESERVATION_CANCEL_SUCCESS
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

export default all([
  takeEvery(
    [
      PATCH_RESERVATION_SUCCESS,
      PATCH_RESERVATION_REJECT_SUCCESS,
      PATCH_RESERVATION_CANCEL_SUCCESS
    ],
    getReservation
  )
]);
