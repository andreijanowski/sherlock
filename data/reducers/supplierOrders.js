import {
  POST_SUPPLIER_ORDER_FAIL,
  POST_SUPPLIER_ORDER_REQUEST,
  POST_SUPPLIER_ORDER_SUCCESS
} from "types/supplierOrders";
import { Record } from "immutable";

export const initialState = Record({
  isFetching: false,
  isFailed: false,
  isSucceeded: false
})();

const reducer = (state = initialState, { type }) => {
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
    default: {
      return state;
    }
  }
};

export default reducer;
