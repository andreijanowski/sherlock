export const convertToCents = price => Math.round(Number(price) * 100);

export const parseCentsPriceToDottedFormat = (cents, currency) => {
  const formatted = cents / 100;
  const locale = process.env.NODE_ENV === "test" ? "en-GB" : undefined;

  return formatted.toLocaleString(locale, { style: "currency", currency });
};
