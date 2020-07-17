import { CONNECT_WHOLESALER_SUCCESS } from "types/wholesalers";
import { put, takeEvery } from "redux-saga/effects";

import { fetchWholesalers } from "actions/wholesalers";

function* handleFetchWholesalers() {
  yield put(fetchWholesalers());
}

export default takeEvery(CONNECT_WHOLESALER_SUCCESS, handleFetchWholesalers);
