import {
  UPLOAD_MENU_TO_UBER_EATS_SUCCESS,
  UPLOAD_MENU_TO_UBER_EATS_FAIL,
  DOWNLOAD_MENU_FROM_UBER_EATS_FAIL,
  DOWNLOAD_MENU_FROM_UBER_EATS_SUCCESS
} from "types/integrations";
import { all, put, takeEvery } from "redux-saga/effects";
import { fetchBusinessDishes } from "actions/businesses";
import Notifications from "react-notification-system-redux";

function* uploddSuccessNotify() {
  yield put(
    Notifications.success({
      message: "Menu successfully uploaded to Uber Eats"
    })
  );
}

function* downloadSuccessNotify() {
  const lastBusinessId = window.localStorage.getItem("currentBusinessId");
  yield put(fetchBusinessDishes(lastBusinessId));
  yield put(
    Notifications.success({
      message: "Menu successfully downloaded from Uber Eats"
    })
  );
}

function* uploddFailNotify() {
  yield put(
    Notifications.success({
      message: "Something went wrong"
    })
  );
}

export default all([
  takeEvery(DOWNLOAD_MENU_FROM_UBER_EATS_FAIL, uploddFailNotify),
  takeEvery(DOWNLOAD_MENU_FROM_UBER_EATS_SUCCESS, downloadSuccessNotify),
  takeEvery(UPLOAD_MENU_TO_UBER_EATS_FAIL, uploddFailNotify),
  takeEvery(UPLOAD_MENU_TO_UBER_EATS_SUCCESS, uploddSuccessNotify)
]);
