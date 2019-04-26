import { put } from "redux-saga/effects";

export function* fetchAllData(action, id) {
  const {
    rawData: {
      meta: { totalPages }
    }
  } = yield put.resolve(action(id));
  if (totalPages > 1) {
    for (let i = 2; i <= totalPages; i += 1) {
      yield put(action(id, i));
    }
  }
}
