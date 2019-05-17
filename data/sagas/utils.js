import { put } from "redux-saga/effects";

export function* fetchAllBusinessData(action, id) {
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

export function* fetchAllUserData(action) {
  const {
    rawData: {
      meta: { totalPages }
    }
  } = yield put.resolve(action());
  if (totalPages > 1) {
    for (let i = 2; i <= totalPages; i += 1) {
      yield put(action(i));
    }
  }
}