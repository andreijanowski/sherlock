/* eslint-disable no-param-reassign */
import { POST_DISH_SUCCESS, DELETE_DISH_REQUEST } from "types/dishes";
import {
  FETCH_BUSINESS_DISHES_REQUEST,
  FETCH_BUSINESS_DISHES_SUCCESS,
  FETCH_BUSINESS_DISHES_FAIL
} from "types/businesses";
import { POST_PICTURE_SUCCESS } from "types/pictures";
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
    case FETCH_BUSINESS_DISHES_REQUEST: {
      return state.merge(
        Record({
          isFetching: true,
          isFailed: false,
          isSucceeded: false
        })()
      );
    }
    case FETCH_BUSINESS_DISHES_SUCCESS: {
      state = state.merge(
        Record({
          isFetching: false,
          isSucceeded: true
        })()
      );
      if (meta.page === 1) {
        state = state.setIn(["data"], fromJS(payload.data));
      } else {
        state = state.mergeIn(["data", "dishes"], fromJS(payload.data.dishes));
        state = state.mergeIn(
          ["data", "pictures"],
          fromJS(payload.data.pictures)
        );
      }
      return state;
    }
    case FETCH_BUSINESS_DISHES_FAIL: {
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

    case POST_DISH_SUCCESS: {
      if (state.getIn(["data"]) && state.getIn(["data"]).size) {
        state = state.mergeIn(["data", "dishes"], fromJS(payload.data.dishes));
        state = state.mergeIn(
          ["data", "pictures"],
          fromJS(payload.data.pictures)
        );
      } else {
        state = state.setIn(["data"], fromJS(payload.data));
      }
      return state;
    }

    case DELETE_DISH_REQUEST: {
      return state.deleteIn(["data", "dishes", meta.id]);
    }

    case POST_PICTURE_SUCCESS: {
      if (payload.rawData.data.attributes.parentResource === "dish") {
        state = state.mergeIn(
          ["data", "pictures"],
          fromJS(payload.data.pictures)
        );
        state = state.setIn(
          ["data", "dishes", meta.id, "relationships", "pictures", "data"],
          fromJS([{ type: "pictures", id: payload.rawData.data.id }])
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
