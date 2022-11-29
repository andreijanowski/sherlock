import {
  ADD_SUPPLIER_TO_FAVORITES_REQUEST,
  REMOVE_SUPPLIER_TO_FAVORITES_REQUEST
} from "types/suppliers";
import { getRelationships } from "./utils";

export const postSupplierToFavorites = data => ({
  type: ADD_SUPPLIER_TO_FAVORITES_REQUEST,
  payload: {
    method: "POST",
    endpoint: `/api/v1/favorite_suppliers`,
    data: {
      data: {
        type: "favorite_suppliers",
        relationships: {
          ...getRelationships("business", data.businessId),
          ...getRelationships("supplier", data.supplierId)
        }
      }
    }
  },
  meta: { thunk: true }
});

export const postRemoveSupplierToFavorites = id => ({
  type: REMOVE_SUPPLIER_TO_FAVORITES_REQUEST,
  payload: {
    method: "DELETE",
    endpoint: `/api/v1/favorite_suppliers/${id}`
  },
  meta: { thunk: true, id }
});
