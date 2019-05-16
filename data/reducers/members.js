/* eslint-disable no-param-reassign */
import {
  FETCH_BUSINESS_MEMBERS_REQUEST,
  FETCH_BUSINESS_MEMBERS_SUCCESS,
  FETCH_BUSINESS_MEMBERS_FAIL
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
      state = state.merge(
        Record({
          isFetching: false,
          isSucceeded: true
        })()
      );
      if (meta.page === 1) {
        state = state.set("data", fromJS(payload.data.members));
      } else {
        state = state.mergeIn(["data"], fromJS(payload.data.members));
      }
      return state;
    }
    case FETCH_BUSINESS_MEMBERS_FAIL: {
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

    case LOGOUT: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};

export default reducer;
