import {
  POST_BUSINESS_REQUEST,
  PATCH_BUSINESS_REQUEST,
  FETCH_BUSINESS_MEMBERS_REQUEST,
  FETCH_BUSINESS_DELIVERIES_REQUEST
} from "types/businesses";

export const postBusiness = () => ({
  type: POST_BUSINESS_REQUEST,
  payload: {
    method: "POST",
    endpoint: `/api/v1/businesses`,
    data: {
      data: {
        type: "businesses"
      }
    }
  },
  meta: { thunk: true }
});

export const patchBusiness = (id, values) => ({
  type: PATCH_BUSINESS_REQUEST,
  payload: {
    method: "PATCH",
    endpoint: `/api/v1/businesses/${id}`,
    data: {
      data: {
        id,
        type: "businesses",
        attributes: {
          ...values
        }
      }
    }
  },
  meta: {
    thunk: true,
    updatedValues: Object.keys(values),
    timestamp: Date.now()
  }
});

export const fetchBusinessMembers = id => ({
  type: FETCH_BUSINESS_MEMBERS_REQUEST,
  payload: {
    endpoint: `/api/v1/businesses/${id}/members`,
    params: {
      per_page: 200,
      page: 1
    }
  },
  meta: { thunk: true }
});

export const fetchBusinessDeliveries = id => ({
  type: FETCH_BUSINESS_DELIVERIES_REQUEST,
  payload: {
    endpoint: `/api/v1/businesses/${id}/deliveries`,
    params: {
      per_page: 200,
      page: 1
    }
  },
  meta: { thunk: true }
});
