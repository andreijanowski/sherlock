import { fromJS, Map, Record } from "immutable";
import {
  FETCH_INTELLIGENCE_NOTIFICATIONS_REQUEST,
  FETCH_INTELLIGENCE_NOTIFICATIONS_SUCCESS,
  FETCH_INTELLIGENCE_NOTIFICATIONS_FAIL
} from "types/intelligence";

export const initialState = Record({
  data: Map(),
  totalCount: 0,
  isFetching: false,
  isFailed: false,
  isSucceeded: false
})();

const reducer = (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case FETCH_INTELLIGENCE_NOTIFICATIONS_REQUEST: {
      const newState = state.merge(
        Record({
          isFetching: true,
          isFailed: false,
          isSucceeded: false
        })()
      );
      return meta.page === 1
        ? newState.merge(
            Record({
              data: Map(),
              totalCount: 0
            })()
          )
        : newState;
    }
    case FETCH_INTELLIGENCE_NOTIFICATIONS_SUCCESS: {
      let newState = state.merge(
        Record({
          isFetching: false,
          isSucceeded: true
        })()
      );
      if (meta.page === 1) {
        newState = newState
          .set("data", fromJS(payload.rawData.data))
          .set("totalCount", payload.rawData.meta.totalCount);
      } else {
        newState = newState.set(["data"], fromJS(payload.rawData.data));
      }
      return newState;
    }

    case FETCH_INTELLIGENCE_NOTIFICATIONS_FAIL: {
      return state.merge(
        Record({
          isFetching: false,
          isFailed: true
        })()
      );
    }

    default: {
      return state;
    }
  }
};

export default reducer;
