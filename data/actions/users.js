import {
  FETCH_PROFILE_REQUEST,
  UPDATE_PROFILE_REQUEST,
  FETCH_PROFILE_BUSINESSES_REQUEST,
  FETCH_PROFILE_BUSINESS_REQUEST,
  SET_CURRENT_BUSINESS,
  FETCH_PROFILE_CARDS_REQUEST,
  FETCH_PROFILE_SUBSCRIPTIONS_REQUEST
} from "types/users";

export const fetchProfile = () => ({
  type: FETCH_PROFILE_REQUEST,
  payload: {
    endpoint: "/api/v1/users/me"
  },
  meta: {
    thunk: true,
    timestamp: Date.now()
  }
});

export const updateProfile = data => ({
  type: UPDATE_PROFILE_REQUEST,
  payload: {
    method: "PATCH",
    endpoint: "/api/v1/users/me",
    data: {
      data: {
        type: "users",
        attributes: {
          ...data
        }
      }
    }
  },
  meta: { thunk: true }
});

export const fetchProfileBusinesses = () => ({
  type: FETCH_PROFILE_BUSINESSES_REQUEST,
  payload: {
    endpoint: "/api/v1/users/me/businesses",
    params: { per_page: 200, page: 1 }
  },
  meta: { thunk: true }
});

export const fetchProfileBusiness = id => ({
  type: FETCH_PROFILE_BUSINESS_REQUEST,
  payload: {
    endpoint: `/api/v1/users/me/businesses/${id}`,
    params: {
      include:
        "addresses,groups,menus,open_periods,order_periods,orders,pictures,products"
    }
  },
  meta: { thunk: true }
});

export const setCurrentBusiness = id => ({
  type: SET_CURRENT_BUSINESS,
  payload: {
    rawData: {
      data: {
        id
      }
    }
  }
});

export const fetchProfileCards = () => ({
  type: FETCH_PROFILE_CARDS_REQUEST,
  payload: {
    endpoint: "/api/v1/users/me/cards",
    params: { per_page: 200, page: 1 }
  },
  meta: { thunk: true }
});

export const fetchProfileSubscriptions = () => ({
  type: FETCH_PROFILE_SUBSCRIPTIONS_REQUEST,
  payload: {
    endpoint: "/api/v1/users/me/subscriptions",
    params: { per_page: 200, page: 1 }
  },
  meta: { thunk: true }
});
