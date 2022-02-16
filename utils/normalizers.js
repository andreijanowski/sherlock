export const normalizePrice = value => {
  if (!String(value)) return value;
  const onlyNums = String(value).replace(/[^\d]/g, "");
  return String((Number(onlyNums) / 100).toFixed(2));
};

export const normalizePhone = value => {
  if (!value) return value;
  return value.replace(/[^\d]/g, "");
};

// we need this normalization to allow empty strings in onSubmit payload
// https://github.com/final-form/react-final-form/issues/130#issuecomment-425482365
export const normalizeString = v => v;
