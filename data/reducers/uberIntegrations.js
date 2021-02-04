import {
  FETCH_BUSINESS_PARTNERSHIPS_REQUEST,
  FETCH_BUSINESS_PARTNERSHIPS_SUCCESS,
  CONNECT_PARTNER_WITH_UBER_EATS_SUCCESS,
  DISCONNECT_PARTNER_FROM_UBER_EATS_SUCCESS,
  CONNECT_PARTNER_WITH_UBER_EATS_REQUEST,
  CONNECT_PARTNER_WITH_UBER_EATS_FAIL,
  UPLOAD_MENU_TO_UBER_EATS_SUCCESS,
  UPLOAD_MENU_TO_UBER_EATS_REQUEST
} from "types/integrations";
import { LOGOUT } from "types/auth";
import { Record } from "immutable";

export const initialState = Record({
  isConnectedToUberEats: false,
  isFetching: false,
  isFailed: false,
  isSucceeded: true
})();

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_BUSINESS_PARTNERSHIPS_REQUEST: {
      return state.merge(
        Record({
          isFetching: true,
          isFailed: false,
          isSucceeded: false
        })()
      );
    }
    case FETCH_BUSINESS_PARTNERSHIPS_SUCCESS: {
      const isConnectedToUberEats =
        payload.rawData.included &&
        payload.rawData.included.some(
          service => service.attributes.name === "Uber Eats"
        );
      const newState = state.merge(
        Record({
          isFetching: false,
          isSucceeded: true,
          isConnectedToUberEats
        })()
      );

      return newState;
    }
    case DISCONNECT_PARTNER_FROM_UBER_EATS_SUCCESS: {
      return state.merge(
        Record({
          isFetching: false,
          isSucceeded: true,
          isConnectedToUberEats: false
        })()
      );
    }

    case CONNECT_PARTNER_WITH_UBER_EATS_REQUEST: {
      return state.merge(
        Record({
          isFetching: true
        })()
      );
    }

    case CONNECT_PARTNER_WITH_UBER_EATS_FAIL: {
      return state.merge(
        Record({
          isFetching: false,
          isFailed: true
        })()
      );
    }

    case CONNECT_PARTNER_WITH_UBER_EATS_SUCCESS: {
      return state.merge(
        Record({
          isFetching: false,
          isSucceeded: true,
          isConnectedToUberEats: true
        })()
      );
    }

    case UPLOAD_MENU_TO_UBER_EATS_REQUEST: {
      return state.merge(
        Record({
          isFetching: true
        })()
      );
    }

    case UPLOAD_MENU_TO_UBER_EATS_SUCCESS: {
      return state.merge(
        Record({
          isFetching: false,
          isSucceeded: true
        })()
      );
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
