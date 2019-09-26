export const normalizePrice = value => {
  if (!String(value)) return value;
  const onlyNums = String(value).replace(/[^\d]/g, "");
  return String((Number(onlyNums) / 100).toFixed(2));
};

export const normalizePhone = value => {
  if (!value) return value;
  return value.replace(/[^\d]/g, "");
};
