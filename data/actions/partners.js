import {
  CONNECT_PARTNER_REQUEST,
  FETCH_PARTNERS_REQUEST,
  PARTNERS_PREFERRED_ADD_REQUEST,
  PARTNERS_PREFERRED_DELETE_REQUEST,
  PARTNERS_PREFERRED_FETCH_REQUEST
} from "types/partners";

export const connectPartner = id => ({
  type: CONNECT_PARTNER_REQUEST,
  payload: {
    method: "PATCH",
    endpoint: `/api/v1/partners/${id}/connect`
  },
  meta: { thunk: true }
});

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

/**
 * @param {Object} config
 * @param {String} config.id
 * @param {Number} config.page
 * @param {Number} config.perPage
 * @param {String} config.sort
 */
export const fetchPreferredPartners = (payload = {}) => {
  const { filter = "", id = "", page = 1, perPage = 500, sort = "" } =
    payload || {};
  const params = { page, perPage };

  if (filter) {
    params["filter[category]"] = filter;
  }

  if (sort) {
    params.sort = sort;
  }

  return {
    meta: { thunk: true },
    payload: {
      endpoint: `/api/v1/businesses/${id}/preferred_partners`,
      params
    },
    type: PARTNERS_PREFERRED_FETCH_REQUEST
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
    meta: { thunk: true },
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
