import { UPLOAD_DISHES_SUCCESS } from "types/dishes";
import { all, select, takeEvery } from "redux-saga/effects";
import { fetchBusinessDishes } from "actions/businesses";
import fetchAllBusinessData from "./utils/fetchAllBusinessData";

function* refetchDishes() {
  const business = yield select(state =>
    state.getIn(["users", "currentBusiness", "data", "businesses"])
  );
  if (business) {
    const id = business.first().get("id");
    yield fetchAllBusinessData(fetchBusinessDishes, id);
  }
}

export default all([takeEvery(UPLOAD_DISHES_SUCCESS, refetchDishes)]);
