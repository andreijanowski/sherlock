import {
  CONNECT_PARTNER_REQUEST,
  DISCONNECT_PARTNER_REQUEST,
  FETCH_PARTNERS_REQUEST,
  PARTNERS_PREFERRED_ADD_REQUEST,
  PARTNERS_PREFERRED_DELETE_REQUEST,
  FETCH_PARTNERS_AVAILABLE_REQUEST,
  CREATE_PARTNER_CLICK_EVENT_REQUEST
} from "types/partners";
import { getRelationships } from "./utils";

export const connectIntegrationPartner = (
  businessId,
  partnerId,
  attributes
) => ({
  type: CONNECT_PARTNER_REQUEST,
  payload: {
    method: "POST",
    endpoint: `/api/v1/partner_integrations/connect`,
    data: {
      data: {
        type: "partner_integrations",
        attributes,
        relationships: {
          ...getRelationships("business", businessId),
          ...getRelationships("partner", partnerId)
        }
      }
    }
  },
  meta: { thunk: true, partnerId }
});

export const disconnectIntegrationPartner = (businessId, partnerId) => ({
  type: DISCONNECT_PARTNER_REQUEST,
  payload: {
    method: "DELETE",
    endpoint: `/api/v1/partner_integrations/disconnect`,
    data: {
      data: {
        type: "partner_integrations",
        relationships: {
          ...getRelationships("business", businessId),
          ...getRelationships("partner", partnerId)
        }
      }
    }
  },
  meta: { thunk: true, partnerId }
});

export const fetchPartners = config => {
  const { businessId, filter, search, merge, page } = config;
  return {
    type: FETCH_PARTNERS_REQUEST,
    payload: {
      endpoint: "/api/v1/partners",
      params: {
        per_page: 50,
        business_uuid: businessId,
        filter,
        search,
        page
      }
    },
    meta: { thunk: true, merge, config }
  };
};

export const fetchAvailablePartners = config => {
  const { filter, search, merge, page } = config;
  return {
    type: FETCH_PARTNERS_AVAILABLE_REQUEST,
    payload: {
      endpoint: "/api/v1/partners/available",
      params: {
        per_page: 12,
        filter,
        search,
        page
      }
    },
    meta: { thunk: true, merge, config }
  };
};

/**
 * @param {Object} config
 * @param {String} config.businessId
 * @param {Boolean} config.isDelete
 * @param {String} config.partnerId
 */
export const preferredAdd = (config = {}) => {
  const { businessId = "", isDelete = false, partnerId = "" } = config;

  return {
    meta: { thunk: true, partnerId },
    payload: {
      data: {
        data: {
          relationships: {
            business: {
              data: {
                id: businessId,
                type: "business"
              }
            },
            partner: {
              data: {
                id: partnerId,
                type: "partner"
              }
            }
          },
          type: "partners"
        }
      },
      endpoint: "/api/v1/preferred_partners",
      method: isDelete ? "DELETE" : "POST"
    },
    type: isDelete
      ? PARTNERS_PREFERRED_DELETE_REQUEST
      : PARTNERS_PREFERRED_ADD_REQUEST
  };
};

export const createPartnerClickEvent = (partnerId, attributes) => ({
  type: CREATE_PARTNER_CLICK_EVENT_REQUEST,
  payload: {
    method: "POST",
    endpoint: `/api/v1/partners/${partnerId}/click_event`,
    data: {
      data: {
        type: "partner_click_events",
        attributes,
        relationships: {
          ...getRelationships("partner", partnerId)
        },
        id: partnerId
      }
    }
  },
  meta: { thunk: true, partnerId }
});
