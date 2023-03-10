import { i18n } from "i18n";
import { fetchProfileBusiness, fetchProfile } from "actions/users";
import {
  fetchBusinessMembers,
  fetchBusinessDeliveries,
  fetchBusinessDishes,
  fetchBusinessOrders,
  fetchBusinessCaterings,
  fetchBusinessPrivatisations,
  fetchBusinessTables,
  fetchBusinessReservations,
  fetchBusinessWidgets,
  fetchBusinessServiceLinks,
  fetchBusinessCards,
  fetchBusinessSubscriptions,
  fetchBusinessClients,
  fetchBusinessFavoriteSuppliers
} from "actions/businesses";

import { SET_CURRENT_BUSINESS } from "types/app";
import { POST_BUSINESS_SUCCESS } from "types/businesses";
import { takeEvery, all, put, call, select } from "redux-saga/effects";

import { setCurrentBusiness } from "actions/app";
import { fetchCategories } from "actions/categories";
import { fetchBusinessPartnerships } from "actions/integrations";
import fetchAllBusinessData from "./utils/fetchAllBusinessData";

export const BASIC_ROLE = "basic";

function* fetchBusinessData({ payload: { id } }) {
  const lang = i18n.language;
  yield put(fetchProfileBusiness(id));
  const profile = yield select(state =>
    state.getIn(["users", "profile", "data", "users"]).first()
  );

  const subscriptionNotTerminated =
    profile && profile.getIn(["attributes", "subscriptionNotTerminated"]);

  if (!subscriptionNotTerminated) {
    yield fetchAllBusinessData(fetchBusinessCards, id);
    yield fetchAllBusinessData(fetchBusinessSubscriptions, id);
  }
  yield fetchAllBusinessData(fetchBusinessServiceLinks, id);
  yield put(fetchCategories(lang));
  yield fetchAllBusinessData(fetchBusinessMembers, id);
  yield fetchAllBusinessData(fetchBusinessDeliveries, id);
  yield fetchAllBusinessData(fetchBusinessDishes, id);
  yield fetchAllBusinessData(fetchBusinessOrders, id);
  yield fetchAllBusinessData(fetchBusinessCaterings, id);
  yield fetchAllBusinessData(fetchBusinessPrivatisations, id);
  yield fetchAllBusinessData(fetchBusinessTables, id);
  yield fetchAllBusinessData(fetchBusinessReservations, id);
  yield fetchAllBusinessData(fetchBusinessWidgets, id);
  yield fetchAllBusinessData(fetchBusinessFavoriteSuppliers, id);
  yield put(fetchBusinessPartnerships(id));
  yield put(fetchBusinessClients(id));
}

function* setBusiness({
  payload: {
    rawData: {
      data: { id }
    }
  }
}) {
  yield put(setCurrentBusiness(id));
}

function* onBusinessCreated(data) {
  yield setBusiness(data);
  const {
    meta: { onSuccess }
  } = data;
  if (onSuccess) {
    yield call(onSuccess);
  }

  const profile = yield select(state =>
    state.getIn(["users", "profile", "data", "users"]).first()
  );

  const role = profile && profile.getIn(["attributes", "role"]);
  if (role === BASIC_ROLE) {
    yield put(fetchProfile());
  }
}

export default all([
  takeEvery([POST_BUSINESS_SUCCESS], onBusinessCreated),
  takeEvery([SET_CURRENT_BUSINESS], fetchBusinessData)
]);
