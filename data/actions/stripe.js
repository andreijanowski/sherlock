import { FETCH_STRIPE_PLANS_REQUEST } from "types/stripe";

export const fetchStripePlans = () => ({
  type: FETCH_STRIPE_PLANS_REQUEST,
  payload: {
    endpoint: "/api/v1/stripe_products/sherlock/stripe_plans"
  },
  meta: { thunk: true }
});
