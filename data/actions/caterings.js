import {
  FETCH_CATERING_REQUEST,
  POST_CATERING_REQUEST,
  PATCH_CATERING_REQUEST,
  DELETE_CATERING_REQUEST,
  SEND_CATERING_OFFER_REQUEST,
  SET_EDIT_CATERING
} from "types/caterings";
import { getRelationships } from "./utils";

export const fetchCatering = id => ({
  type: FETCH_CATERING_REQUEST,
  payload: {
    endpoint: `/api/v1/caterings/${id}`,
    params: {
      include: "user,address"
    }
  },
  meta: { thunk: true }
});

export const sendCateringOffer = id => ({
  type: SEND_CATERING_OFFER_REQUEST,
  payload: {
    method: "PATCH",
    endpoint: `/api/v1/caterings/${id}/send`
  },
  meta: { thunk: true, time: new Date().toISOString(), id }
});

export const postCatering = (values, id) => ({
  type: POST_CATERING_REQUEST,
  payload: {
    method: "POST",
    endpoint: `/api/v1/caterings`,
    data: {
      data: {
        type: "caterings",
        attributes: {
          ...values
        },
        relationships: getRelationships("business", id)
      }
    }
  },
  meta: { thunk: true }
});

export const patchCatering = (id, values) => ({
  type: PATCH_CATERING_REQUEST,
  payload: {
    method: "PATCH",
    endpoint: `/api/v1/caterings/${id}`,
    data: {
      data: {
        id,
        type: "caterings",
        attributes: {
          ...values
        }
      }
    }
  },
  meta: { thunk: true }
});

export const deleteCatering = id => ({
  type: DELETE_CATERING_REQUEST,
  payload: {
    method: "DELETE",
    endpoint: `/api/v1/caterings/${id}`
  },
  meta: { thunk: true, id }
});

export const setCateringForEditing = editedCatering => ({
  type: SET_EDIT_CATERING,
  payload: {
    editedCatering
  }
});
