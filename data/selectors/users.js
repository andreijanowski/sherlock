export const selectClientsData = state =>
  state.getIn(["users", "clients", "data"]);

export const selectClientsTotalCount = state =>
  state.getIn(["users", "clients", "totalCount"]);

export const selectCurrentBusiness = state => {
  const businessData = state.getIn(["users", "currentBusiness", "data"]);
  return businessData && businessData.get("businesses").first();
};

export const selectCurrentBusinessId = state => {
  const business = selectCurrentBusiness(state);
  return business && business.get("id");
};

export const selectClientsIsFetching = state =>
  state.getIn(["users", "clients", "isFetching"]);
