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
  PATCH_ORDER_REJECT_SUCCESS,
  FETCH_ORKESTRO_STATUS_REQUEST,
  FETCH_ORKESTRO_STATUS_SUCCESS,
  FETCH_ORKESTRO_STATUS_FAIL
} from "types/orders";

import { Record, Map, fromJS } from "immutable";

export const initialState = Record({
  data: Map(),
  isFetching: false,
  isFailed: false,
  isSucceeded: false
})();

const reducer = (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case FETCH_ORKESTRO_STATUS_REQUEST:
      return state.merge(
        Record({
          isFailed: false,
          isSucceeded: false,
          isFetching: false
        })()
      );

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
          ["data", "orders"],
          fromJS(payload.data.orders)
        );
        newState = newState.mergeIn(
          ["data", "elements"],
          fromJS(payload.data.elements)
        );
        newState = newState.mergeIn(
          ["data", "addresses"],
          fromJS(payload.data.addresses)
        );
      }
      return newState;
    }

    case FETCH_BUSINESS_ORDERS_FAIL: {
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

    case FETCH_ORDER_SUCCESS: {
      if (state.get("data") && state.get("data").size) {
        let newState = state.mergeIn(
          ["data", "orders"],
          fromJS(payload.data.orders)
        );
        newState = newState.mergeIn(
          ["data", "elements"],
          fromJS(payload.data.elements)
        );
        newState = newState.mergeIn(
          ["data", "addresses"],
          fromJS(payload.data.addresses)
        );
        return newState;
      }
      return state.setIn(["data"], fromJS(payload.data));
    }

    case PATCH_ORDER_SUCCESS:
    case PATCH_ORDER_REJECT_SUCCESS: {
      return state.mergeIn(
        ["data", "orders", payload.rawData.data.id, "attributes"],
        fromJS(payload.data.orders[payload.rawData.data.id].attributes)
      );
    }

    case FETCH_ORKESTRO_STATUS_SUCCESS: {
      const newState = state.merge(
        Record({
          isFetching: false,
          isSucceeded: true
        })()
      );
      return newState.setIn(
        [
          "data",
          "orders",
          payload.config.params.id,
          "attributes",
          "orkestroStatus"
        ],
        payload.rawData.data.attributes.status
      );
    }

    case FETCH_ORKESTRO_STATUS_FAIL: {
      const newState = state.merge(
        Record({
          isFetching: false,
          isFailed: true
        })()
      );

      return newState;
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
