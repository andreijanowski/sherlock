import { all, takeLatest } from "redux-saga/effects";
import { FETCH_PROFILE_SUCCESS } from "types/users";
import { handleOrderUpdate } from "actions/orders";
import { handleReservationUpdate } from "actions/reservations";
import isServer from "utils/isServer";
import Pusher from "../pusher";

const runPusher = dispatch =>
  function* initPusher({
    payload: {
      rawData: {
        data: { id }
      }
    }
  }) {
    if (!isServer) {
      try {
        const credentials = JSON.parse(
          window.localStorage.getItem("credentials")
        );
        if (credentials.accessToken) {
          Pusher.init(credentials.accessToken, id);
          Pusher.subscribe(`private-users-${id}-notifications`);
          Pusher.bind("order.update", data =>
            dispatch(handleOrderUpdate(data))
          );
          Pusher.bind("reservation.create", data =>
            dispatch(handleReservationUpdate(data))
          );
          Pusher.bind("reservation.update", data =>
            dispatch(handleReservationUpdate(data))
          );
        }
      } catch (e) {
        console.log(e);
      }
    }
    yield;
  };

export default dispatch =>
  all([takeLatest(FETCH_PROFILE_SUCCESS, runPusher(dispatch))]);
