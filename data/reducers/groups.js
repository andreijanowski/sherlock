import {
  FETCH_GROUPS_REQUEST,
  FETCH_GROUPS_SUCCESS,
  FETCH_GROUPS_FAIL
} from "types/groups";
import build from "redux-object";
import { LOGOUT } from "types/auth";

const initialState = {
  groups: {
    data: null,
    isFetching: false,
    isFailed: false,
    isSucceeded: false
  }
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_GROUPS_REQUEST: {
      const newState = { ...state };
      newState.groups.isFetching = true;
      newState.groups.isFailed = false;
      newState.groups.isSucceeded = false;
      return newState;
    }
    case FETCH_GROUPS_SUCCESS: {
      const newState = { ...state };
      const groups = build(payload.data, "groups", null, {
        ignoreLinks: true
      });
      newState.groups.isFetching = false;
      newState.groups.isSucceeded = true;
      newState.groups.data = groups;
      return newState;
    }
    case FETCH_GROUPS_FAIL: {
      const newState = { ...state };
      newState.groups.isFetching = false;
      newState.groups.isFailed = true;
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
