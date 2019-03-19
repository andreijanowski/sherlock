import {
  POST_ORDER_PERIOD_REQUEST,
  PATCH_ORDER_PERIOD_REQUEST,
  DELETE_ORDER_PERIOD_REQUEST
} from "types/orderPeriods";
import { getRelationships } from "./utils";

export const postOrderPeriod = (id, attributes) => ({
  type: POST_ORDER_PERIOD_REQUEST,
  payload: {
    method: "POST",
    endpoint: `/api/v1/order_periods`,
    data: {
      data: {
        type: "order_periods",
        attributes,
        relationships: getRelationships("business", id)
      }
    }
  },
  meta: { thunk: true }
});

export const patchOrderPeriod = (id, attributes) => ({
  type: PATCH_ORDER_PERIOD_REQUEST,
  payload: {
    method: "PATCH",
    endpoint: `/api/v1/order_periods/${id}`,
    data: {
      data: {
        id,
        type: "order_periods",
        attributes
      }
    }
  },
  meta: { thunk: true }
});

export const deleteOrderPeriod = id => ({
  type: DELETE_ORDER_PERIOD_REQUEST,
  payload: {
    method: "DELETE",
    endpoint: `/api/v1/order_periods/${id}`
  },
  meta: { thunk: true, id }
});
