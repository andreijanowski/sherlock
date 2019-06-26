import {
  FETCH_PRIVATISATION_REQUEST,
  POST_PRIVATISATION_REQUEST,
  PATCH_PRIVATISATION_REQUEST,
  DELETE_PRIVATISATION_REQUEST,
  SEND_PRIVATISATION_OFFER_REQUEST,
  SET_EDIT_PRIVATISATION
} from "types/privatisations";
import { getRelationships } from "./utils";

export const fetchPrivatisation = id => ({
  type: FETCH_PRIVATISATION_REQUEST,
  payload: {
    endpoint: `/api/v1/privatisations/${id}`,
    params: {
      include: "user,address"
    }
  },
  meta: { thunk: true }
});

export const sendPrivatisationOffer = id => ({
  type: SEND_PRIVATISATION_OFFER_REQUEST,
  payload: {
    method: "PATCH",
    endpoint: `/api/v1/privatisations/${id}/send`
  },
  meta: { thunk: true, time: new Date().toISOString(), id }
});

export const postPrivatisation = (values, id) => ({
  type: POST_PRIVATISATION_REQUEST,
  payload: {
    method: "POST",
    endpoint: `/api/v1/privatisations`,
    data: {
      data: {
        type: "privatisations",
        attributes: {
          ...values
        },
        relationships: getRelationships("business", id)
      }
    }
  },
  meta: { thunk: true }
});

export const patchPrivatisation = (id, values) => ({
  type: PATCH_PRIVATISATION_REQUEST,
  payload: {
    method: "PATCH",
    endpoint: `/api/v1/privatisations/${id}`,
    data: {
      data: {
        id,
        type: "privatisations",
        attributes: {
          ...values
        }
      }
    }
  },
  meta: { thunk: true }
});

export const deletePrivatisation = id => ({
  type: DELETE_PRIVATISATION_REQUEST,
  payload: {
    method: "DELETE",
    endpoint: `/api/v1/privatisations/${id}`
  },
  meta: { thunk: true, id }
});

export const setPrivatisationForEditing = editedPrivatisation => ({
  type: SET_EDIT_PRIVATISATION,
  payload: {
    editedPrivatisation
  }
});
