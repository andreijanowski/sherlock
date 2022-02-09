/* eslint-disable no-param-reassign */
import { Record, Map, fromJS } from "immutable";
import {
  FETCH_REVENUE_BREAKDOWN_REQUEST,
  FETCH_AVG_TICKET_SIZE_REQUEST,
  FETCH_TODAYS_EARNINGS_REQUEST,
  FETCH_BEST_SALES_REQUEST,
  FETCH_WORST_SALES_REQUEST,
  FETCH_LIVE_STREAM_REQUEST,
  FETCH_AVG_TICKET_SIZE_SUCCESS,
  FETCH_REVENUE_BREAKDOWN_SUCCESS,
  FETCH_TODAYS_EARNINGS_SUCCESS,
  FETCH_BEST_SALES_SUCCESS,
  FETCH_WORST_SALES_SUCCESS,
  FETCH_LIVE_STREAM_SUCCESS
} from "types/businesses";
import { mergeOrdersData } from "sections/lefood/utils";

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

export const TODAY_EARNINGS_PATH = ["data", "dashboard", "earnings"];

export const REVENUE_BREAKDOWN_PATH = ["data", "dashboard", "revenueBreakdown"];

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
    case FETCH_WORST_SALES_REQUEST:
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
        sumPreviousMonth,
        sumThisMonth,
        sumThisQuarter,
        sumPreviousQuarter,
        sumPreviousYear,
        sumThisYear
      } = payload.rawData.data.attributes;

      newState = newState.mergeIn(
        TODAY_EARNINGS_PATH,
        fromJS({
          today: sumToday,
          yesterday: sumYesterday,
          thisMonth: sumThisMonth,
          previousMonth: sumPreviousMonth,
          thisQuarter: sumThisQuarter,
          previousQuarter: sumPreviousQuarter,
          thisYear: sumThisYear,
          previousYear: sumPreviousYear
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

      const prepareRevenue = ({
        sumPreviousMonth,
        sumPreviousQuarter,
        sumPreviousYear,
        sumThisMonth,
        sumThisQuarter,
        sumThisYear,
        sumToday,
        sumYesterday
      }) => ({
        today: sumToday,
        yesterday: sumYesterday,
        thisMonth: sumThisMonth,
        previousMonth: sumPreviousMonth,
        thisQuarter: sumThisQuarter,
        previousQuarter: sumPreviousQuarter,
        thisYear: sumThisYear,
        previousYear: sumPreviousYear
      });

      const {
        revenue,
        onSiteRevenue,
        deliveryRevenue,
        takeawayRevenue,
        otherRevenue
      } = payload.rawData.data.attributes;

      newState = newState.mergeIn(
        REVENUE_BREAKDOWN_PATH,
        fromJS({
          revenue: prepareRevenue(revenue),
          onSiteRevenue: prepareRevenue(onSiteRevenue),
          deliveryRevenue: prepareRevenue(deliveryRevenue),
          takeawayRevenue: prepareRevenue(takeawayRevenue),
          otherRevenue: prepareRevenue(otherRevenue)
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
        averagePreviousMonth,
        averagePreviousQuarter,
        averagePreviousYear,
        averageThisMonth,
        averageThisQuarter,
        averageThisYear,
        averageToday,
        averageYesterday
      } = payload.rawData.data.attributes;

      newState = newState.mergeIn(
        ["data", "dashboard", "ticket"],
        fromJS({
          today: averageToday,
          yesterday: averageYesterday,
          thisMonth: averageThisMonth,
          previousMonth: averagePreviousMonth,
          thisQuarter: averageThisQuarter,
          previousQuarter: averagePreviousQuarter,
          thisYear: averageThisYear,
          previousYear: averagePreviousYear
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
      let newState = state.merge(
        Record({
          isFetching: false,
          isFailed: false,
          isSucceeded: true
        })()
      );
      const immutablePayload = fromJS(payload);
      const totalPages = immutablePayload.getIn([
        "rawData",
        "meta",
        "totalPages"
      ]);

      const preparedOrdersData = mergeOrdersData(
        immutablePayload.getIn(["rawData", "data"]),
        immutablePayload.getIn(["data", "elements"]),
        immutablePayload.getIn(["data", "addresses"]),
        immutablePayload.getIn(["data", "elementOptions"])
      );

      if (meta.page === 1) {
        newState = newState
          .setIn(LIVE_STREAM_DATA_PATH, preparedOrdersData)
          .setIn(LIVE_STREAM_TOTAL_PAGES_PATH, totalPages);
      } else {
        newState = newState.mergeIn(LIVE_STREAM_DATA_PATH, preparedOrdersData);
      }
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default reducer;
