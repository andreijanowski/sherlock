import {
  POST_PRODUCT_REQUEST,
  PATCH_PRODUCT_REQUEST,
  DELETE_PRODUCT_REQUEST,
  ADD_PRODUCT_TO_CART,
  UPDATE_PRODUCT_TO_CART,
  REMOVE_PRODUCT_TO_CART,
  SET_PRODUCTS_TO_CART,
  REMOVE_PRODUCTS_BY_SUPPLIER_TO_CART
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

export const addProductToCart = product => ({
  type: ADD_PRODUCT_TO_CART,
  payload: {
    product
  }
});

export const updateProductToCart = (productId, count) => ({
  type: UPDATE_PRODUCT_TO_CART,
  payload: {
    productId,
    count
  }
});

export const removeProductToCart = productId => ({
  type: REMOVE_PRODUCT_TO_CART,
  payload: {
    productId
  }
});

export const setProductsToCart = products => ({
  type: SET_PRODUCTS_TO_CART,
  payload: {
    products
  }
});

export const removeProductsBySupplier = supplierName => ({
  type: REMOVE_PRODUCTS_BY_SUPPLIER_TO_CART,
  payload: {
    supplierName
  }
});
