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

import {
  FETCH_SUPPLIER_PRODUCT_CATEGORIES_REQUEST,
  FETCH_SUPPLIER_PRODUCT_CATEGORIES_SUCCESS,
  FETCH_SUPPLIER_PRODUCT_CATEGORIES_FAIL
} from "types/suppliers";

export const initialState = Record({
  data: Map(),
  isFetching: false,
  isFailed: false,
  isSucceeded: false,
  isExclusiveFetching: false,
  isExclusiveLoaded: false,
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
          isExclusiveFetching: false,
          isExclusiveFailed: true
        })()
      );
    }
    case FETCH_BUSINESS_EXCLUSIVE_SUPPLIERS_REQUEST: {
      return state.merge(
        Record({
          isExclusiveFetching: true,
          isExclusiveLoaded: false
        })()
      );
    }
    case FETCH_BUSINESS_EXCLUSIVE_SUPPLIERS_SUCCESS: {
      let newState = state.merge(
        Record({
          isExclusiveFetching: false,
          isExclusiveLoaded: true
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
          isExclusiveFetching: false,
          isExclusiveLoaded: true
        })()
      );
    }
    case FETCH_SUPPLIER_PRODUCT_CATEGORIES_REQUEST: {
      const newState = state.merge(
        Record({
          isFetching: true,
          isFailed: false,
          isSucceeded: false
        })()
      );
      return meta.page === 1
        ? newState.merge(
            Record({
              data: Map()
            })()
          )
        : newState;
    }
    case FETCH_SUPPLIER_PRODUCT_CATEGORIES_SUCCESS: {
      let newState = state.merge(
        Record({
          isFetching: false,
          isSucceeded: true
        })()
      );
      if (meta.page === 1) {
        newState = newState.setIn(
          ["suppliers", "suppliers"],
          fromJS(payload.data.suppliers)
        );
      } else {
        newState = newState.setIn(
          ["suppliers", "suppliers"],
          fromJS(payload.data.suppliers)
        );
      }
      return newState;
    }

    case FETCH_SUPPLIER_PRODUCT_CATEGORIES_FAIL: {
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
