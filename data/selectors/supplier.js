export const selectSupplierProductCategories = state =>
  state.getIn(["supplier", "data"]);

export const selectSupplierProductCategoriesIsFetching = state =>
  state.getIn(["supplier", "isFetching"]);
