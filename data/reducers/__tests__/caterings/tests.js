/* eslint-env jest */

import reducer, { initialState } from "reducers/caterings";
import { Record, Map } from "immutable";
import {
  fetchCateringsRequestAction,
  fetchCateringsSuccessAction,
  fetchCateringsFailAction,
  postCateringSuccessAction,
  patchCateringSuccessAction,
  sendCateringOfferSuccessAction,
  setEditCateringAction,
  deleteCateringRequestAction,
  logoutAction
} from "./mocks";

let state = reducer(initialState, {});

const fetchFirstPageSuccessAction = fetchCateringsSuccessAction({
  page: 1
});
const firstPageCateringsLength = Object.entries(
  fetchFirstPageSuccessAction.payload.data.caterings
).length;

const fetchSecondPageSuccessAction = fetchCateringsSuccessAction({
  page: 2
});
const secondPageCateringsLength = Object.entries(
  fetchSecondPageSuccessAction.payload.data.caterings
).length;

const postCateringAction = postCateringSuccessAction();
const patchCateringAction = patchCateringSuccessAction();

describe("Caterings reducer", () => {
  it("initializes state", () => {
    expect(state).toBeInstanceOf(Record);
    expect(state.get("data")).toBeInstanceOf(Map);
    expect(state.get("isFetching")).toBe(false);
    expect(state.get("isFailed")).toBe(false);
    expect(state.get("isSucceeded")).toBe(false);
    expect(state.get("editedCatering")).toBe(null);
  });

  describe("properly handle FETCH_BUSINESS_CATERINGS_REQUEST action:", () => {
    it("sets proper flags when starting fetching caterings", () => {
      state = reducer(state, fetchCateringsRequestAction());
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.get("isFetching")).toBe(true);
      expect(state.get("isFailed")).toBe(false);
      expect(state.get("isSucceeded")).toBe(false);
    });
  });

  describe("properly handle FETCH_BUSINESS_CATERINGS_SUCCESS action:", () => {
    it("saves caterings for first results", () => {
      state = reducer(state, fetchFirstPageSuccessAction);
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "caterings"]).size).toBe(
        firstPageCateringsLength
      );
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isSucceeded")).toBe(true);
    });

    it("adds new caterings for next results without removing old ones", () => {
      state = reducer(state, fetchSecondPageSuccessAction);
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "caterings"]).size).toBe(
        firstPageCateringsLength + secondPageCateringsLength
      );
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isSucceeded")).toBe(true);
    });

    it("removes old caterings when pagination page is equal 1", () => {
      expect(state.getIn(["data", "caterings"]).size).toBe(
        firstPageCateringsLength + secondPageCateringsLength
      );
      state = reducer(state, fetchFirstPageSuccessAction);
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "caterings"]).size).toBe(
        firstPageCateringsLength
      );
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isSucceeded")).toBe(true);
    });
  });

  describe("properly handle POST_CATERING_SUCCESS action", () => {
    it("properly adds data after posting catering", () => {
      state = reducer(state, postCateringAction);
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "caterings"]).size).toBe(
        firstPageCateringsLength + 1
      );
    });
  });

  describe("properly handle PATCH_CATERING_SUCCESS action", () => {
    it("properly merges data after patching catering", () => {
      expect(
        state.getIn([
          "data",
          "caterings",
          patchCateringAction.payload.rawData.data.id,
          "attributes",
          "userName"
        ])
      ).toBe(
        postCateringAction.payload.data.caterings[
          patchCateringAction.payload.rawData.data.id
        ].attributes.userName
      );
      state = reducer(state, patchCateringAction);
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "caterings"]).size).toBe(
        firstPageCateringsLength + 1
      );
      expect(
        state.getIn([
          "data",
          "caterings",
          patchCateringAction.payload.rawData.data.id,
          "attributes",
          "userName"
        ])
      ).toBe(
        patchCateringAction.payload.data.caterings[
          patchCateringAction.payload.rawData.data.id
        ].attributes.userName
      );
    });
  });

  describe("properly handle SEND_CATERING_OFFER_SUCCESS action", () => {
    it("properly sets 'offerSendAt' attribute after sending catering offer", () => {
      const time = new Date().toISOString();
      expect(
        state.getIn([
          "data",
          "caterings",
          patchCateringAction.payload.rawData.data.id,
          "attributes",
          "offerSendAt"
        ])
      ).toBe(null);
      state = reducer(state, sendCateringOfferSuccessAction({ time }));
      expect(
        state.getIn([
          "data",
          "caterings",
          patchCateringAction.payload.rawData.data.id,
          "attributes",
          "offerSendAt"
        ])
      ).toBe(time);
    });
  });

  describe("properly handle SET_EDIT_CATERING action", () => {
    it("properly sets 'editedCatering' data", () => {
      expect(state.get("editedCatering")).toBe(null);
      const catering = {
        id: "142cc33e-5dde-4b0d-acbc-ed21de97c005"
      };
      state = reducer(state, setEditCateringAction(catering));
      expect(state.getIn(["editedCatering", "id"])).toBe(catering.id);
    });
  });

  describe("properly handle DELETE_CATERING_REQUEST action", () => {
    it("properly removes catering from store", () => {
      const id = "142cc33e-5dde-4b0d-acbc-ed21de97c005";
      expect(state.getIn(["data", "caterings", id])).toBeDefined();
      state = reducer(state, deleteCateringRequestAction(id));
      expect(state.getIn(["data", "caterings", id])).toBeUndefined();
    });
  });

  describe("properly handle FETCH_BUSINESS_CATERINGS_FAIL action", () => {
    it("sets proper flags when pagination page is not equal 1", () => {
      state = reducer(state, fetchCateringsFailAction({ page: 2 }));
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "caterings"]).size).toBe(
        firstPageCateringsLength
      );
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isFailed")).toBe(true);
    });

    it("sets proper flags and removes old caterings when pagination page is equal 1", () => {
      state = reducer(state, fetchCateringsFailAction({ page: 1 }));
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "caterings"])).toBeUndefined();
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isFailed")).toBe(true);
    });
  });

  describe("properly handle LOGOUT action", () => {
    it("resets state to initialState on logout action", () => {
      state = reducer(state, fetchFirstPageSuccessAction);
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "caterings"]).size).toBe(
        firstPageCateringsLength
      );
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isSucceeded")).toBe(true);
      expect(state.get("editedCatering")).toBeTruthy();
      state = reducer(state, logoutAction());
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.get("data").size).toBe(0);
      expect(state.getIn(["data", "caterings"])).toBeUndefined();
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isSucceeded")).toBe(false);
      expect(state.get("editedCatering")).toBe(null);
    });
  });
});
