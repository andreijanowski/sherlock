import { fetchProfileBusiness } from "actions/users";
import { fetchBusinessMembers } from "actions/businesses";
import { SET_CURRENT_BUSINESS } from "types/users";
import { takeEvery, all, put } from "redux-saga/effects";

function* fetchBusinessData({ payload: { id } }) {
  yield put(fetchProfileBusiness(id));
  yield put(fetchBusinessMembers(id));
}

export default all([takeEvery(SET_CURRENT_BUSINESS, fetchBusinessData)]);
