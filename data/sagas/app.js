import { all, put, takeEvery, select } from "redux-saga/effects";
import { PATH_CHANGED } from "types/app";
import { fetchProfileBusiness } from "actions/users";
import { fetchBusinessMembers } from "actions/businesses";

function* handlePatchChangeSaga({ payload: { path } }) {
  switch (path) {
    case "/app/profile/basicInformation":
    case "/app/profile/contactInformation":
    case "/app/profile/additionalInformation":
    case "/app/profile/openingHours":
    case "/app/profile/picturesAndMenus": {
      const id = yield select(state =>
        state
          .getIn(["users", "currentBusiness", "data", "businesses"])
          .first()
          .get("id")
      );
      yield put(fetchProfileBusiness(id));
      break;
    }
    case "/app/profile/members": {
      const id = yield select(state =>
        state
          .getIn(["users", "currentBusiness", "data", "businesses"])
          .first()
          .get("id")
      );
      yield put(fetchBusinessMembers(id));
      break;
    }
    default: {
      break;
    }
  }
}

export default all([takeEvery(PATH_CHANGED, handlePatchChangeSaga)]);
