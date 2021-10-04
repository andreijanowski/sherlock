export const selectPayments = state => state.getIn(["payments", "data"]);

export const selectPaymentsCount = state =>
  state.getIn(["payments", "totalCount"]);

export const selectPaymentsIsFetching = state =>
  state.getIn(["payments", "isFetching"]);
