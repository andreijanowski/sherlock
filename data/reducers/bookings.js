/* eslint-disable no-param-reassign */
import { FETCH_BOOKING_SUCCESS } from "types/bookings";
import { LOGOUT } from "types/auth";
import { Record, Map, fromJS } from "immutable";

const initialState = Record({
  data: Map()
})();

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_BOOKING_SUCCESS: {
      return state.mergeDeepIn(
        ["data", "bookings"],
        fromJS(payload.data.bookings)
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
