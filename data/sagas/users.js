import { fetchProfileBusiness } from "actions/users";
import { fetchBusinessMembers } from "actions/businesses";
import { SET_CURRENT_BUSINESS } from "types/users";
import { POST_BUSINESS_SUCCESS } from "types/businesses";
import { takeEvery, all, put } from "redux-saga/effects";

function* fetchBusinessData({
  payload: {
    rawData: {
      data: { id }
    }
  }
}) {
  yield put(fetchProfileBusiness(id));
  yield put(fetchBusinessMembers(id));
}

export default all([
  takeEvery([SET_CURRENT_BUSINESS, POST_BUSINESS_SUCCESS], fetchBusinessData)
]);
