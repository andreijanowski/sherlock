import {
  POST_DISH_REQUEST,
  PATCH_DISH_REQUEST,
  DELETE_DISH_REQUEST,
  UPLOAD_DISHES_REQUEST
} from "types/dishes";
import { getRelationships } from "./utils";

export const postDish = (values, bussinessId, categoryId) => ({
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
        relationships: {
          ...getRelationships("business", bussinessId),
          ...getRelationships("category", categoryId)
        }
      }
    },
    params: {
      include: "category"
    }
  },
  meta: { thunk: true }
});

export const patchDish = (values, bussinessId, categoryId) => ({
  type: PATCH_DISH_REQUEST,
  payload: {
    method: "PATCH",
    endpoint: `/api/v1/dishes/${bussinessId}`,
    data: {
      data: {
        id: bussinessId,
        type: "dishes",
        attributes: {
          ...values
        },
        relationships: {
          ...getRelationships("business", bussinessId),
          ...getRelationships("category", categoryId)
        }
      }
    },
    params: {
      include: "category"
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

export const uploadDishes = (values, businessId) => ({
  type: UPLOAD_DISHES_REQUEST,
  payload: {
    method: "POST",
    endpoint: "/api/v1/dishes/upload",
    data: {
      data: {
        type: "dishes",
        attributes: values,
        relationships: getRelationships("business", businessId)
      }
    }
  },
  meta: { thunk: true, hideErrorNotification: true }
});
