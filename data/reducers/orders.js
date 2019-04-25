import { LOGOUT } from "types/auth";
import {
  FETCH_BUSINESS_ORDERS_REQUEST,
  FETCH_BUSINESS_ORDERS_SUCCESS,
  FETCH_BUSINESS_ORDERS_FAIL
} from "types/businesses";
import {
  FETCH_ORDER_SUCCESS,
  PATCH_ORDER_SUCCESS,
  PATCH_ORDER_REJECT_SUCCESS
} from "types/orders";
import build from "redux-object";

const initialState = {
  data: [],
  isFetching: false,
  isFailed: false,
  isSucceeded: false
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_BUSINESS_ORDERS_REQUEST: {
      const newState = { ...state };
      newState.isFetching = true;
      newState.isFailed = false;
      newState.isSucceeded = false;
      return newState;
    }
    case FETCH_BUSINESS_ORDERS_SUCCESS: {
      const newState = { ...state };
      const orders = build(payload.data, "orders", null, {
        ignoreLinks: true
      });
      newState.isFetching = false;
      newState.isSucceeded = true;
      newState.data = orders;
      return newState;
    }
    case FETCH_BUSINESS_ORDERS_FAIL: {
      const newState = { ...state };
      newState.isFetching = false;
      newState.isFailed = true;
      return newState;
    }
    case FETCH_ORDER_SUCCESS: {
      const newState = { ...state };
      const order = build(payload.data, "orders", payload.rawData.data.id, {
        ignoreLinks: true
      });
      if (newState.data) {
        const index = newState.data.findIndex(
          i => i.id === payload.rawData.data.id
        );
        const data = [...newState.data];
        if (index !== -1) {
          data[index] = {
            ...data[index],
            ...order
          };
        } else {
          data.push(order);
        }
        newState.data = [...data];
      } else {
        newState.data = [order];
      }
      return newState;
    }

    case PATCH_ORDER_SUCCESS:
    case PATCH_ORDER_REJECT_SUCCESS: {
      const newState = { ...state };
      const order = build(payload.data, "orders", payload.rawData.data.id, {
        ignoreLinks: true
      });
      const index = newState.data.findIndex(
        i => i.id === payload.rawData.data.id
      );
      const data = [...newState.data];
      if (index !== -1) {
        data[index] = {
          ...data[index],
          ...order,
          addresses: data[index].addresses,
          business: data[index].business,
          elements: data[index].elements
        };
      } else {
        data.push(order);
      }
      newState.data = [...data];
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
