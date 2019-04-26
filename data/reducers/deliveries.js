import {
  POST_DELIVERY_SUCCESS,
  DELETE_DELIVERY_REQUEST
} from "types/deliveries";
import {
  FETCH_BUSINESS_DELIVERIES_REQUEST,
  FETCH_BUSINESS_DELIVERIES_SUCCESS,
  FETCH_BUSINESS_DELIVERIES_FAIL
} from "types/businesses";
import { LOGOUT } from "types/auth";
import build from "redux-object";

const initialState = {
  data: [],
  isFetching: false,
  isFailed: false,
  isSucceeded: false
};

const reducer = (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case FETCH_BUSINESS_DELIVERIES_REQUEST: {
      const newState = { ...state };
      newState.isFetching = true;
      newState.isFailed = false;
      newState.isSucceeded = false;
      return newState;
    }
    case FETCH_BUSINESS_DELIVERIES_SUCCESS: {
      const newState = { ...state };
      const deliveries = build(payload.data, "deliveries", null, {
        ignoreLinks: true
      });
      newState.isFetching = false;
      newState.isSucceeded = true;
      if (meta.page === 1) {
        newState.data = deliveries;
      } else {
        newState.data = newState.data.concat(deliveries);
      }
      return newState;
    }
    case FETCH_BUSINESS_DELIVERIES_FAIL: {
      const newState = { ...state };
      newState.isFetching = false;
      newState.isFailed = true;
      return newState;
    }

    case POST_DELIVERY_SUCCESS: {
      const newState = { ...state };
      const delivery = build(
        payload.data,
        "deliveries",
        payload.rawData.data.id,
        {
          ignoreLinks: true
        }
      );
      newState.data = newState.data ? [...newState.data, delivery] : [delivery];
      return newState;
    }

    case DELETE_DELIVERY_REQUEST: {
      const newState = { ...state };
      newState.data = newState.data.filter(m => m.id !== meta.id);
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
