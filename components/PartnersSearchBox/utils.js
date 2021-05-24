import { WHOLESALERS_CATEGORY } from "consts";

export const getPartnersFilter = (isWholesalers, category) => {
  if (isWholesalers) {
    const baseFilter = {
      categories: ["wholesaler"]
    };
    if (category === WHOLESALERS_CATEGORY.PREFERRED) {
      return {
        ...baseFilter,
        preferred: true
      };
    }
    return {
      ...baseFilter,
      wholesaler_categories: [category]
    };
  }
  return {
    categories: [category],
    excluded_categories: ["wholesaler"]
  };
};
