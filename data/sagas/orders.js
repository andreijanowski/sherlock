/* eslint-disable camelcase */
import Notifications from "react-notification-system-redux";
import { takeEvery, put, all, select } from "redux-saga/effects";

import { HANDLE_ORDER_UPDATE } from "types/orders";
import { fetchOrder } from "actions/orders";
import { togglePlayNotification } from "actions/app";
import {
  selectCurrentBusinessId,
  selectIsOrdersNotificationsEnabled
} from "selectors/business";
import { showNativeNotification } from "utils/misc";
import { i18n } from "i18n";

const NEW_ORDER_STATE = "waiting_for_approval";
const ORDER_CREATE_TRANS_KEY = "orderCreate";

function* handleOrderUpdate({ payload: { business_uuid, order_uuid, state } }) {
  const currentBusinessId = yield select(selectCurrentBusinessId);
  const isCurrentBusiness = business_uuid === currentBusinessId;

  if (!isCurrentBusiness) return;

  yield put(fetchOrder(order_uuid));
  const isNotificationsEnabled = yield select(
    selectIsOrdersNotificationsEnabled
  );

  if (!isNotificationsEnabled) return;

  const isNewOrder = state === NEW_ORDER_STATE;

  yield put(
    Notifications.success(
      isNewOrder
        ? {
            message: ORDER_CREATE_TRANS_KEY,
            position: "tr",
            autoDismiss: 10
          }
        : {
            message: "orderUpdate"
          }
    )
  );
  if (isNewOrder) {
    yield put(togglePlayNotification());
    const t = i18n.getFixedT(i18n.language, ["notifications"]);
    showNativeNotification(t(ORDER_CREATE_TRANS_KEY));
  }
}

export default all([takeEvery([HANDLE_ORDER_UPDATE], handleOrderUpdate)]);
