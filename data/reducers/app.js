/* eslint-disable no-param-reassign */
import {
  PATH_CHANGED,
  SET_ORDERS_BADGE_NUMBER,
  SET_RESERVATIONS_BADGE_NUMBER,
  SET_INSTANCE_UUID
} from "types/app";
import { LOGOUT } from "types/auth";
import { Record, Map } from "immutable";

const initialState = Record({
  currentPath: "/",
  ordersUpdates: Map(),
  reservationsUpdates: Map(),
  instanceUuid: null
})();

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PATH_CHANGED: {
      return state.set("currentPath", payload.path);
    }

    case SET_ORDERS_BADGE_NUMBER: {
      return state.set("ordersUpdates", payload.number);
    }

    case SET_RESERVATIONS_BADGE_NUMBER: {
      return state.set("reservationsUpdates", payload.number);
    }

    case SET_INSTANCE_UUID: {
      return state.set("instanceUuid", payload.uuid);
    }

    case LOGOUT: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};

export default reducer;