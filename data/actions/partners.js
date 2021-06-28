import {
  CONNECT_PARTNER_REQUEST,
  DISCONNECT_PARTNER_REQUEST,
  FETCH_PARTNERS_REQUEST,
  PARTNERS_PREFERRED_ADD_REQUEST,
  PARTNERS_PREFERRED_DELETE_REQUEST
} from "types/partners";

export const connectPartner = id => ({
  type: CONNECT_PARTNER_REQUEST,
  payload: {
    method: "PATCH",
    endpoint: `/api/v1/partners/${id}/connect`
  },
  meta: { thunk: true, id }
});

export const disconnectPartner = id => ({
  type: DISCONNECT_PARTNER_REQUEST,
  payload: {
    method: "DELETE",
    endpoint: `/api/v1/partners/${id}/disconnect`
  },
  meta: { thunk: true, id }
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
