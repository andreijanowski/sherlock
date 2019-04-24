import cc from "currency-codes";

const currencies = cc.codes().map(c => ({
  value: c,
  label: c
}));

export default currencies;
