import { PATH_CHANGED, ACCEPT_COOKIES, SET_CURRENT_BUSINESS } from "types/app";

export const pathChanged = path => ({
  type: PATH_CHANGED,
  payload: { path }
});

export const acceptCookies = () => ({
  type: ACCEPT_COOKIES
});

export const setCurrentBusiness = id => ({
  type: SET_CURRENT_BUSINESS,
  payload: {
    id
  }
});
