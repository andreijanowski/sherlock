/* eslint-disable no-param-reassign */
import { FETCH_AVG_TICKET_SIZE_SUCCESS } from "types/businesses";
import { Record, Map, fromJS } from "immutable";

const initialState = Record({
  data: Map()
})();

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_AVG_TICKET_SIZE_SUCCESS: {
      return state.mergeDeepIn(
        ["data", "dashboard", "avgTicketSize"],
        fromJS(payload.data.dashboard)
      );
    }

    default: {
      return state;
    }
  }
};

export default reducer;
