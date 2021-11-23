import { checkIsBusinessStripeLoading } from "utils/businessUtils";

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
