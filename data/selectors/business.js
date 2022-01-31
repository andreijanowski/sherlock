import { Map } from "immutable";

import {
  checkIsBusinessStripeLoading,
  BUSINESS_SETTINGS_KEYS
} from "utils/businessUtils";

export const selectCurrentBusiness = state => {
  const businessData = state.getIn(["users", "currentBusiness", "data"]);
  return (
    businessData &&
    businessData.get("businesses") &&
    businessData.get("businesses").first()
  );
};

export const selectCurrentBusinessId = state => {
  const business = selectCurrentBusiness(state);
  return business && business.get("id");
};

export const selectCurrentBusinessAttributes = state => {
  const business = selectCurrentBusiness(state);
  return business && business.get("attributes");
};

export const selectCurrentBusinessStripeIsLoading = state =>
  checkIsBusinessStripeLoading(selectCurrentBusinessAttributes(state));

export const selectCurrentBusinessIsFetching = state =>
  state.getIn(["users", "currentBusiness", "isFetching"]);

export const selectBusinessDataProp = (state, { prop }) => {
  const businessData = state.getIn(["users", "currentBusiness", "data"]);
  return businessData && businessData.get(prop);
};

export const selectBusinessGroups = state =>
  selectBusinessDataProp(state, { prop: "groups" });

export const selectBusinessMenus = state =>
  selectBusinessDataProp(state, { prop: "menus" });

export const selectBusinessPictures = state =>
  selectBusinessDataProp(state, { prop: "pictures" });

export const selectBusinessProducts = state =>
  selectBusinessDataProp(state, { prop: "products" });

export const selectBusinessOpenPeriods = state =>
  selectBusinessDataProp(state, { prop: "openPeriods" });

export const selectBusinessSettingsObject = state => {
  const attributes = selectCurrentBusinessAttributes(state);
  const settings = attributes && attributes.get("settings");
  return Map.isMap(settings) ? settings.toObject() : settings;
};

export const selectBusinessSettingsAttribute = (state, { prop }) => {
  const settings = selectBusinessSettingsObject(state);
  return settings && settings[prop];
};

export const selectIsOrdersNotificationsEnabled = state =>
  selectBusinessSettingsAttribute(state, {
    prop: BUSINESS_SETTINGS_KEYS.ORDERS_NOTIFICATIONS
  });

export const selectIsReservationsNotificationsEnabled = state =>
  selectBusinessSettingsAttribute(state, {
    prop: BUSINESS_SETTINGS_KEYS.RESERVATIONS_NOTIFICATIONS
  });
