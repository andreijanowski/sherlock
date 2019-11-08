import {
  PATH_CHANGED,
  SET_CURRENT_BUSINESS,
  SET_CURRENT_USER_ID,
  SET_ORDERS_BADGE_NUMBER,
  SET_RESERVATIONS_BADGE_NUMBER
} from "types/app";

export const pathChanged = path => ({
  type: PATH_CHANGED,
  payload: { path }
});

export const setCurrentBusiness = id => ({
  type: SET_CURRENT_BUSINESS,
  payload: {
    id
  }
});

export const saveCurrentUserId = id => ({
  type: SET_CURRENT_USER_ID,
  payload: {
    id
  }
});

export const setOrdersUpdates = number => ({
  type: SET_ORDERS_BADGE_NUMBER,
  payload: {
    number
  }
});

export const setReservationsUpdates = number => ({
  type: SET_RESERVATIONS_BADGE_NUMBER,
  payload: {
    number
  }
});
