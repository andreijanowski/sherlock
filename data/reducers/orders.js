/* eslint-disable no-param-reassign */
import { LOGOUT } from "types/auth";
import {
  FETCH_BUSINESS_ORDERS_REQUEST,
  FETCH_BUSINESS_ORDERS_SUCCESS,
  FETCH_BUSINESS_ORDERS_FAIL
} from "types/businesses";
import {
  FETCH_ORDER_SUCCESS,
  PATCH_ORDER_SUCCESS,
  PATCH_ORDER_REJECT_SUCCESS
} from "types/orders";

import { Record, fromJS } from "immutable";

const initialState = Record({
  data: null,
  isFetching: false,
  isFailed: false,
  isSucceeded: false
})();

const reducer = (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case FETCH_BUSINESS_ORDERS_REQUEST: {
      return state.merge(
        Record({
          isFetching: true,
          isFailed: false,
          isSucceeded: false
        })()
      );
    }
    case FETCH_BUSINESS_ORDERS_SUCCESS: {
      state = state.merge(
        Record({
          isFetching: false,
          isSucceeded: true
        })()
      );
      if (meta.page === 1) {
        state = state.setIn(["data"], fromJS(payload.data));
      } else {
        state = state.mergeIn(["data", "orders"], fromJS(payload.data.orders));
        state = state.mergeIn(
          ["data", "elements"],
          fromJS(payload.data.elements)
        );
        state = state.mergeIn(
          ["data", "addresses"],
          fromJS(payload.data.addresses)
        );
      }
      return state;
    }
    case FETCH_BUSINESS_ORDERS_FAIL: {
      state = state.merge(
        Record({
          isFetching: false,
          isFailed: true
        })()
      );
      if (meta.page === 1) {
        state = state.merge(
          Record({
            data: null
          })()
        );
      }
      return state;
    }
    case FETCH_ORDER_SUCCESS: {
      if (state.get("data") && state.get("data").size) {
        state = state.mergeIn(["data", "orders"], fromJS(payload.data.orders));
        state = state.mergeIn(
          ["data", "elements"],
          fromJS(payload.data.elements)
        );
        state = state.mergeIn(
          ["data", "addresses"],
          fromJS(payload.data.addresses)
        );
      } else {
        state = state.setIn(["data"], fromJS(payload.data));
      }
      return state;
    }

    case PATCH_ORDER_SUCCESS:
    case PATCH_ORDER_REJECT_SUCCESS: {
      state = state.mergeIn(["data", "orders"], fromJS(payload.data.orders));
      state = state.mergeIn(
        ["data", "elements"],
        fromJS(payload.data.elements)
      );
      state = state.mergeIn(
        ["data", "addresses"],
        fromJS(payload.data.addresses)
      );
      return state;
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
