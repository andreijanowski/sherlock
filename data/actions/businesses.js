import {
  POST_BUSINESS_REQUEST,
  PATCH_BUSINESS_REQUEST,
  FETCH_BUSINESS_MEMBERS_REQUEST,
  FETCH_BUSINESS_DELIVERIES_REQUEST,
  FETCH_BUSINESS_DISHES_REQUEST,
  FETCH_BUSINESS_ORDERS_REQUEST,
  FETCH_BUSINESS_CATERINGS_REQUEST
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

export const fetchBusinessDishes = id => ({
  type: FETCH_BUSINESS_DISHES_REQUEST,
  payload: {
    endpoint: `/api/v1/businesses/${id}/dishes`,
    params: {
      per_page: 200,
      page: 1,
      include: "pictures"
    }
  },
  meta: { thunk: true }
});

export const fetchBusinessOrders = id => ({
  type: FETCH_BUSINESS_ORDERS_REQUEST,
  payload: {
    endpoint: `/api/v1/businesses/${id}/orders`,
    params: {
      per_page: 200,
      page: 1,
      include: "addresses,elements"
    }
  },
  meta: { thunk: true }
});

export const fetchBusinessCaterings = id => ({
  type: FETCH_BUSINESS_CATERINGS_REQUEST,
  payload: {
    endpoint: `/api/v1/businesses/${id}/caterings`,
    params: {
      per_page: 200,
      page: 1,
      include: "user,address"
    }
  },
  meta: { thunk: true }
});
