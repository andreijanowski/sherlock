import {
  POST_SUPPLIER_ORDER_FAIL,
  POST_SUPPLIER_ORDER_REQUEST,
  POST_SUPPLIER_ORDER_SUCCESS
} from "types/supplierOrders";

import {
  FETCH_BUSINESS_SUPPLIER_ORDERS_HISTORY_REQUEST,
  FETCH_BUSINESS_SUPPLIER_ORDERS_HISTORY_SUCCESS,
  FETCH_BUSINESS_SUPPLIER_ORDERS_HISTORY_FAIL
} from "types/businesses";

import { fromJS, Map, Record } from "immutable";

export const initialState = Record({
  data: Map(),
  isFetching: false,
  isFailed: false,
  isSucceeded: false
})();

const reducer = (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case POST_SUPPLIER_ORDER_REQUEST: {
      return state.merge(
        Record({
          isFetching: true,
          isFailed: false,
          isSucceeded: false
        })()
      );
    }
    case POST_SUPPLIER_ORDER_SUCCESS: {
      return state.merge(
        Record({
          isFetching: false,
          isSucceeded: true
        })()
      );
    }
    case POST_SUPPLIER_ORDER_FAIL: {
      return state.merge(
        Record({
          isFetching: false,
          isFailed: true
        })()
      );
    }
    case FETCH_BUSINESS_SUPPLIER_ORDERS_HISTORY_REQUEST: {
      return state.merge(
        Record({
          isFetching: true,
          isFailed: false,
          isSucceeded: false
        })()
      );
    }
    case FETCH_BUSINESS_SUPPLIER_ORDERS_HISTORY_SUCCESS: {
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
          ["data", "supplierOrders"],
          fromJS(payload.data.supplierOrders)
        );
        newState = newState.mergeIn(
          ["data", "supplierElements"],
          fromJS(payload.data.supplierElements)
        );
        newState = newState.mergeIn(
          ["data", "supplierProducts"],
          fromJS(payload.data.supplierProducts)
        );
      }
      return newState;
    }
    case FETCH_BUSINESS_SUPPLIER_ORDERS_HISTORY_FAIL: {
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
    default: {
      return state;
    }
  }
};

export default reducer;
