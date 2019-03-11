import {
  FETCH_ORDER_REQUEST,
  PATCH_ORDER_REQUEST,
  HANDLE_ORDER_UPDATE
} from "types/orders";

export const fetchOrder = id => ({
  type: FETCH_ORDER_REQUEST,
  payload: {
    endpoint: `/api/v1/orders/${id}`,
    params: {
      include: "elements"
    }
  },
  meta: { thunk: true }
});

export const patchOrder = (values, id) => ({
  type: PATCH_ORDER_REQUEST,
  payload: {
    method: "PATCH",
    endpoint: `/api/v1/orders/${id}`,
    data: {
      data: {
        id,
        type: "orders",
        attributes: {
          ...values
        }
      }
    }
  },
  meta: { thunk: true }
});

export const handleOrderUpdate = data => ({
  type: HANDLE_ORDER_UPDATE,
  payload: data
});
