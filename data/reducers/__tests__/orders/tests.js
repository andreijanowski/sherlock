/* eslint-env jest */

import reducer, { initialState } from "reducers/orders";
import { Record, Map } from "immutable";
import {
  fetchOrdersRequestAction,
  fetchOrdersSuccessAction,
  fetchOrdersFailAction,
  fetchOrderSuccessAction,
  patchOrderSuccessAction,
  patchOrderRejectSuccessAction,
  logoutAction
} from "./mocks";

let state = reducer(initialState, {});

const fetchFirstPageSuccessAction = fetchOrdersSuccessAction({
  page: 1
});
const firstPageOrdersLength = Object.entries(
  fetchFirstPageSuccessAction.payload.data.orders
).length;

const fetchSecondPageSuccessAction = fetchOrdersSuccessAction({
  page: 2
});
const secondPageOrdersLength = Object.entries(
  fetchSecondPageSuccessAction.payload.data.orders
).length;

const fetchOrderAction = fetchOrderSuccessAction();
const patchOrderAction = patchOrderSuccessAction();
const patchOrderRejectAction = patchOrderRejectSuccessAction();

describe("orders reducer", () => {
  it("initializes state", () => {
    expect(state).toBeInstanceOf(Record);
    expect(state.get("data")).toBeInstanceOf(Map);
    expect(state.get("isFetching")).toBe(false);
    expect(state.get("isFailed")).toBe(false);
    expect(state.get("isSucceeded")).toBe(false);
  });

  describe("properly handle FETCH_BUSINESS_ORDERS_REQUEST action:", () => {
    it("sets proper flags when starting fetching orders", () => {
      state = reducer(state, fetchOrdersRequestAction());
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.get("isFetching")).toBe(true);
      expect(state.get("isFailed")).toBe(false);
      expect(state.get("isSucceeded")).toBe(false);
    });
  });

  describe("properly handle FETCH_BUSINESS_ORDERS_SUCCESS action:", () => {
    it("saves orders for first results", () => {
      state = reducer(state, fetchFirstPageSuccessAction);
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "orders"]).size).toBe(firstPageOrdersLength);
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isSucceeded")).toBe(true);
    });

    it("adds new orders for next results without removing old ones", () => {
      state = reducer(state, fetchSecondPageSuccessAction);
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "orders"]).size).toBe(
        firstPageOrdersLength + secondPageOrdersLength
      );
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isSucceeded")).toBe(true);
    });

    it("removes old orders when pagination page is equal 1", () => {
      expect(state.getIn(["data", "orders"]).size).toBe(
        firstPageOrdersLength + secondPageOrdersLength
      );
      state = reducer(state, fetchFirstPageSuccessAction);
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "orders"]).size).toBe(firstPageOrdersLength);
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isSucceeded")).toBe(true);
    });
  });

  describe("properly handle FETCH_ORDER_SUCCESS action", () => {
    it("adds element to exsisting elements", () => {
      state = reducer(state, fetchOrderAction);
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "orders"]).size).toBe(
        firstPageOrdersLength + 1
      );
    });
  });

  describe("properly handle PATCH_ORDER_SUCCESS action", () => {
    it("updates element", () => {
      const { id } = patchOrderAction.payload.rawData.data;
      expect(state.getIn(["data", "orders", id, "attributes", "status"])).toBe(
        "waiting_for_approval"
      );
      state = reducer(state, patchOrderAction);
      expect(state.getIn(["data", "orders", id, "attributes", "status"])).toBe(
        "paid"
      );
    });
  });

  describe("properly handle PATCH_ORDER_REJECT_SUCCESS action", () => {
    it("updates element", () => {
      const { id } = patchOrderRejectAction.payload.rawData.data;
      expect(state.getIn(["data", "orders", id, "attributes", "status"])).toBe(
        "paid"
      );
      state = reducer(state, patchOrderRejectAction);
      expect(state.getIn(["data", "orders", id, "attributes", "status"])).toBe(
        "rejected"
      );
    });
  });

  describe("properly handle FETCH_BUSINESS_ORDERS_FAIL action", () => {
    it("sets proper flags when pagination page is not equal 1", () => {
      state = reducer(state, fetchOrdersFailAction({ page: 2 }));
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "orders"]).size).toBe(
        firstPageOrdersLength + 1
      );
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isFailed")).toBe(true);
    });

    it("sets proper flags and removes old orders when pagination page is equal 1", () => {
      state = reducer(state, fetchOrdersFailAction({ page: 1 }));
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "orders"])).toBeUndefined();
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isFailed")).toBe(true);
    });
  });

  describe("properly handle LOGOUT action", () => {
    it("resets state to initialState on logout action", () => {
      state = reducer(state, fetchFirstPageSuccessAction);
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "orders"]).size).toBe(firstPageOrdersLength);
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isSucceeded")).toBe(true);
      state = reducer(state, logoutAction());
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.get("data").size).toBe(0);
      expect(state.getIn(["data", "orders"])).toBeUndefined();
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isSucceeded")).toBe(false);
    });
  });
});
