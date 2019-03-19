export const normalizePrice = value => {
  if (!value) return value;
  const onlyNums = value.replace(/[^\d]/g, "");
  return String((Number(onlyNums) / 100).toFixed(2));
};