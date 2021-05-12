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

const SERVICES_PATH = ["data", "services"];
const LINKS_PATH = ["data", "links"];

const reducer = (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case FETCH_BUSINESS_SERVICE_LINKS_REQUEST:
      return state.merge(startFetchRecord).removeIn(LINKS_PATH);
    case FETCH_EXTERNAL_SERVICES_REQUEST:
      return state.merge(startFetchRecord);
    case FETCH_BUSINESS_SERVICE_LINKS_FAIL:
    case FETCH_EXTERNAL_SERVICES_FAIL:
      return state.merge(failedFetchRecord);
    case FETCH_EXTERNAL_SERVICES_SUCCESS:
      return state
        .merge(succeededFetchRecord)
        .setIn(SERVICES_PATH, fromJS(payload.rawData.data));
    case FETCH_BUSINESS_SERVICE_LINKS_SUCCESS:
      return state
        .merge(succeededFetchRecord)
        .setIn(LINKS_PATH, fromJS(payload.data.externalServiceLinks));
    case PATCH_EXTERNAL_SERVICE_LINK_SUCCESS:
      return state.mergeDeepIn(
        LINKS_PATH,
        fromJS(payload.data.externalServiceLinks)
      );
    case CONNECT_EXTERNAL_SERVICES_SUCCESS: {
      const links = fromJS(payload.data.externalServiceLinks);
      const hasLinksState = state.getIn(LINKS_PATH);

      return hasLinksState
        ? state.mergeDeepIn(LINKS_PATH, links)
        : state.setIn(LINKS_PATH, links);
    }
    case DELETE_EXTERNAL_SERVICE_LINK_SUCCESS:
      return state.removeIn(LINKS_PATH.concat([meta.id]));
    default:
      return state;
  }
};

export default reducer;
