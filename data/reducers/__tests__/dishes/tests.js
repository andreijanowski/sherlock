/* eslint-env jest */

import reducer, { initialState } from "reducers/dishes";
import { Record, Map } from "immutable";
import {
  fetchDishesRequestAction,
  fetchDishesSuccessAction,
  fetchDishesFailAction,
  postDishSuccessAction,
  patchDishSuccessAction,
  deleteDishRequestAction,
  logoutAction,
  postPictureSuccessAction,
  deletePictureRequestAction
} from "./mocks";

let state = reducer(initialState, {});

const fetchFirstPageSuccessAction = fetchDishesSuccessAction({
  page: 1
});
const firstPageDishesLength = Object.entries(
  fetchFirstPageSuccessAction.payload.data.dishes
).length;

const fetchSecondPageSuccessAction = fetchDishesSuccessAction({
  page: 2
});
const secondPageDishesLength = Object.entries(
  fetchSecondPageSuccessAction.payload.data.dishes
).length;

const postDishAction = postDishSuccessAction();
const patchDishAction = patchDishSuccessAction();

describe("Dishes reducer", () => {
  it("initializes state", () => {
    expect(state).toBeInstanceOf(Record);
    expect(state.get("data")).toBeInstanceOf(Map);
    expect(state.get("isFetching")).toBe(false);
    expect(state.get("isFailed")).toBe(false);
    expect(state.get("isSucceeded")).toBe(false);
  });

  describe("properly handle FETCH_BUSINESS_DISHES_REQUEST action:", () => {
    it("sets proper flags when starting fetching dishes", () => {
      state = reducer(state, fetchDishesRequestAction());
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.get("isFetching")).toBe(true);
      expect(state.get("isFailed")).toBe(false);
      expect(state.get("isSucceeded")).toBe(false);
    });
  });

  describe("properly handle FETCH_BUSINESS_DISHES_SUCCESS action:", () => {
    it("saves dishes for first results", () => {
      state = reducer(state, fetchFirstPageSuccessAction);
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "dishes"]).size).toBe(firstPageDishesLength);
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isSucceeded")).toBe(true);
    });

    it("adds new dishes for next results without removing old ones", () => {
      state = reducer(state, fetchSecondPageSuccessAction);
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "dishes"]).size).toBe(
        firstPageDishesLength + secondPageDishesLength
      );
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isSucceeded")).toBe(true);
    });

    it("removes old dishes when pagination page is equal 1", () => {
      expect(state.getIn(["data", "dishes"]).size).toBe(
        firstPageDishesLength + secondPageDishesLength
      );
      state = reducer(state, fetchFirstPageSuccessAction);
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "dishes"]).size).toBe(firstPageDishesLength);
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isSucceeded")).toBe(true);
    });
  });

  describe("properly handle POST_DISH_SUCCESS action", () => {
    it("properly adds data after posting dish", () => {
      state = reducer(state, postDishAction);
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "dishes"]).size).toBe(
        firstPageDishesLength + 1
      );
    });
  });

  describe("properly handle PATCH_DISH_SUCCESS action", () => {
    it("properly merges data after patching dish", () => {
      expect(
        state.getIn([
          "data",
          "dishes",
          patchDishAction.payload.rawData.data.id,
          "attributes",
          "userName"
        ])
      ).toBe(
        postDishAction.payload.data.dishes[
          patchDishAction.payload.rawData.data.id
        ].attributes.userName
      );
      state = reducer(state, patchDishAction);
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "dishes"]).size).toBe(
        firstPageDishesLength + 1
      );
      expect(
        state.getIn([
          "data",
          "dishes",
          patchDishAction.payload.rawData.data.id,
          "attributes",
          "userName"
        ])
      ).toBe(
        patchDishAction.payload.data.dishes[
          patchDishAction.payload.rawData.data.id
        ].attributes.userName
      );
    });
  });

  describe("properly handle POST_PICTURE_SUCCESS action", () => {
    it("properly adds picture", () => {
      const id = "142cc33e-5dde-4b0d-acbc-ed21de97c005";
      const postPictureSuccess = postPictureSuccessAction(id);
      expect(
        state.getIn(["data", "dishes", id, "relationships", "pictures", "data"])
      ).toBeUndefined();
      expect(state.getIn(["data", "pictures"])).toBeUndefined();
      state = reducer(state, postPictureSuccess);
      expect(
        state.getIn(["data", "dishes", id, "relationships", "pictures", "data"])
      ).toBeDefined();
      expect(
        state.getIn(["data", "dishes", id, "relationships", "pictures", "data"])
          .size
      ).toBe(1);
      expect(
        state
          .getIn(["data", "dishes", id, "relationships", "pictures", "data"])
          .first()
          .get("id")
      ).toBe(postPictureSuccess.payload.rawData.data.id);
      expect(state.getIn(["data", "pictures"])).toBeDefined();
      expect(state.getIn(["data", "pictures"]).size).toBe(1);
      expect(state.getIn(["data", "pictures"]).first().get("id")).toBe(
        postPictureSuccess.payload.rawData.data.id
      );
    });
  });

  describe("properly handle DELETE_PICTURE_REQUEST action", () => {
    it("properly removes picture", () => {
      const id = "77953c74-6109-4105-87b5-d963c25f8d15";
      const resourceId = "142cc33e-5dde-4b0d-acbc-ed21de97c005";
      expect(state.getIn(["data", "pictures"])).toBeDefined();
      expect(
        state.getIn([
          "data",
          "dishes",
          resourceId,
          "relationships",
          "pictures",
          "data"
        ])
      ).toBeDefined();
      expect(
        state
          .getIn([
            "data",
            "dishes",
            resourceId,
            "relationships",
            "pictures",
            "data"
          ])
          .first()
          .get("id")
      ).toBe(id);
      expect(state.getIn(["data", "pictures", id, "id"])).toBe(id);
      state = reducer(state, deletePictureRequestAction({ id, resourceId }));
      expect(
        state.getIn([
          "data",
          "dishes",
          resourceId,
          "relationships",
          "pictures",
          "data"
        ]).size
      ).toBe(0);
      expect(state.getIn(["data", "pictures"])).toBeDefined();
      expect(state.getIn(["data", "pictures"]).size).toBe(0);
      expect(state.getIn(["data", "pictures", id])).toBeUndefined();
    });
  });

  describe("properly handle DELETE_DISH_REQUEST action", () => {
    it("properly removes dish from store", () => {
      const id = "142cc33e-5dde-4b0d-acbc-ed21de97c005";
      expect(state.getIn(["data", "dishes", id])).toBeDefined();
      state = reducer(state, deleteDishRequestAction(id));
      expect(state.getIn(["data", "dishes", id])).toBeUndefined();
    });
  });

  describe("properly handle FETCH_BUSINESS_DISHES_FAIL action", () => {
    it("sets proper flags when pagination page is not equal 1", () => {
      state = reducer(state, fetchDishesFailAction({ page: 2 }));
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "dishes"]).size).toBe(firstPageDishesLength);
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isFailed")).toBe(true);
    });

    it("sets proper flags and removes old dishes when pagination page is equal 1", () => {
      state = reducer(state, fetchDishesFailAction({ page: 1 }));
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "dishes"])).toBeUndefined();
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isFailed")).toBe(true);
    });
  });

  describe("properly handle LOGOUT action", () => {
    it("resets state to initialState on logout action", () => {
      state = reducer(state, fetchFirstPageSuccessAction);
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "dishes"]).size).toBe(firstPageDishesLength);
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isSucceeded")).toBe(true);
      state = reducer(state, logoutAction());
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.get("data").size).toBe(0);
      expect(state.getIn(["data", "dishes"])).toBeUndefined();
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isSucceeded")).toBe(false);
    });
  });
});
