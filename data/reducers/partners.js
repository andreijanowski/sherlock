import {
  FETCH_PARTNERS_REQUEST,
  FETCH_PARTNERS_SUCCESS,
  FETCH_PARTNERS_FAIL,
  PARTNERS_PREFERRED_ADD_SUCCESS,
  PARTNERS_PREFERRED_DELETE_SUCCESS,
  CONNECT_PARTNER_SUCCESS,
  DISCONNECT_PARTNER_SUCCESS
} from "types/partners";
import { LOGOUT } from "types/auth";
import { Record, Map, fromJS } from "immutable";

export const initialState = Record({
  data: Map(),
  isFetching: false,
  isFailed: false,
  isSucceeded: false
})();

const reducer = (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case FETCH_PARTNERS_REQUEST: {
      return state.merge(
        Record({
          isFetching: true,
          isFailed: false,
          isSucceeded: false
        })()
      );
    }
    case FETCH_PARTNERS_SUCCESS: {
      let newState = state.merge(
        Record({
          isFetching: false,
          isSucceeded: true,
          previousConfig: meta.config,
          hasMore: meta.config.page < payload.rawData.meta.totalPages
        })()
      );

      const preparedData = fromJS(payload.rawData.data);

      if (meta.merge) {
        newState = newState.mergeIn(["data"], preparedData);
      } else {
        newState = newState.set("data", preparedData);
      }

      return newState;
    }
    case FETCH_PARTNERS_FAIL: {
      return state.merge(
        Record({
          isFetching: false,
          isFailed: true
        })()
      );
    }

    case PARTNERS_PREFERRED_ADD_SUCCESS: {
      return state.set(
        "data",
        state.get("data").map(partner => {
          if (partner.get("id") === meta.partnerId) {
            return partner.setIn(["attributes", "preferred"], true);
          }
          return partner;
        })
      );
    }

    case PARTNERS_PREFERRED_DELETE_SUCCESS: {
      return state.set(
        "data",
        state.get("data").map(partner => {
          if (partner.get("id") === meta.partnerId) {
            return partner.setIn(["attributes", "preferred"], false);
          }
          return partner;
        })
      );
    }

    case CONNECT_PARTNER_SUCCESS:
      return state.set(
        "data",
        state.get("data").map(partner => {
          if (partner.get("id") === meta.partnerId) {
            return partner.setIn(
              ["attributes", "partnerIntegrationRequested"],
              type === CONNECT_PARTNER_SUCCESS
            );
          }
          return partner;
        })
      );
    case DISCONNECT_PARTNER_SUCCESS: {
      return state.set(
        "data",
        state.get("data").map(partner => {
          if (partner.get("id") === meta.partnerId) {
            return partner
              .setIn(["attributes", "partnerIntegrationActive"], false)
              .setIn(
                ["attributes", "partnerIntegrationRequested"],
                type === CONNECT_PARTNER_SUCCESS
              );
          }
          return partner;
        })
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
