/* eslint-disable no-param-reassign */
import {
  FETCH_BUSINESS_MEMBERS_REQUEST,
  FETCH_BUSINESS_MEMBERS_SUCCESS,
  FETCH_BUSINESS_MEMBERS_FAIL
} from "types/businesses";
import { LOGOUT } from "types/auth";
import { Record, Map, fromJS } from "immutable";

const initialState = Record({
  data: Map(),
  isFetching: false,
  isFailed: false,
  isSucceeded: false
})();

const reducer = (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case FETCH_BUSINESS_MEMBERS_REQUEST: {
      return state.merge(
        Record({
          isFetching: true,
          isFailed: false,
          isSucceeded: false
        })()
      );
    }
    case FETCH_BUSINESS_MEMBERS_SUCCESS: {
      let newState = state.merge(
        Record({
          isFetching: false,
          isSucceeded: true
        })()
      );
      if (meta.page === 1) {
        newState = newState.set("data", fromJS(payload.data));
      } else {
        newState = newState.mergeIn(
          ["data", "members"],
          fromJS(payload.data.members)
        );
      }
      return newState;
    }
    case FETCH_BUSINESS_MEMBERS_FAIL: {
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

    case LOGOUT: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};

export default reducer;
