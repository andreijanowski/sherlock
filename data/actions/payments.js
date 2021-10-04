import { FETCH_BUSINESS_PAYMENTS_REQUEST } from "types/payments";

const PER_PAGE = 50;

export const fetchBusinessPayments = (
  businessId,
  page = 1,
  filter = { states: "finished" }
) => ({
  type: FETCH_BUSINESS_PAYMENTS_REQUEST,
  payload: {
    endpoint: `/api/v1/businesses/${businessId}/payments`,
    params: {
      per_page: PER_PAGE,
      sort: "-created_at",
      page,
      filter
    }
  },
  meta: { thunk: true, page }
});
