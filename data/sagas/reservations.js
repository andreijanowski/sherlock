/* eslint-disable camelcase */
import Notifications from "react-notification-system-redux";
import { takeEvery, put, all, select } from "redux-saga/effects";

import {
  PATCH_RESERVATION_SUCCESS,
  PATCH_RESERVATION_REJECT_SUCCESS,
  PATCH_RESERVATION_CANCEL_SUCCESS,
  HANDLE_RESERVATION_UPDATE
} from "types/reservations";
import { fetchReservation } from "actions/reservations";
import { togglePlayNotification } from "actions/app";
import {
  selectCurrentBusinessId,
  selectIsReservationsNotificationsEnabled
} from "selectors/business";

const NEW_NOTIFICATION_STATE = "placed";

function* getReservation({
  payload: {
    rawData: {
      data: { id }
    }
  }
}) {
  yield put(fetchReservation(id));
}

function* handleReservationUpdate({
  payload: { business_uuid, reservation_uuid, state }
}) {
  const currentBusinessId = yield select(selectCurrentBusinessId);
  const isCurrentBusiness = business_uuid === currentBusinessId;

  if (!isCurrentBusiness) return;

  yield put(fetchReservation(reservation_uuid));

  const isNotificationsEnabled = yield select(
    selectIsReservationsNotificationsEnabled
  );

  if (!isNotificationsEnabled) return;

  yield put(
    Notifications.success({
      message: "reservationUpdate"
    })
  );

  const isNewNotification = state === NEW_NOTIFICATION_STATE;
  if (isNewNotification) {
    yield put(togglePlayNotification());
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
  takeEvery([HANDLE_RESERVATION_UPDATE], handleReservationUpdate)
]);
