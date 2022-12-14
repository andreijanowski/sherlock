import {
  FETCH_BUSINESS_FAVORITE_SUPPLIERS_REQUEST,
  FETCH_BUSINESS_FAVORITE_SUPPLIERS_SUCCESS,
  FETCH_BUSINESS_FAVORITE_SUPPLIERS_FAIL
} from "types/businesses";
import { fromJS, Map, Record } from "immutable";
import {
  FETCH_BUSINESS_EXCLUSIVE_SUPPLIERS_FAIL,
  FETCH_BUSINESS_EXCLUSIVE_SUPPLIERS_REQUEST,
  FETCH_BUSINESS_EXCLUSIVE_SUPPLIERS_SUCCESS
} from "../types/businesses";

export const initialState = Record({
  data: Map(),
  isFetching: false,
  isFailed: false,
  isSucceeded: false,
  exclusiveSuppliers: Map()
})();

const reducer = (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case FETCH_BUSINESS_FAVORITE_SUPPLIERS_REQUEST: {
      return state.merge(
        Record({
          isFetching: true,
          isFailed: false,
          isSucceeded: false
        })()
      );
    }
    case FETCH_BUSINESS_FAVORITE_SUPPLIERS_SUCCESS: {
      let newState = state.merge(
        Record({
          isFetching: false,
          isSucceeded: true
        })()
      );
      if (meta.page === 1) {
        newState = newState.setIn(
          ["data", "suppliers"],
          fromJS(payload.data.suppliers)
        );
      } else {
        newState = newState.mergeIn(
          ["data", "suppliers"],
          fromJS(payload.data.suppliers)
        );
      }
      return newState;
    }
    case FETCH_BUSINESS_FAVORITE_SUPPLIERS_FAIL: {
      return state.merge(
        Record({
          isFetching: false,
          isFailed: true
        })()
      );
    }
    case FETCH_BUSINESS_EXCLUSIVE_SUPPLIERS_REQUEST: {
      return state.merge(
        Record({
          isFetching: true,
          isFailed: false,
          isSucceeded: false
        })()
      );
    }
    case FETCH_BUSINESS_EXCLUSIVE_SUPPLIERS_SUCCESS: {
      let newState = state.merge(
        Record({
          isFetching: false,
          isSucceeded: true
        })()
      );
      if (meta.page === 1) {
        newState = newState.setIn(
          ["exclusiveSuppliers", "suppliers"],
          fromJS(payload.data.suppliers)
        );
      } else {
        newState = newState.mergeIn(
          ["exclusiveSuppliers", "suppliers"],
          fromJS(payload.data.suppliers)
        );
      }
      return newState;
    }
    case FETCH_BUSINESS_EXCLUSIVE_SUPPLIERS_FAIL: {
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
