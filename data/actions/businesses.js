import moment from "moment";
import {
  POST_BUSINESS_REQUEST,
  PATCH_BUSINESS_REQUEST,
  FETCH_BUSINESS_MEMBERS_REQUEST,
  FETCH_BUSINESS_DELIVERIES_REQUEST,
  FETCH_BUSINESS_DISHES_REQUEST,
  FETCH_BUSINESS_ORDERS_REQUEST,
  FETCH_BUSINESS_ORDERS_HISTORY_REQUEST,
  FETCH_BUSINESS_CATERINGS_REQUEST,
  FETCH_BUSINESS_PRIVATISATIONS_REQUEST,
  FETCH_BUSINESS_TABLES_REQUEST,
  FETCH_BUSINESS_RESERVATIONS_REQUEST,
  FETCH_BUSINESS_WIDGETS_REQUEST,
  FETCH_BUSINESS_SETUP_INTENT_REQUEST
} from "types/businesses";

export const postBusiness = onSuccess => ({
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
  meta: { thunk: true, onSuccess }
});

export const patchBusiness = (id, values, updateImmediatly) => ({
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
    updateImmediatly,
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
      include: "pictures,category"
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

export const fetchBusinessOrdersHistory = (id, page = 1, filter = {}) => ({
  type: FETCH_BUSINESS_ORDERS_HISTORY_REQUEST,
  payload: {
    endpoint: `/api/v1/businesses/${id}/orders`,
    params: {
      per_page: 15,
      page,
      include: "addresses,elements",
      sort: "-placed_at",
      filter
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

export const fetchBusinessTables = (id, page = 1) => ({
  type: FETCH_BUSINESS_TABLES_REQUEST,
  payload: {
    endpoint: `/api/v1/businesses/${id}/tables`,
    params: {
      per_page: 200,
      page
    }
  },
  meta: { thunk: true, page }
});

export const fetchBusinessReservations = (
  id,
  page = 1,
  startDate = moment({ h: 0, m: 0, s: 0, ms: 0 })
    .subtract(7, "d")
    .toISOString(),
  endDate = moment({ h: 0, m: 0, s: 0, ms: 0 })
    .add(1, "y")
    .toISOString(),
  from = 0,
  to = 86400
) => ({
  type: FETCH_BUSINESS_RESERVATIONS_REQUEST,
  payload: {
    endpoint: `/api/v1/businesses/${id}/reservations`,
    params: {
      per_page: 200,
      page,
      include: "user,bookings,tables",
      filter: { start_date: startDate, end_date: endDate, from, to }
    }
  },
  meta: { thunk: true, page }
});

export const fetchBusinessWidgets = (id, page = 1) => ({
  type: FETCH_BUSINESS_WIDGETS_REQUEST,
  payload: {
    endpoint: `/api/v1/businesses/${id}/widgets`,
    params: {
      per_page: 200,
      page
    }
  },
  meta: { thunk: true, page }
});

export const fetchBusinessSetupIntent = id => ({
  type: FETCH_BUSINESS_SETUP_INTENT_REQUEST,
  payload: {
    endpoint: `/api/v1/businesses/${id}/setup_intent`,
    params: {
      purpose: "subscription"
    }
  },
  meta: { thunk: true }
});
