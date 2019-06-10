import {
  POST_DISH_REQUEST,
  PATCH_DISH_REQUEST,
  DELETE_DISH_REQUEST
} from "types/dishes";
import { getRelationships } from "./utils";

export const postDish = (values, id) => ({
  type: POST_DISH_REQUEST,
  payload: {
    method: "POST",
    endpoint: `/api/v1/dishes`,
    data: {
      data: {
        type: "dishes",
        attributes: {
          ...values
        },
        relationships: getRelationships("business", id)
      }
    }
  },
  meta: { thunk: true }
});

export const patchDish = (values, id) => ({
  type: PATCH_DISH_REQUEST,
  payload: {
    method: "PATCH",
    endpoint: `/api/v1/dishes/${id}`,
    data: {
      data: {
        id,
        type: "dishes",
        attributes: {
          ...values
        }
      }
    }
  },
  meta: { thunk: true }
});

export const deleteDish = id => ({
  type: DELETE_DISH_REQUEST,
  payload: {
    method: "DELETE",
    endpoint: `/api/v1/dishes/${id}`
  },
  meta: { thunk: true, id }
});
