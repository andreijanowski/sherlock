export const selectClientsData = state =>
  state.getIn(["users", "clients", "data"]);

export const selectClientsTotalCount = state =>
  state.getIn(["users", "clients", "totalCount"]);

export const selectClientsIsFetching = state =>
  state.getIn(["users", "clients", "isFetching"]);

export const selectIsPartooConnected = state => {
  try {
    const profile = state.getIn(["users", "profile", "data", "users"]).first();
    return Boolean(
      profile && profile.getIn(["attributes", "connectedToPartoo"])
    );
  } catch (e) {
    return false;
  }
};
