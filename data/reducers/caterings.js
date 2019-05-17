/* eslint-disable no-param-reassign */
import {
  POST_CATERING_SUCCESS,
  PATCH_CATERING_SUCCESS,
  DELETE_CATERING_REQUEST,
  SET_EDIT_CATERING,
  SEND_CATERING_OFFER_SUCCESS
} from "types/caterings";
import {
  FETCH_BUSINESS_CATERINGS_REQUEST,
  FETCH_BUSINESS_CATERINGS_SUCCESS,
  FETCH_BUSINESS_CATERINGS_FAIL
} from "types/businesses";
import { LOGOUT } from "types/auth";
import { Record, fromJS } from "immutable";

const initialState = Record({
  data: [],
  isFetching: false,
  isFailed: false,
  isSucceeded: false,
  editedCatering: null
})();

const reducer = (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case FETCH_BUSINESS_CATERINGS_REQUEST: {
      return state.merge(
        Record({
          isFetching: true,
          isFailed: false,
          isSucceeded: false
        })()
      );
    }
    case FETCH_BUSINESS_CATERINGS_SUCCESS: {
      state = state.merge(
        Record({
          isFetching: false,
          isSucceeded: true
        })()
      );
      if (meta.page === 1) {
        state = state.setIn(["data"], fromJS(payload.data));
      } else {
        state = state.mergeIn(["data"], fromJS(payload.data));
      }
      return state;
    }
    case FETCH_BUSINESS_CATERINGS_FAIL: {
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

    case POST_CATERING_SUCCESS: {
      return state.setIn(
        ["data", "caterings", payload.rawData.data.id],
        fromJS(payload.data.caterings[payload.rawData.data.id])
      );
    }

    case PATCH_CATERING_SUCCESS: {
      return state.mergeIn(
        ["data", "caterings", payload.rawData.data.id, "attributes"],
        fromJS(payload.data.caterings[payload.rawData.data.id].attributes)
      );
    }

    case DELETE_CATERING_REQUEST: {
      return state.deleteIn(["data", "caterings", meta.id]);
    }

    case SET_EDIT_CATERING: {
      return state.setIn(["editedCatering"], fromJS(payload.editedCatering));
    }

    case SEND_CATERING_OFFER_SUCCESS: {
      const { time, id } = meta;
      return state.setIn(
        ["data", "caterings", id, "attributes", "offerSendAt"],
        time
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
