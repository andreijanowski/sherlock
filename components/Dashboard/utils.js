import * as moment from "moment";

import { capitalize } from "utils/strings";

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

export const scrollToNextItem = ref => {
  if (ref.current) {
    ref.current.scrollBy(0, 92);
  }
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

export const getSalesItemData = (salesItem, comparisonPeriod) => {
  const name = salesItem.getIn(["attributes", "name"]);
  const orderedTimes = salesItem.getIn([
    "attributes",
    "orderedUnitsCountToday"
  ]);

  const comparedOrderedTimes = salesItem.getIn([
    "attributes",
    `orderedUnitsCount${capitalize(comparisonPeriod)}`
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
