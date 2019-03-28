import {
  LOGIN_REQUEST,
  FACEBOOK_LOGIN_REQUEST,
  REFRESH_TOKEN_REQUEST,
  LOGOUT,
  REDIRECT_TO_REGISTER,
  REGISTER_REQUEST,
  CHANGE_PASSWORD_REQUEST,
  CONNECT_STRIPE_REQUEST,
  SET_STRIPE_DATA
} from "types/auth";

export const login = data => ({
  type: LOGIN_REQUEST,
  payload: {
    data: {
      ...data,
      grant_type: "password"
    },
    endpoint: "/oauth/token",
    authRequired: false,
    method: "POST"
  },
  meta: { thunk: true }
});

export const facebookLogin = ({ accessToken, agreement }) => ({
  type: FACEBOOK_LOGIN_REQUEST,
  payload: {
    data: {
      assertion: accessToken,
      grant_type: "assertion",
      provider: "facebook",
      terms_agreement: agreement
    },
    endpoint: "/oauth/token",
    authRequired: false,
    method: "POST"
  },
  meta: { thunk: true }
});

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

export const redirectToRegister = () => ({ type: REDIRECT_TO_REGISTER });

export const register = ({
  email,
  password,
  passwordConfirmation,
  termsAgreement
}) => ({
  type: REGISTER_REQUEST,
  payload: {
    data: {
      data: {
        type: "users",
        attributes: {
          email,
          password,
          passwordConfirmation,
          termsAgreement
        }
      },
      grant_type: "password"
    },
    endpoint: "/api/v1/users",
    authRequired: false,
    method: "POST"
  },
  meta: { thunk: true }
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
