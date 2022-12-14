import {
  ADD_SUPPLIER_TO_FAVORITES_REQUEST,
  REMOVE_SUPPLIER_TO_FAVORITES_REQUEST,
  FETCH_SUPPLIER_PRODUCT_CATEGORIES_REQUEST
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

export const getSupplierProductCategories = ({
  include,
  page = 1,
  per_page = 200
}) => ({
  type: FETCH_SUPPLIER_PRODUCT_CATEGORIES_REQUEST,
  payload: {
    method: "GET",
    endpoint: "/api/v1/supplier_product_categories",
    params: {
      include: include,
      page: page,
      per_page: per_page
    }
  },
  meta: { thunk: true }
});
