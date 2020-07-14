import { FETCH_WHOLESALERS_REQUEST } from "types/wholesalers";

export const fetchWholesalers = (page = 1) => ({
  type: FETCH_WHOLESALERS_REQUEST,
  payload: {
    endpoint: "/api/v1/partners",
    params: {
      page,
      per_page: 200
    }
  },
  meta: { thunk: true }
});
