import {
  CONNECT_PARTNER_REQUEST,
  FETCH_PARTNERS_REQUEST
} from "types/partners";

export const fetchPartners = (id, page = 1) => ({
  type: FETCH_PARTNERS_REQUEST,
  payload: {
    endpoint: "/api/v1/partners",
    params: {
      business_uuid: id,
      include: "users",
      per_page: 500,
      page
    }
  },
  meta: { thunk: true }
});

export const connectPartner = id => ({
  type: CONNECT_PARTNER_REQUEST,
  payload: {
    method: "PATCH",
    endpoint: `api/v1/partners/${id}/connect`
  },
  meta: { thunk: true }
});
