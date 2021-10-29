import {
  BEST_SALES_DATA_PATH,
  BEST_SALES_TOTAL_PAGES_PATH,
  WORST_SALES_DATA_PATH,
  WORST_SALES_TOTAL_PAGES_PATH,
  LIVE_STREAM_DATA_PATH,
  LIVE_STREAM_TOTAL_PAGES_PATH
} from "reducers/dashboard";

const PREFIX = "dashboard";

const DEFAULT_TOTAL_COUNT = 0;

const getDashboardData = (state, path) => state.getIn([PREFIX].concat(path));

export const selectBestSalesData = state =>
  getDashboardData(state, BEST_SALES_DATA_PATH);

export const selectBestSalesTotalPagesData = state =>
  getDashboardData(state, BEST_SALES_TOTAL_PAGES_PATH) || DEFAULT_TOTAL_COUNT;

export const selectWorstSalesData = state =>
  getDashboardData(state, WORST_SALES_DATA_PATH);

export const selectWorstSalesTotalPagesData = state =>
  getDashboardData(state, WORST_SALES_TOTAL_PAGES_PATH) || DEFAULT_TOTAL_COUNT;

export const selectLiveStreamData = state =>
  getDashboardData(state, LIVE_STREAM_DATA_PATH);

export const selectLiveStreamTotalPagesData = state =>
  getDashboardData(state, LIVE_STREAM_TOTAL_PAGES_PATH) || DEFAULT_TOTAL_COUNT;

export const selectDashboardIsFetching = state =>
  getDashboardData(state, ["isFetching"]);
