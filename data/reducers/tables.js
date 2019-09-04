/* eslint-disable no-param-reassign */
import {
  POST_TABLE_SUCCESS,
  PATCH_TABLE_SUCCESS,
  DELETE_TABLE_REQUEST
} from "types/tables";
import {
  FETCH_BUSINESS_TABLES_REQUEST,
  FETCH_BUSINESS_TABLES_SUCCESS,
  FETCH_BUSINESS_TABLES_FAIL
} from "types/businesses";
import { LOGOUT } from "types/auth";

import { Record, Map, fromJS } from "immutable";

export const initialState = Record({
  data: Map(),
  isFetching: false,
  isFailed: false,
  isSucceeded: false
})();

const reducer = (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case FETCH_BUSINESS_TABLES_REQUEST: {
      return state.merge(
        Record({
          isFetching: true,
          isFailed: false,
          isSucceeded: false
        })()
      );
    }
    case FETCH_BUSINESS_TABLES_SUCCESS: {
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
          ["data", "tables"],
          fromJS(payload.data.tables)
        );
      }
      return newState;
    }
    case FETCH_BUSINESS_TABLES_FAIL: {
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

    case POST_TABLE_SUCCESS: {
      if (state.getIn(["data"]) && state.getIn(["data"]).size) {
        return state.mergeIn(["data", "tables"], fromJS(payload.data.tables));
      }
      return state.setIn(["data"], fromJS(payload.data));
    }

    case PATCH_TABLE_SUCCESS: {
      if (state.getIn(["data"]) && state.getIn(["data"]).size) {
        return state.mergeDeepIn(
          ["data", "tables"],
          fromJS(payload.data.tables)
        );
      }
      return state.setIn(["data"], fromJS(payload.data));
    }

    case DELETE_TABLE_REQUEST: {
      return state.deleteIn(["data", "tables", meta.id]);
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
