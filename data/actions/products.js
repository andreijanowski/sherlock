/* eslint-disable import/prefer-default-export */
import {
  POST_PRODUCT_REQUEST,
  PATCH_PRODUCT_REQUEST,
  DELETE_PRODUCT_REQUEST
} from "types/products";
import { getRelationships } from "./utils";

export const postProduct = (id, photo) => ({
  type: POST_PRODUCT_REQUEST,
  payload: {
    method: "POST",
    endpoint: `/api/v1/products`,
    data: {
      data: {
        type: "products",
        attributes: {
          name: "product name",
          photo
        },
        relationships: getRelationships("business", id)
      }
    }
  },
  meta: { thunk: true }
});

export const patchProduct = (id, name) => ({
  type: PATCH_PRODUCT_REQUEST,
  payload: {
    method: "PATCH",
    endpoint: `/api/v1/products/${id}`,
    data: {
      data: {
        id,
        type: "products",
        attributes: {
          name
        }
      }
    }
  },
  meta: { thunk: true }
});

export const deleteProduct = id => ({
  type: DELETE_PRODUCT_REQUEST,
  payload: {
    method: "DELETE",
    endpoint: `/api/v1/products/${id}`
  },
  meta: { thunk: true, id }
});
