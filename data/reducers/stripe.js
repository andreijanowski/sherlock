import {
  FETCH_STRIPE_PLANS_REQUEST,
  FETCH_STRIPE_PLANS_SUCCESS,
  FETCH_STRIPE_PLANS_FAIL
} from "types/stripe";
import build from "redux-object";
import { LOGOUT } from "types/auth";

const initialState = {
  data: null,
  isFetching: false,
  isFailed: false,
  isSucceeded: false
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_STRIPE_PLANS_REQUEST: {
      const newState = { ...state };
      newState.data = null;
      newState.isFetching = true;
      newState.isFailed = false;
      newState.isSucceeded = false;
      return newState;
    }
    case FETCH_STRIPE_PLANS_SUCCESS: {
      const newState = { ...state };
      const stripePlans =
        build(payload.data, "stripePlans", null, {
          ignoreLinks: true
        }) || [];
      newState.isFetching = false;
      newState.isSucceeded = true;
      newState.data = stripePlans;
      return newState;
    }
    case FETCH_STRIPE_PLANS_FAIL: {
      const newState = { ...state };
      newState.isFetching = false;
      newState.isFailed = true;
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
