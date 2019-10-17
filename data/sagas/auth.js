import { takeEvery, put, putResolve, all, select } from "redux-saga/effects";
import {
  fetchProfile,
  fetchProfileBusinesses,
  fetchProfileCards,
  fetchProfileSubscriptions
} from "actions/users";
import { fetchGroups } from "actions/groups";
import { postBusiness } from "actions/businesses";
import { LOAD_USER_DATA } from "types/auth";
import { setCurrentBusiness, saveCurrentUserId } from "actions/app";
import isServer from "utils/isServer";
import { fetchAllUserData } from "./utils";

function* fetchUserData() {
  let lastBusinessId;
  let lastUserId;
  if (!isServer) {
    lastBusinessId = window.localStorage.getItem("currentBusinessId");
    lastUserId = window.localStorage.getItem("currentUserId");
  }
  const {
    rawData: {
      data: { id: userId }
    }
  } = yield putResolve(fetchProfile());
  yield fetchAllUserData(fetchProfileCards);
  yield put(fetchProfileSubscriptions());
  yield fetchAllUserData(fetchGroups);
  yield fetchAllUserData(fetchProfileBusinesses);
  const profileBusinesses = yield select(state =>
    state.getIn(["users", "profileBusinesses", "data", "businesses"])
  );
  if (profileBusinesses && profileBusinesses.size) {
    if (
      lastUserId === userId &&
      profileBusinesses.find((v, k) => k === lastBusinessId)
    ) {
      yield put(setCurrentBusiness(lastBusinessId));
    } else {
      yield put(setCurrentBusiness(profileBusinesses.first().get("id")));
    }
  } else {
    yield put(postBusiness());
  }
  yield put(saveCurrentUserId(userId));
}

export default all([takeEvery([LOAD_USER_DATA], fetchUserData)]);
