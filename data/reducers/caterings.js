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
import build from "redux-object";

const initialState = {
  data: [],
  isFetching: false,
  isFailed: false,
  isSucceeded: false,
  editedCatering: null
};

const reducer = (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case FETCH_BUSINESS_CATERINGS_REQUEST: {
      const newState = { ...state };
      newState.isFetching = true;
      newState.isFailed = false;
      newState.isSucceeded = false;
      return newState;
    }
    case FETCH_BUSINESS_CATERINGS_SUCCESS: {
      const newState = { ...state };
      const caterings = build(payload.data, "caterings", null, {
        ignoreLinks: true
      });
      newState.isFetching = false;
      newState.isSucceeded = true;
      if (meta.page === 1) {
        newState.data = caterings;
      } else {
        newState.data = newState.data.concat(caterings);
      }
      return newState;
    }
    case FETCH_BUSINESS_CATERINGS_FAIL: {
      const newState = { ...state };
      newState.isFetching = false;
      newState.isFailed = true;
      if (meta.page === 1) {
        newState.data = null;
      }
      return newState;
    }

    case POST_CATERING_SUCCESS: {
      const newState = { ...state };
      const catering = build(
        payload.data,
        "caterings",
        payload.rawData.data.id,
        {
          ignoreLinks: true
        }
      );
      newState.data = newState.data ? [...newState.data, catering] : [catering];
      return newState;
    }

    case PATCH_CATERING_SUCCESS: {
      const newState = { ...state };
      const catering =
        build(payload.data, "caterings", payload.rawData.data.id, {
          ignoreLinks: true
        }) || [];
      const editedCateringIndex = newState.data.findIndex(
        c => c.id === payload.rawData.data.id
      );
      newState.data[editedCateringIndex] = {
        ...newState.data[editedCateringIndex],
        ...catering
      };
      return newState;
    }

    case DELETE_CATERING_REQUEST: {
      const newState = { ...state };
      newState.data = newState.data.filter(c => c.id !== meta.id);
      return newState;
    }

    case SET_EDIT_CATERING: {
      return { ...state, editedCatering: payload.editedCatering };
    }

    case SEND_CATERING_OFFER_SUCCESS: {
      const { time, id } = meta;
      const newStateData = [...state.data];
      const editedCateringIndex = newStateData.findIndex(c => c.id === id);
      newStateData[editedCateringIndex] = {
        ...newStateData[editedCateringIndex],
        offerSendAt: time
      };
      return { ...state, data: newStateData };
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
