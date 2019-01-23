import {
  LOGIN_REQUEST,
  FACEBOOK_LOGIN_REQUEST,
  REFRESH_TOKEN_REQUEST,
  LOGOUT,
  REDIRECT_TO_REGISTER,
  REGISTER_REQUEST
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
