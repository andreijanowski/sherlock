import {
  FETCH_BUSINESS_PARTNERSHIPS_REQUEST,
  FETCH_BUSINESS_PARTNERSHIPS_SUCCESS,
  CONNECT_PARTNER_WITH_ORKESTRO_SUCCESS,
  DISCONNECT_PARTNER_FROM_ORKESTRO_SUCCESS
} from "types/integrations";
import { LOGOUT } from "types/auth";
import { Record } from "immutable";

import { ORKESTRO_NAME } from "utils/integrations";

export const initialState = Record({
  isConnectedToOrkestro: false,
  isFetching: false,
  isFailed: false,
  isSucceeded: true,
  hasPosCurrentBusiness: false
})();

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_BUSINESS_PARTNERSHIPS_REQUEST: {
      return state.merge(
        Record({
          isFetching: true,
          isFailed: false,
          isSucceeded: false
        })()
      );
    }
    case FETCH_BUSINESS_PARTNERSHIPS_SUCCESS: {
      const isConnectedToOrkestro =
        payload.rawData.included &&
        payload.rawData.included.some(
          service => service.attributes.name === ORKESTRO_NAME
        );
      const newState = state.merge(
        Record({
          isFetching: false,
          isSucceeded: true,
          isConnectedToOrkestro,
          hasPosCurrentBusiness:
            payload.rawData.data &&
            payload.rawData.data.attributes &&
            payload.rawData.data.attributes.posPartnerIntegrationExists
        })()
      );

      return newState;
    }
    case DISCONNECT_PARTNER_FROM_ORKESTRO_SUCCESS: {
      return state.merge(
        Record({
          isFetching: false,
          isSucceeded: true,
          isConnectedToOrkestro: false
        })()
      );
    }
    case CONNECT_PARTNER_WITH_ORKESTRO_SUCCESS: {
      return state.merge(
        Record({
          isFetching: false,
          isSucceeded: true,
          isConnectedToOrkestro: true
        })()
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
