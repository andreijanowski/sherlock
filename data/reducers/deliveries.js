/* eslint-disable no-param-reassign */
import {
  POST_DELIVERY_SUCCESS,
  DELETE_DELIVERY_REQUEST
} from "types/deliveries";
import {
  FETCH_BUSINESS_DELIVERIES_REQUEST,
  FETCH_BUSINESS_DELIVERIES_SUCCESS,
  FETCH_BUSINESS_DELIVERIES_FAIL
} from "types/businesses";
import { LOGOUT } from "types/auth";

import { Record, fromJS } from "immutable";

const initialState = Record({
  data: null,
  isFetching: false,
  isFailed: false,
  isSucceeded: false
})();

const reducer = (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case FETCH_BUSINESS_DELIVERIES_REQUEST: {
      return state.merge(
        Record({
          isFetching: true,
          isFailed: false,
          isSucceeded: false
        })()
      );
    }
    case FETCH_BUSINESS_DELIVERIES_SUCCESS: {
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
          ["data", "deliveries"],
          fromJS(payload.data.deliveries)
        );
      }
      return newState;
    }
    case FETCH_BUSINESS_DELIVERIES_FAIL: {
      let newState = state.merge(
        Record({
          isFetching: false,
          isFailed: true
        })()
      );
      if (meta.page === 1) {
        newState = newState.merge(
          Record({
            data: null
          })()
        );
      }
      return newState;
    }

    case POST_DELIVERY_SUCCESS: {
      if (state.getIn(["data"]) && state.getIn(["data"]).size) {
        return state.mergeIn(
          ["data", "deliveries"],
          fromJS(payload.data.deliveries)
        );
      }
      return state.setIn(["data"], fromJS(payload.data));
    }

    case DELETE_DELIVERY_REQUEST: {
      return state.deleteIn(["data", "deliveries", meta.id]);
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
