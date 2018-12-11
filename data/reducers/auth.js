import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  FACEBOOK_LOGIN_REQUEST,
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAIL,
  LOGOUT
} from "types/auth";

export const initialState = {
  isFetching: false,
  isRefreshing: false,
  isAuthenticated: false,
  accessToken: "",
  refreshToken: "",
  createdAt: 0,
  expiresIn: 0
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
    case FACEBOOK_LOGIN_REQUEST: {
      return {
        ...state,
        isFetching: true
      };
    }
    case REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        isRefreshing: true
      };
    }
    case LOGIN_SUCCESS:
    case FACEBOOK_LOGIN_SUCCESS:
    case REFRESH_TOKEN_SUCCESS: {
      const { accessToken, refreshToken, createdAt, expiresIn } = payload.data;
      return {
        isFetching: false,
        isRefreshing: false,
        isAuthenticated: true,
        accessToken,
        refreshToken,
        createdAt,
        expiresIn
      };
    }
    case LOGIN_FAIL:
    case FACEBOOK_LOGIN_FAIL:
    case REFRESH_TOKEN_FAIL:
    case LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
