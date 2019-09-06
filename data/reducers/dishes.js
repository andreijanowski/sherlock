/* eslint-disable no-param-reassign */
import {
  POST_DISH_SUCCESS,
  PATCH_DISH_SUCCESS,
  DELETE_DISH_REQUEST
} from "types/dishes";
import {
  FETCH_BUSINESS_DISHES_REQUEST,
  FETCH_BUSINESS_DISHES_SUCCESS,
  FETCH_BUSINESS_DISHES_FAIL
} from "types/businesses";
import { POST_PICTURE_SUCCESS, DELETE_PICTURE_REQUEST } from "types/pictures";
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
      let newState = state.merge(
        Record({
          isFetching: false,
          isSucceeded: true
        })()
      );
      if (meta.page === 1) {
        newState = newState.setIn(["data"], fromJS(payload.data));
      } else {
        newState = newState.mergeIn(
          ["data", "dishes"],
          fromJS(payload.data.dishes)
        );
        newState = newState.mergeIn(
          ["data", "pictures"],
          fromJS(payload.data.pictures)
        );
      }
      return newState;
    }
    case FETCH_BUSINESS_DISHES_FAIL: {
      let newState = state.merge(
        Record({
          isFetching: false,
          isFailed: true
        })()
      );
      if (meta.page === 1) {
        newState = newState.merge(
          Record({
            data: Map()
          })()
        );
      }
      return newState;
    }

    case POST_DISH_SUCCESS: {
      if (state.getIn(["data"]) && state.getIn(["data"]).size) {
        return state
          .mergeIn(["data", "dishes"], fromJS(payload.data.dishes))
          .mergeIn(["data", "pictures"], fromJS(payload.data.pictures));
      }
      return state.setIn(["data"], fromJS(payload.data));
    }

    case PATCH_DISH_SUCCESS: {
      if (state.getIn(["data"]) && state.getIn(["data"]).size) {
        return state.mergeDeepIn(
          ["data", "dishes"],
          fromJS(payload.data.dishes)
        );
      }
      return state.setIn(["data"], fromJS(payload.data));
    }

    case DELETE_DISH_REQUEST: {
      return state.deleteIn(["data", "dishes", meta.id]);
    }

    case POST_PICTURE_SUCCESS: {
      if (payload.rawData.data.attributes.parentResource === "dish") {
        return state
          .mergeIn(["data", "pictures"], fromJS(payload.data.pictures))
          .setIn(
            ["data", "dishes", meta.id, "relationships", "pictures", "data"],
            fromJS([{ type: "pictures", id: payload.rawData.data.id }])
          );
      }
      return state;
    }

    case DELETE_PICTURE_REQUEST: {
      if (meta.parentResource === "dish") {
        return state
          .deleteIn(["data", "pictures", meta.id])
          .deleteIn([
            "data",
            "dishes",
            meta.resourceId,
            "relationships",
            "pictures",
            "data",
            0
          ]);
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
