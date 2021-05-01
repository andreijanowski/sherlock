import {
  FETCH_EXTERNAL_SERVICES_REQUEST,
  FETCH_EXTERNAL_SERVICES_FAIL,
  FETCH_EXTERNAL_SERVICES_SUCCESS,
  PATCH_EXTERNAL_SERVICE_LINK_SUCCESS,
  DELETE_EXTERNAL_SERVICE_LINK_SUCCESS,
  CONNECT_EXTERNAL_SERVICES_SUCCESS
} from "types/externalServices";

import {
  FETCH_BUSINESS_SERVICE_LINKS_REQUEST,
  FETCH_BUSINESS_SERVICE_LINKS_FAIL,
  FETCH_BUSINESS_SERVICE_LINKS_SUCCESS
} from "types/businesses";

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
    case FETCH_BUSINESS_SERVICE_LINKS_REQUEST:
    case FETCH_EXTERNAL_SERVICES_REQUEST:
      return state.merge(startFetchRecord);
    case FETCH_BUSINESS_SERVICE_LINKS_FAIL:
    case FETCH_EXTERNAL_SERVICES_FAIL:
      return state.merge(failedFetchRecord);
    case FETCH_EXTERNAL_SERVICES_SUCCESS:
      return state
        .merge(succeededFetchRecord)
        .setIn(["data", "services"], fromJS(payload.rawData.data));
    case FETCH_BUSINESS_SERVICE_LINKS_SUCCESS:
      return state
        .merge(succeededFetchRecord)
        .setIn(["data", "links"], fromJS(payload.data.externalServiceLinks));
    case PATCH_EXTERNAL_SERVICE_LINK_SUCCESS:
      return state.mergeDeepIn(
        ["data", "links"],
        fromJS(payload.data.externalServiceLinks)
      );
    case CONNECT_EXTERNAL_SERVICES_SUCCESS:
      return state.mergeDeepIn(
        ["data", "links"],
        fromJS(payload.data.externalServiceLinks)
      );
    case DELETE_EXTERNAL_SERVICE_LINK_SUCCESS:
      return state.removeIn(["data", "links", meta.id]);
    default:
      return state;
  }
};

export default reducer;
