import {
  POST_RESERVATION_REQUEST,
  PATCH_RESERVATION_REQUEST,
  PATCH_RESERVATION_REJECT_REQUEST,
  PATCH_RESERVATION_CANCEL_REQUEST,
  DELETE_RESERVATION_REQUEST,
  FETCH_RESERVATION_REQUEST,
  SET_EDIT_RESERVATION,
  HANDLE_RESERVATION_UPDATE
} from "types/reservations";
import { getRelationships } from "./utils";

export const fetchReservation = id => ({
  type: FETCH_RESERVATION_REQUEST,
  payload: {
    endpoint: `/api/v1/reservations/${id}`,
    params: {
      include: "user,bookings,tables"
    }
  }
});

export const postReservation = (businessId, values, userId) => ({
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
        relationships: {
          ...getRelationships("business", businessId),
          ...getRelationships("user", userId)
        }
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

export const patchReservationReject = (id, values) => ({
  type: PATCH_RESERVATION_REJECT_REQUEST,
  payload: {
    method: "PATCH",
    endpoint: `/api/v1/reservations/${id}/reject`,
    data: {
      data: {
        id,
        type: "reservations",
        attributes: {
          ...values
        }
      }
    }
  }
});

export const patchReservationCancel = id => ({
  type: PATCH_RESERVATION_CANCEL_REQUEST,
  payload: {
    method: "PATCH",
    endpoint: `/api/v1/reservations/${id}/cancel`,
    data: {
      data: {
        id,
        type: "reservations"
      }
    }
  }
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

export const handleReservationUpdate = data => ({
  type: HANDLE_RESERVATION_UPDATE,
  payload: data
});
