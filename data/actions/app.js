import { PATH_CHANGED, ACCEPT_COOKIES } from "types/app";

export const pathChanged = path => ({
  type: PATH_CHANGED,
  payload: { path }
});

export const acceptCookies = () => ({
  type: ACCEPT_COOKIES
});
