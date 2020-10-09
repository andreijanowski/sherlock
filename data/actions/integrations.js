import {
  CONNECT_PARTNER_WITH_ORKESTRO_REQUEST,
  DISCONNECT_PARTNER_FROM_ORKESTRO_REQUEST,
  FETCH_BUSINESS_PARTNERSHIPS_REQUEST
} from "types/integrations";
import { getRelationships } from "./utils";

export const connectPartnerWithOrkestro = id => ({
  type: CONNECT_PARTNER_WITH_ORKESTRO_REQUEST,
  payload: {
    method: "POST",
    endpoint: `/api/v1/partner_integrations/orkestro/connect`,
    data: {
      data: {
        type: "partner_integrations",
        relationships: getRelationships("business", id)
      }
    }
  },
  meta: { thunk: true }
});

export const disconnectPartnerFromOrkestro = id => ({
  type: DISCONNECT_PARTNER_FROM_ORKESTRO_REQUEST,
  payload: {
    method: "DELETE",
    endpoint: `/api/v1/partner_integrations/orkestro/disconnect`,
    data: {
      data: {
        type: "partner_integrations",
        relationships: getRelationships("business", id)
      }
    }
  },
  meta: { thunk: true }
});

export const fetchBusinessPartnerships = id => ({
  type: FETCH_BUSINESS_PARTNERSHIPS_REQUEST,
  payload: {
    endpoint: `/api/v1/users/me/businesses/${id}`,
    params: {
      include: "partners",
      page: 1,
      per_page: 200
    }
  },
  meta: { thunk: true }
});
