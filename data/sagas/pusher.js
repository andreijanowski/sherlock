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
      const handleOrderEvent = data => dispatch(handleOrderUpdate(data));
      const handleReservationEvent = data =>
        dispatch(handleReservationUpdate(data));
      try {
        Pusher.init(id);
        Pusher.subscribe(`private-users-${id}-notifications`);
        Pusher.bind("order.update", handleOrderEvent);
        Pusher.bind("reservation.create", handleReservationEvent);
        Pusher.bind("reservation.update", handleReservationEvent);
      } catch (e) {
        console.log(e);
      }
    }
    yield;
  };

export default dispatch =>
  all([takeLatest(FETCH_PROFILE_SUCCESS, runPusher(dispatch))]);
