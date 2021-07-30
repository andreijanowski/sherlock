import { FETCH_PLANS_REQUEST } from "types/plans";

const STRIPE_PRODUCT_ID = "sherlock";

export const fetchPlans = (page = 1) => ({
  type: FETCH_PLANS_REQUEST,
  payload: {
    endpoint: `/api/v1/stripe_products/${STRIPE_PRODUCT_ID}/stripe_plans`,
    params: {
      per_page: 200,
      page
    }
  },
  meta: { thunk: true }
});
