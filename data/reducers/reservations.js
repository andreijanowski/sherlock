/* eslint-disable no-param-reassign */
import {
  FETCH_RESERVATION_SUCCESS,
  POST_RESERVATION_SUCCESS,
  PATCH_RESERVATION_SUCCESS,
  PATCH_RESERVATION_REJECT_SUCCESS,
  DELETE_RESERVATION_REQUEST,
  SET_EDIT_RESERVATION
} from "types/reservations";
import {
  FETCH_BUSINESS_RESERVATIONS_REQUEST,
  FETCH_BUSINESS_RESERVATIONS_SUCCESS,
  FETCH_BUSINESS_RESERVATIONS_FAIL
} from "types/businesses";
import { LOGOUT } from "types/auth";

import { Record, Map, fromJS } from "immutable";

export const initialState = Record({
  data: Map(),
  isFetching: false,
  isFailed: false,
  isSucceeded: false,
  editedReservation: null
})();

const reducer = (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case FETCH_BUSINESS_RESERVATIONS_REQUEST: {
      return state.merge(
        Record({
          isFetching: true,
          isFailed: false,
          isSucceeded: false
        })()
      );
    }
    case FETCH_BUSINESS_RESERVATIONS_SUCCESS: {
      let newState = state.merge(
        Record({
          isFetching: false,
          isSucceeded: true
        })()
      );
      if (meta.page === 1) {
        newState = newState.setIn(["data"], fromJS(payload.data));
      } else {
        newState = newState.mergeIn(
          ["data", "reservations"],
          fromJS(payload.data.reservations)
        );
        newState = newState.mergeIn(
          ["data", "bookings"],
          fromJS(payload.data.bookings)
        );
      }
      return newState;
    }
    case FETCH_BUSINESS_RESERVATIONS_FAIL: {
      let newState = state.merge(
        Record({
          isFetching: false,
          isFailed: true
        })()
      );
      if (meta.page === 1) {
        newState = newState.merge(
          Record({
            data: Map()
          })()
        );
      }
      return newState;
    }

    case FETCH_RESERVATION_SUCCESS: {
      return state
        .mergeIn(["data", "reservations"], fromJS(payload.data.reservations))
        .mergeIn(["data", "bookings"], fromJS(payload.data.bookings));
    }

    case POST_RESERVATION_SUCCESS: {
      if (state.getIn(["data"]) && state.getIn(["data"]).size) {
        return state.mergeIn(
          ["data", "reservations"],
          fromJS(payload.data.reservations)
        );
      }
      return state.setIn(["data"], fromJS(payload.data));
    }

    case PATCH_RESERVATION_SUCCESS:
    case PATCH_RESERVATION_REJECT_SUCCESS: {
      if (state.getIn(["data"]) && state.getIn(["data"]).size) {
        return state.mergeDeepIn(
          ["data", "reservations"],
          fromJS(payload.data.reservations)
        );
      }
      return state.setIn(["data"], fromJS(payload.data));
    }

    case DELETE_RESERVATION_REQUEST: {
      return state.deleteIn(["data", "reservations", meta.id]);
    }

    case SET_EDIT_RESERVATION: {
      return state.set("editedReservation", fromJS(payload.editedReservation));
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
