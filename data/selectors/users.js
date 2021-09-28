export const selectClientsData = state =>
  state.getIn(["users", "clients", "data"]);

export const selectClientsTotalCount = state =>
  state.getIn(["users", "clients", "totalCount"]);

export const selectClientsIsFetching = state =>
  state.getIn(["users", "clients", "isFetching"]);
