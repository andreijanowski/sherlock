import {
  FETCH_WIDGET_REQUEST,
  POST_WIDGET_REQUEST,
  PATCH_WIDGET_REQUEST,
  DELETE_WIDGET_REQUEST
} from "types/widgets";
import { getRelationships } from "./utils";

export const fetchWidget = id => ({
  type: FETCH_WIDGET_REQUEST,
  payload: {
    endpoint: `/api/v1/widgets/${id}`
  }
});

export const postWidget = (businessId, values) => ({
  type: POST_WIDGET_REQUEST,
  payload: {
    method: "POST",
    endpoint: `/api/v1/widgets`,
    data: {
      data: {
        type: "widgets",
        attributes: {
          ...values
        },
        relationships: getRelationships("business", businessId)
      }
    }
  },
  meta: { thunk: true }
});

export const patchWidget = (id, values) => ({
  type: PATCH_WIDGET_REQUEST,
  payload: {
    method: "PATCH",
    endpoint: `/api/v1/widgets/${id}`,
    data: {
      data: {
        id,
        type: "widgets",
        attributes: {
          ...values
        }
      }
    }
  },
  meta: { thunk: true }
});

export const deleteWidget = id => ({
  type: DELETE_WIDGET_REQUEST,
  payload: {
    method: "DELETE",
    endpoint: `/api/v1/widgets/${id}`
  },
  meta: { thunk: true, id }
});
