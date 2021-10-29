import * as moment from "moment";

const HOURS_NOW_EDGE = 1;

export const getRandomInt = (min, max) => {
  const minimum = Math.ceil(min);
  const maximum = Math.floor(max);
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
};

export const randomChartGenerator = (isPaymentChart = false) => {
  const months = moment.monthsShort();
  const paymentTypes = ["cash", "CB", "other"];
  const arr = isPaymentChart ? paymentTypes : months;
  const sampleData = [];
  let index = 0;
  arr.forEach(month => {
    sampleData.push({
      id: index,
      name: month,
      value: getRandomInt(220, 300),
      uv: getRandomInt(220, 300),
      pv: getRandomInt(220, 400)
    });
    index += 1;
  });

  return sampleData;
};

export const getPercentageStats = (baseCount, comparedCount) => {
  const isDown = baseCount < comparedCount;

  const result = {
    isDown,
    percentage: 0
  };

  if (baseCount && comparedCount) {
    result.percentage = Math.round(
      Math.abs(1 - baseCount / comparedCount) * 100
    );
  }

  return result;
};

export const getSalesItemData = salesItem => {
  const name = salesItem.getIn(["attributes", "name"]);
  const orderedTimes = salesItem.getIn([
    "attributes",
    "orderedUnitsCountCurrent"
  ]);

  const comparedOrderedTimes = salesItem.getIn([
    "attributes",
    "orderedUnitsCountPrevious"
  ]);

  const { isDown, percentage } = getPercentageStats(
    orderedTimes,
    comparedOrderedTimes
  );

  return {
    name,
    orderedTimes,
    isDown,
    percentage
  };
};

export const getStreamItemData = (streamItem, t) => {
  const state = streamItem.getIn(["attributes", "state"]);
  const updatedAt = streamItem.getIn(["attributes", "updatedAt"]);
  const badgeNumber = streamItem.getIn(["attributes", "shortId"]);

  const hoursDiff = moment().diff(updatedAt, "hour");
  const time =
    hoursDiff < HOURS_NOW_EDGE
      ? t("changedNow")
      : t("changedHoursAgo", { count: hoursDiff });

  return {
    status: t(`lefood:${state}`),
    time,
    badgeNumber
  };
};

export const getDropdownLabel = (t, comparisonPeriod) => {
  switch (comparisonPeriod) {
    case "month":
      return t("thisMonthVS");
    case "quarter":
      return t("thisQuarterVS");
    case "year":
      return t("thisYearVS");
    default:
      return t("todayVS");
  }
};

export const getComparedDataKeys = comparisonPeriod => {
  switch (comparisonPeriod) {
    case "month":
      return {
        current: "thisMonth",
        previous: "previousMonth"
      };

    case "quarter":
      return {
        current: "thisQuarter",
        previous: "previousQuarter"
      };
    case "year":
      return {
        current: "thisYear",
        previous: "previousYear"
      };

    default:
      return {
        current: "today",
        previous: "yesterday"
      };
  }
};
