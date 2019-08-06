import {
  POST_RESERVATION_REQUEST,
  PATCH_RESERVATION_REQUEST,
  DELETE_RESERVATION_REQUEST,
  SET_EDIT_RESERVATION
} from "types/reservations";
import { getRelationships } from "./utils";

export const postReservation = (id, values) => ({
  type: POST_RESERVATION_REQUEST,
  payload: {
    method: "POST",
    endpoint: `/api/v1/reservations`,
    data: {
      data: {
        type: "reservations",
        attributes: {
          ...values
        },
        relationships: getRelationships("business", id)
      }
    }
  },
  meta: { thunk: true }
});

export const patchReservation = (id, values) => ({
  type: PATCH_RESERVATION_REQUEST,
  payload: {
    method: "PATCH",
    endpoint: `/api/v1/reservations/${id}`,
    data: {
      data: {
        id,
        type: "reservations",
        attributes: {
          ...values
        }
      }
    }
  },
  meta: { thunk: true }
});

export const deleteReservation = id => ({
  type: DELETE_RESERVATION_REQUEST,
  payload: {
    method: "DELETE",
    endpoint: `/api/v1/reservations/${id}`
  },
  meta: { thunk: true, id }
});

export const setReservationForEditing = editedReservation => ({
  type: SET_EDIT_RESERVATION,
  payload: {
    editedReservation
  }
});
