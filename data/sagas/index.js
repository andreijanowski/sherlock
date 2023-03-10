import { all } from "redux-saga/effects";
import app from "./app";
import api from "./api";
import auth from "./auth";
import users from "./users";
import pusher from "./pusher";
import orders from "./orders";
import reservations from "./reservations";
import integrations from "./integrations";
import dishes from "./dishes";

export default function* rootSaga(dispatch) {
  try {
    yield all([
      app,
      api,
      auth,
      users,
      integrations,
      pusher(dispatch),
      orders,
      reservations,
      dishes
    ]);
  } catch (e) {
    // eslint-disable-next-line  no-console
    console.warn(e.message);
  }
}
