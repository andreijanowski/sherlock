/* eslint-disable camelcase */

import {
  CONNECT_PARTNER_WITH_ORKESTRO_REQUEST,
  DISCONNECT_PARTNER_FROM_ORKESTRO_REQUEST,
  FETCH_BUSINESS_PARTNERSHIPS_REQUEST,
  CONNECT_PARTNER_WITH_UBER_EATS_REQUEST,
  DISCONNECT_PARTNER_FROM_UBER_EATS_REQUEST,
  UPLOAD_MENU_TO_UBER_EATS_REQUEST
} from "types/integrations";
import { getRelationships } from "./utils";

export const connectPartnerWithUberEats = values => {
  const { business_id, client_id, client_secret, store_id } = values;
  return {
    type: CONNECT_PARTNER_WITH_UBER_EATS_REQUEST,
    payload: {
      method: "POST",
      endpoint: `/api/v1/partner_integrations/uber_eats/connect`,
      data: {
        data: {
          type: "partner_integrations",
          relationships: getRelationships("business", business_id),
          attributes: {
            client_id,
            client_secret,
            store_id
          }
        }
      }
    },
    meta: { thunk: true }
  };
};

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

export const disconnectPartnerFromUberEats = id => ({
  type: DISCONNECT_PARTNER_FROM_UBER_EATS_REQUEST,
  payload: {
    method: "DELETE",
    endpoint: `/api/v1/partner_integrations/uber_eats/disconnect`,
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

export const uploadMenuToUberEats = id => ({
  type: UPLOAD_MENU_TO_UBER_EATS_REQUEST,
  payload: {
    method: "POST",
    endpoint: `/api/v1/partner_integrations/uber_eats/upload_menu`,
    data: {
      data: {
        type: "partner_integrations",
        relationships: getRelationships("business", id)
      }
    }
  },
  meta: { thunk: true }
});
