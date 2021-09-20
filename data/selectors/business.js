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
