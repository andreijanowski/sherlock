import { WHOLESALERS_CATEGORY } from "consts";

export const getPartnersFilter = (isWholesalers, category, business) => {
  const commonFilter = {
    country_codes: [business && business.getIn(["attributes", "countryCode"])]
  };

  if (isWholesalers) {
    const baseWholesalersFilter = {
      ...commonFilter,
      categories: ["wholesaler"]
    };
    if (category === WHOLESALERS_CATEGORY.PREFERRED) {
      return {
        ...baseWholesalersFilter,
        preferred: true
      };
    }
    return {
      ...baseWholesalersFilter,
      wholesaler_categories: [category]
    };
  }
  return {
    ...commonFilter,
    categories: [category],
    excluded_categories: ["wholesaler"]
  };
};
