import {
  POST_BUSINESS_REQUEST,
  PATCH_BUSINESS_REQUEST,
  FETCH_BUSINESS_MEMBERS_REQUEST,
  FETCH_BUSINESS_DELIVERIES_REQUEST,
  FETCH_BUSINESS_DISHES_REQUEST,
  FETCH_BUSINESS_ORDERS_REQUEST,
  FETCH_BUSINESS_CATERINGS_REQUEST,
  FETCH_BUSINESS_PRIVATISATIONS_REQUEST
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

export const fetchBusinessMembers = (id, page = 1) => ({
  type: FETCH_BUSINESS_MEMBERS_REQUEST,
  payload: {
    endpoint: `/api/v1/businesses/${id}/members`,
    params: {
      per_page: 200,
      page
    }
  },
  meta: { thunk: true, page }
});

export const fetchBusinessDeliveries = (id, page = 1) => ({
  type: FETCH_BUSINESS_DELIVERIES_REQUEST,
  payload: {
    endpoint: `/api/v1/businesses/${id}/deliveries`,
    params: {
      per_page: 200,
      page
    }
  },
  meta: { thunk: true, page }
});

export const fetchBusinessDishes = (id, page = 1) => ({
  type: FETCH_BUSINESS_DISHES_REQUEST,
  payload: {
    endpoint: `/api/v1/businesses/${id}/dishes`,
    params: {
      per_page: 200,
      page,
      include: "pictures"
    }
  },
  meta: { thunk: true, page }
});

export const fetchBusinessOrders = (id, page = 1) => ({
  type: FETCH_BUSINESS_ORDERS_REQUEST,
  payload: {
    endpoint: `/api/v1/businesses/${id}/orders`,
    params: {
      per_page: 200,
      page,
      filter: {
        states:
          "waiting_for_approval,waiting_for_payment,paid,in_preparation,in_delivery"
      },
      include: "addresses,elements"
    }
  },
  meta: { thunk: true, page }
});

export const fetchBusinessCaterings = (id, page = 1) => ({
  type: FETCH_BUSINESS_CATERINGS_REQUEST,
  payload: {
    endpoint: `/api/v1/businesses/${id}/caterings`,
    params: {
      per_page: 200,
      page,
      include: "user,address"
    }
  },
  meta: { thunk: true, page }
});

export const fetchBusinessPrivatisations = (id, page = 1) => ({
  type: FETCH_BUSINESS_PRIVATISATIONS_REQUEST,
  payload: {
    endpoint: `/api/v1/businesses/${id}/privatisations`,
    params: {
      per_page: 200,
      page,
      include: "user,address"
    }
  },
  meta: { thunk: true, page }
});
