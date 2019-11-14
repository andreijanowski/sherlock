/* eslint-disable no-param-reassign */
import {
  FETCH_WIDGET_SUCCESS,
  POST_WIDGET_SUCCESS,
  PATCH_WIDGET_SUCCESS,
  DELETE_WIDGET_REQUEST
} from "types/widgets";
import {
  FETCH_BUSINESS_WIDGETS_REQUEST,
  FETCH_BUSINESS_WIDGETS_SUCCESS,
  FETCH_BUSINESS_WIDGETS_FAIL
} from "types/businesses";
import { LOGOUT } from "types/auth";
import { Record, fromJS } from "immutable";

export const initialState = Record({
  data: [],
  isFetching: false,
  isFailed: false,
  isSucceeded: false,
  editedPrivatisation: null
})();

const reducer = (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case FETCH_BUSINESS_WIDGETS_REQUEST: {
      return state.merge(
        Record({
          isFetching: true,
          isFailed: false,
          isSucceeded: false
        })()
      );
    }
    case FETCH_BUSINESS_WIDGETS_SUCCESS: {
      let newState = state.merge(
        Record({
          isFetching: false,
          isSucceeded: true
        })()
      );
      if (meta.page === 1) {
        newState = newState.setIn(["data"], fromJS(payload.data));
      } else {
        newState = newState.mergeIn(["data"], fromJS(payload.data));
      }
      return newState;
    }
    case FETCH_BUSINESS_WIDGETS_FAIL: {
      let newState = state.merge(
        Record({
          isFetching: false,
          isFailed: true
        })()
      );
      if (meta.page === 1) {
        newState = newState.merge(
          Record({
            data: null
          })()
        );
      }
      return newState;
    }

    case FETCH_WIDGET_SUCCESS: {
      if (state.get("data") && state.get("data").size) {
        return state.mergeIn(["data", "widgets"], fromJS(payload.data.widgets));
      }
      return state.setIn(["data"], fromJS(payload.data));
    }

    case POST_WIDGET_SUCCESS: {
      return state.setIn(
        ["data", "widgets", payload.rawData.data.id],
        fromJS(payload.data.widgets[payload.rawData.data.id])
      );
    }

    case PATCH_WIDGET_SUCCESS: {
      return state.mergeIn(
        ["data", "widgets", payload.rawData.data.id, "attributes"],
        fromJS(payload.data.widgets[payload.rawData.data.id].attributes)
      );
    }

    case DELETE_WIDGET_REQUEST: {
      return state.deleteIn(["data", "widgets", meta.id]);
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
