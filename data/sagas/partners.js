import {
  CONNECT_PARTNER_SUCCESS,
  DISCONNECT_PARTNER_SUCCESS
} from "types/partners";
import { all, select, put, takeEvery } from "redux-saga/effects";
import { fetchPartners } from "actions/partners";

function* handlePartnersFetch() {
  const businessData = yield select(state =>
    state.getIn(["partners", "previousConfig"])
  );

  if (businessData) {
    yield put(fetchPartners(businessData));
  }
}

export default all([
  takeEvery(CONNECT_PARTNER_SUCCESS, handlePartnersFetch),
  takeEvery(DISCONNECT_PARTNER_SUCCESS, handlePartnersFetch)
]);
