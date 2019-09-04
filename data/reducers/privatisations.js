/* eslint-disable no-param-reassign */
import {
  POST_PRIVATISATION_SUCCESS,
  PATCH_PRIVATISATION_SUCCESS,
  DELETE_PRIVATISATION_REQUEST,
  SET_EDIT_PRIVATISATION,
  SEND_PRIVATISATION_OFFER_SUCCESS
} from "types/privatisations";
import {
  FETCH_BUSINESS_PRIVATISATIONS_REQUEST,
  FETCH_BUSINESS_PRIVATISATIONS_SUCCESS,
  FETCH_BUSINESS_PRIVATISATIONS_FAIL
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
    case FETCH_BUSINESS_PRIVATISATIONS_REQUEST: {
      return state.merge(
        Record({
          isFetching: true,
          isFailed: false,
          isSucceeded: false
        })()
      );
    }
    case FETCH_BUSINESS_PRIVATISATIONS_SUCCESS: {
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
    case FETCH_BUSINESS_PRIVATISATIONS_FAIL: {
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

    case POST_PRIVATISATION_SUCCESS: {
      return state.setIn(
        ["data", "privatisations", payload.rawData.data.id],
        fromJS(payload.data.privatisations[payload.rawData.data.id])
      );
    }

    case PATCH_PRIVATISATION_SUCCESS: {
      return state.mergeIn(
        ["data", "privatisations", payload.rawData.data.id, "attributes"],
        fromJS(payload.data.privatisations[payload.rawData.data.id].attributes)
      );
    }

    case DELETE_PRIVATISATION_REQUEST: {
      return state.deleteIn(["data", "privatisations", meta.id]);
    }

    case SET_EDIT_PRIVATISATION: {
      return state.setIn(
        ["editedPrivatisation"],
        fromJS(payload.editedPrivatisation)
      );
    }

    case SEND_PRIVATISATION_OFFER_SUCCESS: {
      const { time, id } = meta;
      return state.setIn(
        ["data", "privatisations", id, "attributes", "offerSendAt"],
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
