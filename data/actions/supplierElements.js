import { POST_SUPPLIER_ELEMENT_REQUEST } from "types/supplierElements";
import { getRelationships } from "./utils";

export const postSupplierElements = data => ({
  type: POST_SUPPLIER_ELEMENT_REQUEST,
  payload: {
    method: "POST",
    endpoint: `/api/v1/supplier_elements`,
    data: {
      data: {
        type: "supplier_elements",
        attributes: {
          quantity: data.quantity
        },
        relationships: {
          ...getRelationships("supplier_order", data.supplierOrderId),
          ...getRelationships("supplier_product", data.supplierProductId)
        }
      }
    }
  },
  meta: { thunk: true }
});
