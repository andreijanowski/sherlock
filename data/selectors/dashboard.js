import {
  BEST_SALES_DATA_PATH,
  BEST_SALES_TOTAL_PAGES_PATH,
  WORST_SALES_DATA_PATH,
  WORST_SALES_TOTAL_PAGES_PATH
} from "reducers/dashboard";

const PREFIX = "dashboard";

export const selectBestSalesData = state =>
  state.getIn([PREFIX, ...BEST_SALES_DATA_PATH]);

export const selectBestSalesTotalPagesData = state =>
  state.getIn([PREFIX, ...BEST_SALES_TOTAL_PAGES_PATH]) || 0;

export const selectWorstSalesData = state =>
  state.getIn([PREFIX, ...WORST_SALES_DATA_PATH]);

export const selectWorstSalesTotalPagesData = state =>
  state.getIn([PREFIX, ...WORST_SALES_TOTAL_PAGES_PATH]) || 0;

export const selectDashboardIsFetching = state =>
  state.getIn([PREFIX, "isFetching"]);
