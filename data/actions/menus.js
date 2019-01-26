/* eslint-disable import/prefer-default-export */
import {
  POST_MENU_REQUEST,
  PATCH_MENU_REQUEST,
  DELETE_MENU_REQUEST
} from "types/menus";
import { getRelationships } from "./utils";

export const postMenu = (id, displayName, file) => ({
  type: POST_MENU_REQUEST,
  payload: {
    method: "POST",
    endpoint: `/api/v1/menus`,
    data: {
      data: {
        type: "menus",
        attributes: {
          display_name: displayName,
          file
        },
        relationships: getRelationships("business", id)
      }
    }
  },
  meta: { thunk: true }
});

export const patchMenu = (id, displayName) => ({
  type: PATCH_MENU_REQUEST,
  payload: {
    method: "PATCH",
    endpoint: `/api/v1/menus/${id}`,
    data: {
      data: {
        id,
        type: "menus",
        attributes: {
          displayName
        }
      }
    }
  },
  meta: { thunk: true }
});

export const deleteMenu = id => ({
  type: DELETE_MENU_REQUEST,
  payload: {
    method: "DELETE",
    endpoint: `/api/v1/menus/${id}`
  },
  meta: { thunk: true, id }
});
