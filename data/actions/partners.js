import { FETCH_PARTNERS_REQUEST } from "types/partners";

export const fetchPartners = (page = 1) => ({
  type: FETCH_PARTNERS_REQUEST,
  payload: {
    endpoint: "/api/v1/partners",
    params: {
      page,
      per_page: 200
    }
  },
  meta: { thunk: true }
});
