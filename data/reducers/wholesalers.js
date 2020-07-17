import {
  FETCH_WHOLESALERS_REQUEST,
  FETCH_WHOLESALERS_SUCCESS,
  FETCH_WHOLESALERS_FAIL
} from "types/wholesalers";
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
    case FETCH_WHOLESALERS_REQUEST: {
      return state.merge(
        Record({
          isFetching: true,
          isFailed: false,
          isSucceeded: false
        })()
      );
    }
    case FETCH_WHOLESALERS_SUCCESS: {
      let newState = state.merge(
        Record({
          isFetching: false,
          isSucceeded: true
        })()
      );
      if (meta.page === 1) {
        newState = newState.setIn(
          ["data", "wholesalers"],
          fromJS(payload.data)
        );
      } else {
        newState = newState.mergeDeepIn(
          ["data", "wholesalers"],
          fromJS(payload.data)
        );
      }
      return newState;
    }
    case FETCH_WHOLESALERS_FAIL: {
      return state.merge(
        Record({
          isFetching: false,
          isFailed: true
        })()
      );
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
