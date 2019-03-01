import {
  POST_DELIVERY_REQUEST,
  DELETE_DELIVERY_REQUEST
} from "types/deliveries";
import { getRelationships } from "./utils";

export const postDelivery = (values, id) => ({
  type: POST_DELIVERY_REQUEST,
  payload: {
    method: "POST",
    endpoint: `/api/v1/deliveries`,
    data: {
      data: {
        type: "deliveries",
        attributes: {
          ...values
        },
        relationships: getRelationships("business", id)
      }
    }
  },
  meta: { thunk: true }
});

export const deleteDelivery = id => ({
  type: DELETE_DELIVERY_REQUEST,
  payload: {
    method: "DELETE",
    endpoint: `/api/v1/deliveries/${id}`
  },
  meta: { thunk: true, id }
});
