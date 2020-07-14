import { CONNECT_PARTNER_SUCCESS } from "types/partners";
import { put, takeEvery } from "redux-saga/effects";

import { fetchPartners } from "actions/partners";

function* fetchIntegrations() {
  yield put(fetchPartners());
}

export default takeEvery(CONNECT_PARTNER_SUCCESS, fetchIntegrations);
