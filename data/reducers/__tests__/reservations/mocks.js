/* eslint-disable no-param-reassign */
import {
  FETCH_BUSINESS_RESERVATIONS_REQUEST,
  FETCH_BUSINESS_RESERVATIONS_SUCCESS,
  FETCH_BUSINESS_RESERVATIONS_FAIL
} from "types/businesses";
import {
  FETCH_RESERVATION_SUCCESS,
  POST_RESERVATION_SUCCESS,
  PATCH_RESERVATION_SUCCESS,
  DELETE_RESERVATION_REQUEST,
  SET_EDIT_RESERVATION
} from "types/reservations";
import { LOGOUT } from "types/auth";

export const fetchReservationsRequestAction = () => ({
  type: FETCH_BUSINESS_RESERVATIONS_REQUEST
});

export const fetchReservationsSuccessAction = ({ page }) =>
  page === 1
    ? {
        type: FETCH_BUSINESS_RESERVATIONS_SUCCESS,
        payload: {
          data: {
            reservations: {
              "38773cb9-44ce-4521-8abf-932da26f22ac": {
                id: "38773cb9-44ce-4521-8abf-932da26f22ac"
              },
              "7b4fe06d-22db-499c-a459-b2245c84ee30": {
                id: "7b4fe06d-22db-499c-a459-b2245c84ee30"
              },
              "57499f23-6439-4c91-99d0-6ecc78eb3bc1": {
                id: "57499f23-6439-4c91-99d0-6ecc78eb3bc1"
              },
              "b5a7a8e4-a098-4537-af06-4f3976ba9d90": {
                id: "b5a7a8e4-a098-4537-af06-4f3976ba9d90"
              }
            }
          }
        },
        meta: {
          page: 1
        }
      }
    : {
        type: FETCH_BUSINESS_RESERVATIONS_SUCCESS,
        payload: {
          data: {
            reservations: {
              "d88079a6-7178-4a70-8be0-5c01ac4e2b29": {
                id: "d88079a6-7178-4a70-8be0-5c01ac4e2b29"
              },
              "9255a57d-997b-4cc6-946d-f909dd47e296": {
                id: "9255a57d-997b-4cc6-946d-f909dd47e296"
              },
              "f6492044-ea28-4ee3-8d8b-6b6aff87ae04": {
                id: "f6492044-ea28-4ee3-8d8b-6b6aff87ae04"
              }
            }
          }
        },
        meta: {
          page: 2
        }
      };

export const fetchReservationsFailAction = ({ page }) => ({
  type: FETCH_BUSINESS_RESERVATIONS_FAIL,
  meta: { page }
});

export const fetchReservationSuccessAction = () => ({
  type: FETCH_RESERVATION_SUCCESS,
  payload: {
    data: {
      reservations: {
        "e88079a6-7178-4a70-8be0-5c01ac4e2b29": {
          id: "e88079a6-7178-4a70-8be0-5c01ac4e2b29",
          attributes: {
            state: "placed"
          }
        }
      }
    }
  }
});

export const postReservationSuccessAction = () => ({
  type: POST_RESERVATION_SUCCESS,
  payload: {
    data: {
      reservations: {
        "new-unique-uuid": {
          id: "new-unique-uuid",
          attributes: {
            state: "placed"
          }
        }
      }
    },
    rawData: {
      data: {
        id: "new-unique-uuid"
      }
    }
  }
});

export const patchReservationSuccessAction = () => ({
  type: PATCH_RESERVATION_SUCCESS,
  payload: {
    data: {
      reservations: {
        "e88079a6-7178-4a70-8be0-5c01ac4e2b29": {
          id: "e88079a6-7178-4a70-8be0-5c01ac4e2b29",
          attributes: {
            state: "booked"
          }
        }
      }
    },
    rawData: {
      data: {
        id: "e88079a6-7178-4a70-8be0-5c01ac4e2b29"
      }
    }
  }
});

export const deleteReservationRequestAction = id => ({
  type: DELETE_RESERVATION_REQUEST,
  meta: {
    id
  }
});

export const setEditReservationAction = () => ({
  type: SET_EDIT_RESERVATION,
  payload: {
    editedReservation: {
      id: "1425c9aa-bb01-4586-9f14-82ea569d3ad8",
      type: "reservations",
      attributes: {}
    }
  }
});

export const logoutAction = () => ({
  type: LOGOUT
});
