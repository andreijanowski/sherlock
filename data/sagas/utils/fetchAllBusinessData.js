import { put, putResolve } from "redux-saga/effects";

export default function* fetchAllBusinessData(action, id) {
  try {
    const {
      rawData: {
        meta: { totalPages }
      }
    } = yield putResolve(action(id));
    if (totalPages > 1) {
      for (let i = 2; i <= totalPages; i += 1) {
        yield put(action(id, i));
      }
    }
  } catch (err) {
    console.log(err);
  }
}
