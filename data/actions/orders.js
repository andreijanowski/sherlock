import {
  FETCH_ORDER_REQUEST,
  PATCH_ORDER_REQUEST,
  PATCH_ORDER_REJECT_REQUEST,
  HANDLE_ORDER_UPDATE,
  FETCH_ORKESTRO_STATUS_REQUEST
} from "types/orders";

export const fetchOrder = id => ({
  type: FETCH_ORDER_REQUEST,
  payload: {
    endpoint: `/api/v1/orders/${id}`,
    params: {
      include: "addresses,elements,elements.element_options"
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

export const patchOrderReject = (values, id) => ({
  type: PATCH_ORDER_REJECT_REQUEST,
  payload: {
    method: "PATCH",
    endpoint: `/api/v1/orders/${id}/reject`,
    data: {
      data: {
        id,
        type: "orders",
        attributes: {
          rejectReason: "kitchen_full",
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

export const fetchOrkestroOrder = id => ({
  type: FETCH_ORKESTRO_STATUS_REQUEST,
  payload: {
    endpoint: `/api/v1/orders/${id}/orkestro`,
    params: {
      id
    }
  },
  meta: { thunk: true, hideErrorNotification: true }
});
