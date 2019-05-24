import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  FACEBOOK_LOGIN_REQUEST,
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAIL,
  LOGOUT,
  SET_STRIPE_DATA
} from "types/auth";
import { Record } from "immutable";
import isServer from "utils/isServer";

export const initialState = Record({
  isFetching: false,
  isRefreshing: false,
  isAuthenticated: false,
  accessToken: "",
  refreshToken: "",
  createdAt: 0,
  expiresIn: 0,
  stripeConnectData: Record({ businessId: null, state: null })()
})();

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
    case FACEBOOK_LOGIN_REQUEST:
    case REGISTER_REQUEST: {
      return state.set("isFetching", true);
    }
    case REFRESH_TOKEN_REQUEST: {
      window.localStorage.setItem("areCredentialsRefreshing", "true");
      return state.set("isRefreshing", true);
    }
    case LOGIN_SUCCESS:
    case FACEBOOK_LOGIN_SUCCESS:
    case REFRESH_TOKEN_SUCCESS:
    case REGISTER_SUCCESS: {
      const {
        accessToken,
        refreshToken,
        createdAt,
        expiresIn
      } = payload.rawData;

      const updatedData = Record({
        isFetching: false,
        isRefreshing: false,
        isAuthenticated: true,
        accessToken,
        refreshToken,
        createdAt,
        expiresIn
      })();

      if (!isServer) {
        window.localStorage.setItem("areCredentialsRefreshing", "false");
        window.localStorage.setItem(
          "credentials",
          JSON.stringify({
            accessToken,
            refreshToken,
            createdAt,
            expiresIn
          })
        );
      }

      return state.mergeDeep(updatedData);
    }
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case FACEBOOK_LOGIN_FAIL:
    case REFRESH_TOKEN_FAIL:
    case LOGOUT: {
      if (!isServer) {
        window.localStorage.removeItem("credentials");
      }
      return state.mergeDeep(initialState);
    }
    case SET_STRIPE_DATA: {
      return {
        ...state,
        stripeConnectData: payload.data
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
