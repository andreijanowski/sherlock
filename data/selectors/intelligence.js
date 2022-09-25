export const selectIntelligence = state =>
  state.getIn(["intelligence", "data"]);

export const selectIntelligenceCount = state =>
  state.getIn(["intelligence", "totalCount"]);

export const selectIntelligenceIsFetching = state =>
  state.getIn(["intelligence", "isFetching"]);
