import {
  POST_TABLE_REQUEST,
  PATCH_TABLE_REQUEST,
  DELETE_TABLE_REQUEST
} from "types/tables";
import { getRelationships } from "./utils";

export const postTable = (values, id) => ({
  type: POST_TABLE_REQUEST,
  payload: {
    method: "POST",
    endpoint: `/api/v1/tables`,
    data: {
      data: {
        type: "tables",
        attributes: {
          ...values
        },
        relationships: getRelationships("business", id)
      }
    }
  },
  meta: { thunk: true }
});

export const patchTable = (values, id) => ({
  type: PATCH_TABLE_REQUEST,
  payload: {
    method: "PATCH",
    endpoint: `/api/v1/tables/${id}`,
    data: {
      data: {
        id,
        type: "tables",
        attributes: {
          ...values
        }
      }
    }
  },
  meta: { thunk: true }
});

export const deleteTable = id => ({
  type: DELETE_TABLE_REQUEST,
  payload: {
    method: "DELETE",
    endpoint: `/api/v1/tables/${id}`
  },
  meta: { thunk: true, id }
});
