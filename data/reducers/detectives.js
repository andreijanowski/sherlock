import {
  FETCH_TOP_DETECTIVE_REQUEST,
  FETCH_TOP_DETECTIVE_SUCCESS,
  FETCH_TOP_DETECTIVE_FAIL,
  FETCH_DETECTIVES_SUCCESS,
  FETCH_DETECTIVES_REQUEST,
  FETCH_DETECTIVES_FAIL
} from "types/detectives";

import { Record, Map, fromJS } from "immutable";

export const initialState = Record({
  data: Map(),
  isFetching: false,
  isFailed: false,
  isSucceeded: false
})();

const startFetchRecord = Record({
  isFetching: true,
  isFailed: false,
  isSucceeded: false
})();

const failedFetchRecord = Record({
  isFetching: false,
  isFailed: true
})();

const succeededFetchRecord = Record({
  isFetching: false,
  isSucceeded: true
})();

const reducer = (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case FETCH_TOP_DETECTIVE_REQUEST:
    case FETCH_DETECTIVES_REQUEST:
      return state.merge(startFetchRecord);
    case FETCH_TOP_DETECTIVE_FAIL:
    case FETCH_DETECTIVES_FAIL:
      return state.merge(failedFetchRecord);

    case FETCH_TOP_DETECTIVE_SUCCESS:
      return state
        .merge(succeededFetchRecord)
        .setIn(
          ["data", "topDetective"],
          fromJS(payload.rawData.data && payload.rawData.data[0])
        );

    case FETCH_DETECTIVES_SUCCESS:
      return state
        .merge(succeededFetchRecord)
        .setIn(
          meta.city ? ["data", "byCity", meta.city] : ["data", "all"],
          fromJS(payload.rawData.data)
        );

    default:
      return state;
  }
};

export default reducer;
