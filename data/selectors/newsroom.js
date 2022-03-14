export const selectNews = state =>
  state.getIn(["newsroom", "data", "newsPosts"]);

export const selectNewsIsFetching = state =>
  state.getIn(["newsroom", "isFetching"]);
