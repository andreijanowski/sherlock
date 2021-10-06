/* eslint-disable no-param-reassign */
import {
  FETCH_AVG_TICKET_SIZE_SUCCESS,
  FETCH_AVG_TICKET_SIZE_REQUEST
} from "types/businesses";
import { Record, Map, fromJS } from "immutable";
import {
  FETCH_REVENUE_BREAKDOWN_SUCCESS,
  FETCH_TODAYS_EARNINGS_REQUEST,
  FETCH_TODAYS_EARNINGS_SUCCESS
} from "../types/businesses";

export const initialState = Record({
  data: Map(),
  isFetching: false,
  isFailed: false,
  isSucceeded: false
})();

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_TODAYS_EARNINGS_REQUEST:
    case FETCH_AVG_TICKET_SIZE_REQUEST: {
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

    default: {
      return state;
    }
  }
};

export default reducer;
