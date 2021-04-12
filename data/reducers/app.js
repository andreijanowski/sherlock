/* eslint-disable no-param-reassign */
import {
  PATH_CHANGED,
  SET_ORDERS_BADGE_NUMBER,
  SET_RESERVATIONS_BADGE_NUMBER,
  SET_INSTANCE_UUID,
  TOGGLE_PLAY_NOTIFICATION,
  SET_NESTED_MENU_VISIBILITY
} from "types/app";
import { LOGOUT } from "types/auth";
import { Record, Map } from "immutable";

const initialState = Record({
  currentPath: "/",
  isNestedMenuVisible: null,
  ordersUpdates: Map(),
  reservationsUpdates: Map(),
  instanceUuid: null,
  playNotification: false
})();

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PATH_CHANGED: {
      return state.set("currentPath", payload.path);
    }

    case SET_NESTED_MENU_VISIBILITY: {
      return state.set("isNestedMenuVisible", payload.visible);
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

    case TOGGLE_PLAY_NOTIFICATION: {
      return state.set("playNotification", payload.state);
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
