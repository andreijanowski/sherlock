import {
  UPLOAD_MENU_TO_UBER_EATS_SUCCESS,
  UPLOAD_MENU_TO_UBER_EATS_FAIL
} from "types/integrations";
import { all, put, takeEvery } from "redux-saga/effects";
import Notifications from "react-notification-system-redux";

function* uploddSuccessNotify() {
  yield put(
    Notifications.success({
      message: "Menu successfully uploaded to Uber Eats"
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
  takeEvery(UPLOAD_MENU_TO_UBER_EATS_FAIL, uploddFailNotify),
  takeEvery(UPLOAD_MENU_TO_UBER_EATS_SUCCESS, uploddSuccessNotify)
]);
