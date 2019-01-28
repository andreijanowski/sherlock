// import { APP_START, SAGA_START } from "types/members";
import {
  FETCH_BUISNESS_MEMBERS_REQUEST,
  FETCH_BUISNESS_MEMBERS_SUCCESS,
  FETCH_BUISNESS_MEMBERS_FAIL
} from "types/businesses";
import build from "redux-object";

const initialState = {
  data: null,
  isFetching: false,
  isFailed: false,
  isSucceeded: false
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_BUISNESS_MEMBERS_REQUEST: {
      const newState = state;
      newState.isFetching = true;
      newState.isFailed = false;
      newState.isSucceeded = false;
      return { ...newState };
    }
    case FETCH_BUISNESS_MEMBERS_SUCCESS: {
      const newState = state;
      const members = build(payload.data, "members", null, {
        ignoreLinks: true
      });
      newState.isFetching = false;
      newState.isSucceeded = true;
      newState.data = members;
      return { ...newState };
    }
    case FETCH_BUISNESS_MEMBERS_FAIL: {
      const newState = state;
      newState.isFetching = false;
      newState.isFailed = true;
      return { ...newState };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
