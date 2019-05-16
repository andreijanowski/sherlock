import { all, select, takeLatest } from "redux-saga/effects";
import { FETCH_PROFILE_SUCCESS } from "types/users";
import { handleOrderUpdate } from "actions/orders";
import Pusher from "../pusher";

const runPusher = dispatch =>
  function* initPusher({
    payload: {
      rawData: {
        data: { id }
      }
    }
  }) {
    const accessToken = yield select(state =>
      state.getIn(["auth", "accessToken"])
    );
    Pusher.init(accessToken, id);
    Pusher.subscribe(`private-users-${id}-notifications`);
    Pusher.bind("order.update", data => dispatch(handleOrderUpdate(data)));
  };

export default dispatch =>
  all([takeLatest(FETCH_PROFILE_SUCCESS, runPusher(dispatch))]);
