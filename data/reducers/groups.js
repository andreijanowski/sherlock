import {
  FETCH_GROUPS_REQUEST,
  FETCH_GROUPS_SUCCESS,
  FETCH_GROUPS_FAIL
} from "types/groups";
import { LOGOUT } from "types/auth";
import { Record, fromJS } from "immutable";

const initialState = Record({
  data: null,
  isFetching: false,
  isFailed: false,
  isSucceeded: false
})();

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_GROUPS_REQUEST: {
      return state.merge(
        Record({
          isFetching: true,
          isFailed: false,
          isSucceeded: false
        })()
      );
    }
    case FETCH_GROUPS_SUCCESS: {
      return state.merge(
        Record({
          isFetching: false,
          isSucceeded: true,
          data: fromJS(payload.data)
        })()
      );
    }
    case FETCH_GROUPS_FAIL: {
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
