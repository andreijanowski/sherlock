import {
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_BUSINESSES_REQUEST,
  FETCH_PROFILE_BUSINESS_REQUEST
} from "types/users";

export const fetchProfile = () => ({
  type: FETCH_PROFILE_REQUEST,
  payload: {
    endpoint: "/api/v1/users/me"
  },
  meta: { thunk: true }
});

export const fetchProfileBusinesses = () => ({
  type: FETCH_PROFILE_BUSINESSES_REQUEST,
  payload: {
    endpoint: "/api/v1/users/me/businesses"
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
