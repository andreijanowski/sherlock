import {
  FETCH_PLANS_REQUEST,
  FETCH_PLANS_SUCCESS,
  FETCH_PLANS_FAIL
} from "types/plans";

import { Record, Map, fromJS } from "immutable";

export const initialState = Record({
  data: Map(),
  isFetching: false,
  isFailed: false,
  isSucceeded: false
})();

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_PLANS_REQUEST: {
      return state.merge(
        Record({
          isFetching: true,
          isFailed: false,
          isSucceeded: false
        })()
      );
    }
    case FETCH_PLANS_SUCCESS: {
      return state.merge(
        Record({
          data: fromJS(payload.data.stripePlans),
          isFetching: false,
          isSucceeded: true
        })()
      );
    }
    case FETCH_PLANS_FAIL: {
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
