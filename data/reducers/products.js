import {
  ADD_PRODUCT_TO_CART,
  UPDATE_PRODUCT_TO_CART,
  REMOVE_PRODUCT_TO_CART,
  SET_PRODUCTS_TO_CART,
  REMOVE_PRODUCTS_BY_SUPPLIER_TO_CART
} from "types/products";
import { fromJS, Record } from "immutable";

export const initialState = Record({
  selectedProducts: []
})();

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_PRODUCT_TO_CART: {
      const products = state.get("selectedProducts").toJS();

      window.localStorage.setItem(
        "cart_products",
        JSON.stringify([...products, payload.product])
      );

      return state.mergeIn(["selectedProducts"], [fromJS(payload.product)]);
    }
    case UPDATE_PRODUCT_TO_CART: {
      let products = state.get("selectedProducts").toJS();

      products = products.map(item =>
        item.objectID === payload.productId
          ? {
              ...item,
              count: payload.count
            }
          : item
      );

      window.localStorage.setItem("cart_products", JSON.stringify(products));
      return state.setIn(["selectedProducts"], fromJS(products));
    }
    case REMOVE_PRODUCT_TO_CART: {
      let products = state.get("selectedProducts").toJS();

      products = products.filter(item => item.objectID !== payload.productId);

      window.localStorage.setItem("cart_products", JSON.stringify(products));
      return state.setIn(["selectedProducts"], fromJS(products));
    }
    case SET_PRODUCTS_TO_CART: {
      return state.setIn(["selectedProducts"], fromJS(payload.products));
    }
    case REMOVE_PRODUCTS_BY_SUPPLIER_TO_CART: {
      let products = state.get("selectedProducts").toJS();

      products = products.filter(
        item => item.supplier_name !== payload.supplierName
      );

      window.localStorage.setItem("cart_products", JSON.stringify(products));
      return state.setIn(["selectedProducts"], fromJS(products));
    }
    default: {
      return state;
    }
  }
};

export default reducer;
