import {
  REFRESH_TOKEN_REQUEST,
  LOGOUT,
  CONNECT_STRIPE_REQUEST,
  SET_STRIPE_DATA
} from "types/auth";

export const refreshToken = data => ({
  type: REFRESH_TOKEN_REQUEST,
  payload: {
    data: {
      ...data,
      grant_type: "refresh_token"
    },
    endpoint: "/oauth/token",
    authRequired: false,
    method: "POST"
  },
  meta: { thunk: true }
});

export const logout = () => ({ type: LOGOUT });

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

export const setStripeData = data => ({
  type: SET_STRIPE_DATA,
  payload: {
    data
  }
});
