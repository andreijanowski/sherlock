/* eslint-env jest */

import reducer, { initialState } from "reducers/reservations";
import { Record, Map } from "immutable";
import {
  fetchReservationsRequestAction,
  fetchReservationsSuccessAction,
  fetchReservationsFailAction,
  fetchReservationSuccessAction,
  postReservationSuccessAction,
  patchReservationSuccessAction,
  setEditReservationAction,
  logoutAction
} from "./mocks";

let state = reducer(initialState, {});

const fetchFirstPageSuccessAction = fetchReservationsSuccessAction({
  page: 1
});
const firstPageReservationsLength = Object.entries(
  fetchFirstPageSuccessAction.payload.data.reservations
).length;

const fetchSecondPageSuccessAction = fetchReservationsSuccessAction({
  page: 2
});
const secondPageReservationsLength = Object.entries(
  fetchSecondPageSuccessAction.payload.data.reservations
).length;

const fetchReservationAction = fetchReservationSuccessAction();
const postReservationAction = postReservationSuccessAction();
const patchReservationAction = patchReservationSuccessAction();
const editReservationAction = setEditReservationAction();

describe("reservations reducer", () => {
  it("initializes state", () => {
    expect(state).toBeInstanceOf(Record);
    expect(state.get("data")).toBeInstanceOf(Map);
    expect(state.get("isFetching")).toBe(false);
    expect(state.get("isFailed")).toBe(false);
    expect(state.get("isSucceeded")).toBe(false);
  });

  describe("properly handle FETCH_BUSINESS_RESERVATIONS_REQUEST action:", () => {
    it("sets proper flags when starting fetching reservations", () => {
      state = reducer(state, fetchReservationsRequestAction());
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.get("isFetching")).toBe(true);
      expect(state.get("isFailed")).toBe(false);
      expect(state.get("isSucceeded")).toBe(false);
    });
  });

  describe("properly handle FETCH_BUSINESS_RESERVATIONS_SUCCESS action:", () => {
    it("saves reservations for first results", () => {
      state = reducer(state, fetchFirstPageSuccessAction);
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "reservations"]).size).toBe(
        firstPageReservationsLength
      );
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isSucceeded")).toBe(true);
    });

    it("adds new reservations for next results without removing old ones", () => {
      state = reducer(state, fetchSecondPageSuccessAction);
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "reservations"]).size).toBe(
        firstPageReservationsLength + secondPageReservationsLength
      );
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isSucceeded")).toBe(true);
    });

    it("removes old reservations when pagination page is equal 1", () => {
      expect(state.getIn(["data", "reservations"]).size).toBe(
        firstPageReservationsLength + secondPageReservationsLength
      );
      state = reducer(state, fetchFirstPageSuccessAction);
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "reservations"]).size).toBe(
        firstPageReservationsLength
      );
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isSucceeded")).toBe(true);
    });
  });

  describe("properly handle FETCH_RESERVATION_SUCCESS action", () => {
    it("adds element to exsisting elements", () => {
      state = reducer(state, fetchReservationAction);
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "reservations"]).size).toBe(
        firstPageReservationsLength + 1
      );
    });
  });

  describe("properly handle POST_RESERVATION_SUCCESS action", () => {
    it("adds new element to exsisting elements", () => {
      const { id } = postReservationAction.payload.rawData.data;
      expect(state.getIn(["data", "reservations", id])).toBeUndefined();
      state = reducer(state, postReservationAction);
      expect(state.getIn(["data", "reservations", id])).toBeDefined();
    });
  });

  describe("properly handle PATCH_RESERVATION_SUCCESS action", () => {
    it("updates element", () => {
      const { id } = patchReservationAction.payload.rawData.data;
      expect(
        state.getIn(["data", "reservations", id, "attributes", "state"])
      ).toBe("placed");
      state = reducer(state, patchReservationAction);
      expect(
        state.getIn(["data", "reservations", id, "attributes", "state"])
      ).toBe("booked");
    });
  });

  describe("properly handle FETCH_BUSINESS_RESERVATIONS_FAIL action", () => {
    it("sets proper flags when pagination page is not equal 1", () => {
      state = reducer(state, fetchReservationsFailAction({ page: 2 }));
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "reservations"]).size).toBe(
        firstPageReservationsLength + 2
      );
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isFailed")).toBe(true);
    });

    it("sets proper flags and removes old reservations when pagination page is equal 1", () => {
      state = reducer(state, fetchReservationsFailAction({ page: 1 }));
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "reservations"])).toBeUndefined();
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isFailed")).toBe(true);
    });
  });

  describe("properly handle SET_EDIT_RESERVATION action", () => {
    it("sets data properly", () => {
      const { id } = editReservationAction.payload.editedReservation;
      expect(state.get("editedReservation")).toBe(null);
      state = reducer(state, editReservationAction);
      expect(state.get("editedReservation")).toBeInstanceOf(Map);
      expect(state.getIn(["editedReservation", "id"])).toBe(id);
    });
  });

  describe("properly handle LOGOUT action", () => {
    it("resets state to initialState on logout action", () => {
      state = reducer(state, fetchFirstPageSuccessAction);
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "reservations"]).size).toBe(
        firstPageReservationsLength
      );
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isSucceeded")).toBe(true);
      state = reducer(state, logoutAction());
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.get("data").size).toBe(0);
      expect(state.getIn(["data", "reservations"])).toBeUndefined();
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isSucceeded")).toBe(false);
    });
  });
});
