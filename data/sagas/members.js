import { takeLatest, put, all, select } from "redux-saga/effects";
import { CREATE_MEMBER_SUCCESS, UPDATE_MEMBER_SUCCESS } from "types/members";

import { fetchBusinessMembers } from "modules/Restaurant/actions";

function* handleFetch() {
  const state = yield select();
  yield put(fetchBusinessMembers(state.restaurant.id));
}

export default all([
  takeLatest([CREATE_MEMBER_SUCCESS, UPDATE_MEMBER_SUCCESS], handleFetch)
]);
