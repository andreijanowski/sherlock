import {
  CONNECT_WHOLESALER_REQUEST,
  FETCH_WHOLESALERS_REQUEST
} from "types/wholesalers";

export const fetchWholesalers = (page = 1) => ({
  type: FETCH_WHOLESALERS_REQUEST,
  payload: {
    endpoint: "/api/v1/partners/wholesalers",
    params: {
      include: "users",
      page,
      per_page: 200
    }
  },
  meta: { thunk: true }
});

export const connectWholesaler = id => ({
  type: CONNECT_WHOLESALER_REQUEST,
  payload: {
    method: "PATCH",
    endpoint: `api/v1/partners/${id}/connect`
  },
  meta: { thunk: true }
});
