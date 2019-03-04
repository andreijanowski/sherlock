import { POST_DISH_SUCCESS, DELETE_DISH_REQUEST } from "types/dishes";
import {
  FETCH_BUSINESS_DISHES_REQUEST,
  FETCH_BUSINESS_DISHES_SUCCESS,
  FETCH_BUSINESS_DISHES_FAIL
} from "types/businesses";
import { POST_PICTURE_SUCCESS } from "types/pictures";
import build from "redux-object";

const initialState = {
  data: [],
  isFetching: false,
  isFailed: false,
  isSucceeded: false
};

const reducer = (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case FETCH_BUSINESS_DISHES_REQUEST: {
      const newState = { ...state };
      newState.isFetching = true;
      newState.isFailed = false;
      newState.isSucceeded = false;
      return newState;
    }
    case FETCH_BUSINESS_DISHES_SUCCESS: {
      const newState = { ...state };
      const dishes = build(payload.data, "dishes", null, {
        ignoreLinks: true
      });
      newState.isFetching = false;
      newState.isSucceeded = true;
      newState.data = dishes;
      return newState;
    }
    case FETCH_BUSINESS_DISHES_FAIL: {
      const newState = { ...state };
      newState.isFetching = false;
      newState.isFailed = true;
      return newState;
    }

    case POST_DISH_SUCCESS: {
      const newState = { ...state };
      const dish = build(payload.data, "dishes", payload.rawData.data.id, {
        ignoreLinks: true
      });
      newState.data = [...newState.data, dish];
      return newState;
    }

    case DELETE_DISH_REQUEST: {
      const newState = { ...state };
      newState.data = newState.data.filter(m => m.id !== meta.id);
      return newState;
    }

    case POST_PICTURE_SUCCESS: {
      if (payload.rawData.data.attributes.parentResource === "dish") {
        const newState = { ...state };
        const picture = build(
          payload.data,
          "pictures",
          payload.rawData.data.id,
          {
            ignoreLinks: true
          }
        );
        const index = newState.data.findIndex(i => i.id === meta.id);
        newState.data[index] = {
          ...newState.data[index],
          pictures: [picture]
        };
        return newState;
      }
      return state;
    }

    default: {
      return state;
    }
  }
};

export default reducer;
