import { put, putResolve } from "redux-saga/effects";

export default function* fetchAllUserData(action) {
  try {
    const {
      rawData: {
        meta: { totalPages }
      }
    } = yield putResolve(action());
    if (totalPages > 1) {
      for (let i = 2; i <= totalPages; i += 1) {
        yield put(action(i));
      }
    }
  } catch (err) {
    console.log(err);
  }
}
