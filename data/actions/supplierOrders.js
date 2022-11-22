import {
  POST_SUPPLIER_ORDER_REQUEST,
  SEND_ORDER_EMAIL_REQUEST
} from "types/supplierOrders";
import { getRelationships } from "./utils";

export const postSupplierOrder = data => ({
  type: POST_SUPPLIER_ORDER_REQUEST,
  payload: {
    method: "POST",
    endpoint: `/api/v1/supplier_orders`,
    data: {
      data: {
        type: "supplier_orders",
        attributes: {
          desired_delivery_date: data.desiredDeliveryDate,
          comment: data.comment
        },
        relationships: {
          ...getRelationships("business", data.businessId),
          ...getRelationships("supplier", data.supplierId)
        }
      }
    }
  },
  meta: { thunk: true }
});

export const postSupplierOrderEmail = orderId => ({
  type: SEND_ORDER_EMAIL_REQUEST,
  payload: {
    method: "GET",
    endpoint: `/api/v1/supplier_orders/${orderId}/send_created_email`
  },
  meta: { thunk: true }
});
