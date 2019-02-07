import { APP_START, SAGA_START, PATH_CHANGED } from "types/app";

export const startApp = () => ({
  type: APP_START
});

export const startSaga = () => ({
  type: SAGA_START
});

export const pathChanged = path => ({
  type: PATH_CHANGED,
  payload: { path }
});
