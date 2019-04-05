import { all, put, takeEvery, select } from "redux-saga/effects";
import { PATH_CHANGED } from "types/app";
import { fetchProfileBusiness } from "actions/users";

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

export default all([takeEvery(PATH_CHANGED, handlePatchChangeSaga)]);
