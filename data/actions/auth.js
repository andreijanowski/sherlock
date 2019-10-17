import {
  LOGOUT,
  LOAD_USER_DATA,
  CONNECT_STRIPE_REQUEST,
  SET_STRIPE_DATA
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

export const setStripeData = data => ({
  type: SET_STRIPE_DATA,
  payload: {
    data
  }
});
