/* eslint-disable no-param-reassign */
import { Record, Map, fromJS } from "immutable";
import {
  FETCH_REVENUE_BREAKDOWN_REQUEST,
  FETCH_AVG_TICKET_SIZE_REQUEST,
  FETCH_TODAYS_EARNINGS_REQUEST,
  FETCH_BEST_SALES_REQUEST,
  FETCH_LIVE_STREAM_REQUEST,
  FETCH_AVG_TICKET_SIZE_SUCCESS,
  FETCH_REVENUE_BREAKDOWN_SUCCESS,
  FETCH_TODAYS_EARNINGS_SUCCESS,
  FETCH_BEST_SALES_SUCCESS,
  FETCH_WORST_SALES_SUCCESS,
  FETCH_LIVE_STREAM_SUCCESS
} from "types/businesses";

export const initialState = Record({
  data: Map(),
  isFetching: false,
  isFailed: false,
  isSucceeded: false
})();

const getDataPath = dataName => ["data", "dashboard", dataName, "data"];
const getTotalPagesPath = dataName => [
  "data",
  "dashboard",
  dataName,
  "totalPages"
];

export const BEST_SALES_DATA_PATH = getDataPath("bestSales");
export const BEST_SALES_TOTAL_PAGES_PATH = getTotalPagesPath("bestSales");

export const WORST_SALES_DATA_PATH = getDataPath("worstSales");
export const WORST_SALES_TOTAL_PAGES_PATH = getTotalPagesPath("worstSales");

export const LIVE_STREAM_DATA_PATH = getDataPath("liveStream");
export const LIVE_STREAM_TOTAL_PAGES_PATH = getTotalPagesPath("liveStream");

const processDashboardData = ({
  state,
  payload,
  meta,
  dataPath,
  totalPagesPath
}) => {
  let newState = state.merge(
    Record({
      isFetching: false,
      isFailed: false,
      isSucceeded: true
    })()
  );
  const {
    rawData: {
      data,
      meta: { totalPages }
    }
  } = payload;

  if (meta.page === 1) {
    newState = newState
      .setIn(dataPath, fromJS(data))
      .setIn(totalPagesPath, totalPages);
  } else {
    newState = newState.mergeIn(dataPath, fromJS(data));
  }
  return newState;
};

const reducer = (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case FETCH_REVENUE_BREAKDOWN_REQUEST:
    case FETCH_TODAYS_EARNINGS_REQUEST:
    case FETCH_AVG_TICKET_SIZE_REQUEST:
    case FETCH_BEST_SALES_REQUEST:
    case FETCH_LIVE_STREAM_REQUEST: {
      return state.merge(
        Record({
          isFetching: true,
          isFailed: false,
          isSucceeded: false
        })()
      );
    }

    case FETCH_TODAYS_EARNINGS_SUCCESS: {
      let newState = state.merge(
        Record({
          isFetching: false,
          isFailed: false,
          isSucceeded: true
        })()
      );

      const {
        sumToday,
        sumYesterday,
        averageLastMonth,
        averageLast3Months,
        averageLastYear
      } = payload.rawData.data.attributes;

      newState = newState.mergeIn(
        ["data", "dashboard", "earnings"],
        fromJS({
          today: sumToday,
          yesterday: sumYesterday,
          lastMonth: averageLastMonth,
          last3Months: averageLast3Months,
          lastYear: averageLastYear
        })
      );

      return newState;
    }

    case FETCH_REVENUE_BREAKDOWN_SUCCESS: {
      let newState = state.merge(
        Record({
          isFetching: false,
          isFailed: false,
          isSucceeded: true
        })()
      );

      const {
        revenue,
        onSiteRevenue,
        deliveryRevenue,
        takeawayRevenue,
        otherRevenue
      } = payload.rawData.data.attributes;

      newState = newState.mergeIn(
        ["data", "dashboard", "revenueBreakdown"],
        fromJS({
          revenue,
          onSiteRevenue,
          deliveryRevenue,
          takeawayRevenue,
          otherRevenue
        })
      );

      return newState;
    }

    case FETCH_AVG_TICKET_SIZE_SUCCESS: {
      let newState = state.merge(
        Record({
          isFetching: false,
          isFailed: false,
          isSucceeded: true
        })()
      );

      const {
        averageToday,
        averageYesterday,
        averageLastMonth,
        averageLast3Months,
        averageLastYear
      } = payload.rawData.data.attributes;

      newState = newState.mergeIn(
        ["data", "dashboard", "ticket"],
        fromJS({
          today: averageToday,
          yesterday: averageYesterday,
          lastMonth: averageLastMonth,
          last3Months: averageLast3Months,
          lastYear: averageLastYear
        })
      );

      return newState;
    }

    case FETCH_BEST_SALES_SUCCESS: {
      return processDashboardData({
        state,
        payload,
        meta,
        dataPath: BEST_SALES_DATA_PATH,
        totalPagesPath: BEST_SALES_TOTAL_PAGES_PATH
      });
    }

    case FETCH_WORST_SALES_SUCCESS: {
      return processDashboardData({
        state,
        payload,
        meta,
        dataPath: WORST_SALES_DATA_PATH,
        totalPagesPath: WORST_SALES_TOTAL_PAGES_PATH
      });
    }

    case FETCH_LIVE_STREAM_SUCCESS: {
      return processDashboardData({
        state,
        payload,
        meta,
        dataPath: LIVE_STREAM_DATA_PATH,
        totalPagesPath: LIVE_STREAM_TOTAL_PAGES_PATH
      });
    }

    default: {
      return state;
    }
  }
};

export default reducer;
