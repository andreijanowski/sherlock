import {
  LOGOUT,
  LOAD_USER_DATA,
  CONNECT_STRIPE_REQUEST,
  SET_STRIPE_DATA,
  REFRESH_TOKEN_REQUEST,
  CHANGE_PASSWORD_REQUEST
} from "types/auth";

export const logout = () => ({ type: LOGOUT });

export const loadUserData = () => ({ type: LOAD_USER_DATA });

export const connectStripe = (authCode, id) => ({
  type: CONNECT_STRIPE_REQUEST,
  payload: {
    endpoint: `/api/v1/businesses/${id}/connect_stripe`,
    data: {
      data: {
        type: "businesses",
        id,
        attributes: {
          authorization_code: authCode
        }
      }
    },
    method: "PATCH"
  },
  meta: { thunk: true }
});

export const refreshToken = () => ({
  type: REFRESH_TOKEN_REQUEST,
  payload: {
    endpoint: `/refresh-token`,
    method: "POST"
  },
  meta: { thunk: true }
});

export const setStripeData = data => ({
  type: SET_STRIPE_DATA,
  payload: {
    data
  }
});

export const changePassword = data => ({
  type: CHANGE_PASSWORD_REQUEST,
  payload: {
    data: {
      data: {
        type: "users",
        attributes: {
          ...data
        }
      }
    },
    endpoint: "/api/v1/users/me/reset_password",
    method: "PATCH"
  },
  meta: { thunk: true }
});
