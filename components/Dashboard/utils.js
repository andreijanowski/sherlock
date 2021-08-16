import * as moment from "moment";

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
