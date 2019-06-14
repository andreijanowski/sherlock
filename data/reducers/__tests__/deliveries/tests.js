/* eslint-env jest */

import reducer, { initialState } from "reducers/deliveries";
import { Record, Map } from "immutable";
import {
  fetchDeliveriesRequestAction,
  fetchDeliveriesSuccessAction,
  fetchDeliveriesFailAction,
  postDeliverySuccessAction,
  deleteDeliveryRequestAction,
  logoutAction
} from "./mocks";

let state = reducer(initialState, {});

const fetchFirstPageSuccessAction = fetchDeliveriesSuccessAction({
  page: 1
});
const firstPageDeliveriesLength = Object.entries(
  fetchFirstPageSuccessAction.payload.data.deliveries
).length;

const fetchSecondPageSuccessAction = fetchDeliveriesSuccessAction({
  page: 2
});
const secondPageDeliveriesLength = Object.entries(
  fetchSecondPageSuccessAction.payload.data.deliveries
).length;

const postDeliveryAction = postDeliverySuccessAction();

describe("Deliveries reducer", () => {
  it("initializes state", () => {
    expect(state).toBeInstanceOf(Record);
    expect(state.get("data")).toBeInstanceOf(Map);
    expect(state.get("isFetching")).toBe(false);
    expect(state.get("isFailed")).toBe(false);
    expect(state.get("isSucceeded")).toBe(false);
  });

  describe("properly handle FETCH_BUSINESS_DELIVERIES_REQUEST action:", () => {
    it("sets proper flags when starting fetching deliveries", () => {
      state = reducer(state, fetchDeliveriesRequestAction());
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.get("isFetching")).toBe(true);
      expect(state.get("isFailed")).toBe(false);
      expect(state.get("isSucceeded")).toBe(false);
    });
  });

  describe("properly handle FETCH_BUSINESS_DELIVERIES_SUCCESS action:", () => {
    it("saves deliveries for first results", () => {
      state = reducer(state, fetchFirstPageSuccessAction);
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "deliveries"]).size).toBe(
        firstPageDeliveriesLength
      );
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isSucceeded")).toBe(true);
    });

    it("adds new deliveries for next results without removing old ones", () => {
      state = reducer(state, fetchSecondPageSuccessAction);
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "deliveries"]).size).toBe(
        firstPageDeliveriesLength + secondPageDeliveriesLength
      );
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isSucceeded")).toBe(true);
    });

    it("removes old deliveries when pagination page is equal 1", () => {
      expect(state.getIn(["data", "deliveries"]).size).toBe(
        firstPageDeliveriesLength + secondPageDeliveriesLength
      );
      state = reducer(state, fetchFirstPageSuccessAction);
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "deliveries"]).size).toBe(
        firstPageDeliveriesLength
      );
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isSucceeded")).toBe(true);
    });
  });

  describe("properly handle POST_DELIVERY_SUCCESS action", () => {
    it("properly adds data after posting delivery", () => {
      state = reducer(state, postDeliveryAction);
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "deliveries"]).size).toBe(
        firstPageDeliveriesLength + 1
      );
    });
  });

  describe("properly handle DELETE_DELIVERY_REQUEST action", () => {
    it("properly removes delivery from store", () => {
      const id = "142cc33e-5dde-4b0d-acbc-ed21de97c005";
      expect(state.getIn(["data", "deliveries", id])).toBeDefined();
      state = reducer(state, deleteDeliveryRequestAction(id));
      expect(state.getIn(["data", "deliveries", id])).toBeUndefined();
    });
  });

  describe("properly handle FETCH_BUSINESS_DELIVERIES_FAIL action", () => {
    it("sets proper flags when pagination page is not equal 1", () => {
      state = reducer(state, fetchDeliveriesFailAction({ page: 2 }));
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "deliveries"]).size).toBe(
        firstPageDeliveriesLength
      );
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isFailed")).toBe(true);
    });

    it("sets proper flags and removes old deliveries when pagination page is equal 1", () => {
      state = reducer(state, fetchDeliveriesFailAction({ page: 1 }));
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "deliveries"])).toBeUndefined();
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isFailed")).toBe(true);
    });
  });

  describe("properly handle LOGOUT action", () => {
    it("resets state to initialState on logout action", () => {
      state = reducer(state, fetchFirstPageSuccessAction);
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "deliveries"]).size).toBe(
        firstPageDeliveriesLength
      );
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isSucceeded")).toBe(true);
      state = reducer(state, logoutAction());
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.get("data").size).toBe(0);
      expect(state.getIn(["data", "deliveries"])).toBeUndefined();
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isSucceeded")).toBe(false);
    });
  });
});
