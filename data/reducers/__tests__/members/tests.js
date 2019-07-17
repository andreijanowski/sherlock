/* eslint-env jest */

import reducer, { initialState } from "reducers/members";
import { Record, Map } from "immutable";
import {
  fetchMembersRequestAction,
  fetchMembersSuccessAction,
  fetchMembersFailAction
} from "./mocks";

let state = reducer(initialState, {});

const fetchFirstPageSuccessAction = fetchMembersSuccessAction({
  page: 1
});
const firstPageMembersLength = Object.entries(
  fetchFirstPageSuccessAction.payload.data.members
).length;

const fetchSecondPageSuccessAction = fetchMembersSuccessAction({
  page: 2
});
const secondPageMembersLength = Object.entries(
  fetchSecondPageSuccessAction.payload.data.members
).length;

describe("Members reducer", () => {
  it("initializes state", () => {
    expect(state).toBeInstanceOf(Record);
    expect(state.get("data")).toBeInstanceOf(Map);
    expect(state.get("isFetching")).toBe(false);
    expect(state.get("isFailed")).toBe(false);
    expect(state.get("isSucceeded")).toBe(false);
  });

  describe("properly handle FETCH_BUSINESS_MEMBERS_REQUEST action:", () => {
    it("sets proper flags when starting fetching members", () => {
      state = reducer(state, fetchMembersRequestAction());
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.get("isFetching")).toBe(true);
      expect(state.get("isFailed")).toBe(false);
      expect(state.get("isSucceeded")).toBe(false);
    });
  });

  describe("properly handle FETCH_BUSINESS_MEMBERS_SUCCESS action:", () => {
    it("saves members for first results", () => {
      state = reducer(state, fetchFirstPageSuccessAction);
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "members"]).size).toBe(
        firstPageMembersLength
      );
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isSucceeded")).toBe(true);
    });

    it("adds new members for next results without removing old ones", () => {
      state = reducer(state, fetchSecondPageSuccessAction);
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "members"]).size).toBe(
        firstPageMembersLength + secondPageMembersLength
      );
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isSucceeded")).toBe(true);
    });

    it("removes old members when pagination page is equal 1", () => {
      expect(state.getIn(["data", "members"]).size).toBe(
        firstPageMembersLength + secondPageMembersLength
      );
      state = reducer(state, fetchFirstPageSuccessAction);
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "members"]).size).toBe(
        firstPageMembersLength
      );
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isSucceeded")).toBe(true);
    });
  });

  describe("properly handle FETCH_BUSINESS_MEMBERS_FAIL action", () => {
    it("sets proper flags when pagination page is not equal 1", () => {
      state = reducer(state, fetchMembersFailAction({ page: 2 }));
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "members"]).size).toBe(
        firstPageMembersLength
      );
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isFailed")).toBe(true);
    });

    it("sets proper flags and removes old members when pagination page is equal 1", () => {
      state = reducer(state, fetchMembersFailAction({ page: 1 }));
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "members"])).toBeUndefined();
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isFailed")).toBe(true);
    });
  });
});
