export const normalizePrice = value => {
  if (!String(value)) return value;
  const onlyNums = String(value).replace(/[^\d]/g, "");
  return String((Number(onlyNums) / 100).toFixed(2));
};
