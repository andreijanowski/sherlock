import {
  LOGIN_REQUEST,
  FACEBOOK_LOGIN_REQUEST,
  REFRESH_TOKEN_REQUEST,
  LOGOUT,
  REGISTER_REQUEST,
  CHANGE_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST,
  CONFIRM_REQUEST,
  DELETE_BY_TOKEN_REQUEST,
  CHANGE_PASSWORD_BY_TOKEN_REQUEST,
  CONNECT_STRIPE_REQUEST,
  SET_STRIPE_DATA,
  SET_AUTH_SYNCHRONIZED_FROM_STORAGE
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
          termsAgreement,
          source: "sherlock"
        }
      }
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

export const resetPassword = data => ({
  type: RESET_PASSWORD_REQUEST,
  payload: {
    data: {
      data: {
        type: "users",
        attributes: data
      }
    },
    endpoint: "/api/v1/users/request_reset_password",
    authRequired: false,
    method: "POST"
  },
  meta: { thunk: true }
});

export const confirmMail = token => ({
  type: CONFIRM_REQUEST,
  payload: {
    method: "POST",
    endpoint: `/api/v1/users/confirm`,
    data: {
      data: {
        type: "users",
        attributes: {
          confirmation_token: token
        }
      }
    }
  },
  meta: { thunk: true }
});

export const deleteByToken = token => ({
  type: DELETE_BY_TOKEN_REQUEST,
  payload: {
    method: "DELETE",
    endpoint: `/api/v1/users/delete_by_token?data[type]=users&data[attributes]%5Bdelete_token%5D=${token}`
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

export const changePasswordByToken = data => ({
  type: CHANGE_PASSWORD_BY_TOKEN_REQUEST,
  payload: {
    data: {
      data: {
        type: "users",
        attributes: data
      },
      grant_type: "password"
    },
    endpoint: "/api/v1/users/reset_password_by_token",
    authRequired: false,
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

export const setAuthSynchronizedFromStorage = data => ({
  type: SET_AUTH_SYNCHRONIZED_FROM_STORAGE,
  payload: data
});
