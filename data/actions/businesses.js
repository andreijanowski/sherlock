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
  FETCH_BUSINESS_SETUP_INTENT_REQUEST,
  FETCH_BUSINESS_SERVICE_LINKS_REQUEST,
  FETCH_BUSINESS_CARDS_REQUEST,
  FETCH_BUSINESS_SUBSCRIPTIONS_REQUEST,
  FETCH_BUSINESS_CLIENTS_REQUEST,
  FETCH_AVG_TICKET_SIZE_REQUEST,
  FETCH_TODAYS_EARNINGS_REQUEST,
  FETCH_REVENUE_BREAKDOWN_REQUEST,
  FETCH_BEST_SALES_REQUEST,
  FETCH_WORST_SALES_REQUEST,
  FETCH_LIVE_STREAM_REQUEST,
  FETCH_DOWNLOAD_POS_MENU_REQUEST,
  POST_UPLOAD_POS_MENU_REQUEST,
  FETCH_BUSINESS_FAVORITE_SUPPLIERS_REQUEST,
  FETCH_BUSINESS_SUPPLIER_ORDERS_HISTORY_REQUEST
} from "types/businesses";

const PER_PAGE = 200;
const SALES_PER_PAGE = 25;
const LIVE_STREAM_PER_PAGE = 50;

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
      per_page: PER_PAGE,
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
      per_page: PER_PAGE,
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
      per_page: PER_PAGE,
      page,
      include: "pictures,category,dish_option_categories.dish_options"
    }
  },
  meta: { thunk: true, page }
});

export const fetchBusinessOrders = (id, page = 1) => ({
  type: FETCH_BUSINESS_ORDERS_REQUEST,
  payload: {
    endpoint: `/api/v1/businesses/${id}/orders`,
    params: {
      per_page: PER_PAGE,
      page,
      filter: {
        states:
          "waiting_for_approval,waiting_for_payment,paid,in_preparation,in_delivery"
      },
      include: "addresses,elements,elements.element_options"
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
      include: "addresses,elements,elements.element_options",
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
      per_page: PER_PAGE,
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
      per_page: PER_PAGE,
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
      per_page: PER_PAGE,
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
  endDate = moment({ h: 0, m: 0, s: 0, ms: 0 }).add(1, "y").toISOString(),
  from = 0,
  to = 86400
) => ({
  type: FETCH_BUSINESS_RESERVATIONS_REQUEST,
  payload: {
    endpoint: `/api/v1/businesses/${id}/reservations`,
    params: {
      per_page: PER_PAGE,
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
      per_page: PER_PAGE,
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

export const fetchBusinessServiceLinks = (id, page = 1) => ({
  type: FETCH_BUSINESS_SERVICE_LINKS_REQUEST,
  payload: {
    method: "GET",
    endpoint: `/api/v1/businesses/${id}/external_service_links`,
    params: {
      per_page: PER_PAGE,
      page
    }
  },
  meta: { thunk: true }
});

export const fetchBusinessCards = (id, page = 1) => ({
  type: FETCH_BUSINESS_CARDS_REQUEST,
  payload: {
    endpoint: `/api/v1/businesses/${id}/cards`,
    params: { per_page: PER_PAGE, page }
  },
  meta: { thunk: true, page }
});

export const fetchBusinessSubscriptions = (id, page = 1) => ({
  type: FETCH_BUSINESS_SUBSCRIPTIONS_REQUEST,
  payload: {
    endpoint: `/api/v1/businesses/${id}/subscriptions`,
    params: { per_page: PER_PAGE, page, "filter[scope]": "not_terminated" }
  },
  meta: { thunk: true }
});

export const fetchBusinessClients = (id, page = 1, search) => ({
  type: FETCH_BUSINESS_CLIENTS_REQUEST,
  payload: {
    endpoint: `/api/v1/businesses/${id}/clients`,
    params: { per_page: PER_PAGE, page, search }
  },
  meta: { thunk: true, page }
});

export const fetchAvgTicketSize = id => ({
  type: FETCH_AVG_TICKET_SIZE_REQUEST,
  payload: {
    method: "GET",
    endpoint: `/api/v1/businesses/${id}/dashboard/average_ticket_size`
  },
  meta: { thunk: true }
});

export const fetchTodaysEarnings = id => ({
  type: FETCH_TODAYS_EARNINGS_REQUEST,
  payload: {
    method: "GET",
    endpoint: `/api/v1/businesses/${id}/dashboard/earnings`
  },
  meta: { thunk: true }
});

export const fetchRevenueBreakdown = id => ({
  type: FETCH_REVENUE_BREAKDOWN_REQUEST,
  payload: {
    method: "GET",
    endpoint: `/api/v1/businesses/${id}/dashboard/revenue_breakdown`
  },
  meta: { thunk: true }
});

export const fetchBestSales = (id, comparison, page = 1) => ({
  type: FETCH_BEST_SALES_REQUEST,
  payload: {
    method: "GET",
    endpoint: `/api/v1/businesses/${id}/dashboard/best_sales`,
    params: {
      per_page: SALES_PER_PAGE,
      comparison,
      page
    }
  },
  meta: { thunk: true, page }
});

export const fetchWorstSales = (id, comparison, page = 1) => ({
  type: FETCH_WORST_SALES_REQUEST,
  payload: {
    method: "GET",
    endpoint: `/api/v1/businesses/${id}/dashboard/worst_sales`,
    params: {
      per_page: SALES_PER_PAGE,
      comparison,
      page
    }
  },
  meta: { thunk: true, page }
});

export const fetchLiveStream = (id, page = 1) => ({
  type: FETCH_LIVE_STREAM_REQUEST,
  payload: {
    method: "GET",
    endpoint: `/api/v1/businesses/${id}/orders`,
    params: {
      per_page: LIVE_STREAM_PER_PAGE,
      page,
      include: "addresses,elements,elements.element_options",
      filter: {
        day: moment.utc().format("YYYY-MM-DD")
      },
      sort: "-updated_at"
    }
  },
  meta: { thunk: true, page }
});

export const downloadPOSMenu = id => ({
  type: FETCH_DOWNLOAD_POS_MENU_REQUEST,
  payload: {
    method: "GET",
    endpoint: `/api/v1/businesses/${id}/hubrise/download_catalog`
  },
  meta: { thunk: true, id }
});

export const uploadPOSMenu = id => ({
  type: POST_UPLOAD_POS_MENU_REQUEST,
  payload: {
    method: "POST",
    endpoint: `/api/v1/businesses/${id}/hubrise/upload_catalog`
  },
  meta: { thunk: true, id }
});

export const fetchBusinessFavoriteSuppliers = (id, page = 1) => ({
  type: FETCH_BUSINESS_FAVORITE_SUPPLIERS_REQUEST,
  payload: {
    method: "GET",
    endpoint: `/api/v1/businesses/${id}/favorite_suppliers`,
    params: {
      per_page: PER_PAGE,
      page
    }
  },
  meta: { thunk: true, page }
});

export const fetchBusinessSupplierOrdersHistory = (
  id,
  page = 1,
  filter = {}
) => ({
  type: FETCH_BUSINESS_SUPPLIER_ORDERS_HISTORY_REQUEST,
  payload: {
    endpoint: `/api/v1/businesses/${id}/supplier_orders`,
    params: {
      per_page: 15,
      page,
      include: "supplier_elements,supplier_products,supplier",
      sort: "-createdAt",
      filter
    }
  },
  meta: { thunk: true, page }
});
