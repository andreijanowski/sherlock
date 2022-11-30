import {
  POST_SUPPLIER_ELEMENT_REQUEST,
  POST_SUPPLIER_ELEMENT_SUCCESS,
  POST_SUPPLIER_ELEMENT_FAIL
} from "types/supplierElements";
import { Record } from "immutable";

export const initialState = Record({
  isFetching: false,
  isFailed: false,
  isSucceeded: false
})();

const reducer = (state = initialState, { type }) => {
  switch (type) {
    case POST_SUPPLIER_ELEMENT_REQUEST: {
      return state.merge(
        Record({
          isFetching: true,
          isFailed: false,
          isSucceeded: false
        })()
      );
    }
    case POST_SUPPLIER_ELEMENT_SUCCESS: {
      return state.merge(
        Record({
          isFetching: false,
          isSucceeded: true
        })()
      );
    }
    case POST_SUPPLIER_ELEMENT_FAIL: {
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
