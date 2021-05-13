import { CONNECT_PARTNER_SUCCESS } from "types/partners";
import { all, takeEvery, select } from "redux-saga/effects";
import { fetchPartners } from "actions/partners";
import fetchAllBusinessData from "./utils/fetchAllBusinessData";

function* fetchIntegrations() {
  const business = yield select(state =>
    state.getIn(["users", "currentBusiness", "data", "businesses"])
  );
  if (business) {
    const id = business.first().get("id");
    yield fetchAllBusinessData(fetchPartners, id);
  }
}

export default all([takeEvery(CONNECT_PARTNER_SUCCESS, fetchIntegrations)]);
