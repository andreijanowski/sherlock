import { all, put, takeEvery, select } from "redux-saga/effects";
import { startSaga as startSagaAction } from "actions/app";
import { APP_START, PATH_CHANGED } from "types/app";
import { fetchProfileBusiness } from "actions/users";

function* startSaga() {
  yield put(startSagaAction());
}

function* handlePatchChangeSaga({ payload: { path } }) {
  switch (path) {
    case "/app/profile/basicInformation":
    case "/app/profile/contactInformation":
    case "/app/profile/additionalInformation":
    case "/app/profile/openingHours":
    case "/app/profile/picturesAndMenus": {
      const id = yield select(state => state.users.currentBusiness.data.id);
      yield put(fetchProfileBusiness(id));
      break;
    }
    default: {
      break;
    }
  }
}

export default all([
  takeEvery(APP_START, startSaga),
  takeEvery(PATH_CHANGED, handlePatchChangeSaga)
]);
