/* eslint-disable camelcase */
import { all, put, takeEvery, select } from "redux-saga/effects";
import {
  PATH_CHANGED,
  SET_CURRENT_BUSINESS,
  SET_CURRENT_USER_ID
} from "types/app";
import { HANDLE_ORDER_UPDATE } from "types/orders";
import { HANDLE_RESERVATION_UPDATE } from "types/reservations";
import { setOrdersUpdates, setReservationsUpdates } from "actions/app";
import { fetchProfileBusiness } from "actions/users";
import { fetchBusinessMembers, fetchBusinessDishes } from "actions/businesses";
import { fetchPartners } from "actions/partners";
import { fetchWholesalers } from "actions/wholesalers";
import Notifications from "react-notification-system-redux";
import { Map } from "immutable";

function* handlePatchChangeSaga({ payload: { path } }) {
  switch (path) {
    case "/app/profile/basicInformation":
    case "/app/profile/contactInformation":
    case "/app/profile/additionalInformation":
    case "/app/profile/openingHours":
    case "/app/profile/picturesAndMenus":
    case "/app/profile/liveInfo": {
      const business = yield select(state =>
        state.getIn(["users", "currentBusiness", "data", "businesses"])
      );
      if (business) {
        const id = business.first().get("id");
        yield put(fetchProfileBusiness(id, false));
      }
      break;
    }
    case "/app/profile/members": {
      const business = yield select(state =>
        state.getIn(["users", "currentBusiness", "data", "businesses"])
      );
      if (business) {
        const id = business.first().get("id");
        yield put(fetchBusinessMembers(id));
      }
      break;
    }
    case "/app/lefood/menu": {
      const business = yield select(state =>
        state.getIn(["users", "currentBusiness", "data", "businesses"])
      );
      if (business) {
        const id = business.first().get("id");
        yield put(fetchBusinessDishes(id));
      }
      break;
    }
    case "/app/lefood/orders": {
      yield put(setOrdersUpdates(Map()));
      break;
    }
    case "/app/reservation/reservations": {
      yield put(setReservationsUpdates(Map()));
      break;
    }
    case "/app/integrations": {
      const business = yield select(state =>
        state.getIn(["users", "currentBusiness", "data", "businesses"])
      );
      if (business) {
        console.log("bus");
        console.log(business);
        const id = business.first().get("id");
        yield put(fetchPartners(id));
      }
      break;
    }
    case "/app/wholesalers": {
      yield put(fetchWholesalers());
      break;
    }
    default: {
      break;
    }
  }
}

function* setCurrentBusiness({ payload: { id } }) {
  yield window.localStorage.setItem("currentBusinessId", id);
}

function* setCurrentUserId({ payload: { id } }) {
  yield window.localStorage.setItem("currentUserId", id);
}

function* handleSettingOrdersUpdates({
  payload: { business_uuid, order_uuid }
}) {
  const id = yield select(state =>
    state
      .getIn(["users", "currentBusiness", "data", "businesses"])
      .first()
      .get("id")
  );
  if (business_uuid === id) {
    yield put(
      Notifications.success({
        message: "orderUpdate"
      })
    );
    const path = yield select(state => state.getIn(["app", "currentPath"]));
    if (path !== "/app/lefood/orders") {
      const ordersUpdates = yield select(state =>
        state.getIn(["app", "ordersUpdates"])
      );
      yield put(setOrdersUpdates(ordersUpdates.set(order_uuid, true)));
    }
  }
}

function* handleSettingReservationsUpdates({
  payload: { business_uuid, order_uuid }
}) {
  const id = yield select(state =>
    state
      .getIn(["users", "currentBusiness", "data", "businesses"])
      .first()
      .get("id")
  );
  if (business_uuid === id) {
    yield put(
      Notifications.success({
        message: "reservationUpdate"
      })
    );
    const path = yield select(state => state.getIn(["app", "currentPath"]));
    if (path !== "/app/reservation/reservations") {
      const reservationsUpdates = yield select(state =>
        state.getIn(["app", "reservationsUpdates"])
      );
      yield put(
        setReservationsUpdates(reservationsUpdates.set(order_uuid, true))
      );
    }
  }
}

export default all([
  takeEvery(PATH_CHANGED, handlePatchChangeSaga),
  takeEvery(SET_CURRENT_BUSINESS, setCurrentBusiness),
  takeEvery(SET_CURRENT_USER_ID, setCurrentUserId),
  takeEvery(HANDLE_ORDER_UPDATE, handleSettingOrdersUpdates),
  takeEvery(HANDLE_RESERVATION_UPDATE, handleSettingReservationsUpdates)
]);
