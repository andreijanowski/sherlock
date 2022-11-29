/* eslint-env jest */

import reducer, { initialState } from "reducers/groups";
import { Record, Map } from "immutable";
import {
  fetchGroupsRequestAction,
  fetchGroupsSuccessAction,
  fetchGroupsFailAction,
  logoutAction
} from "./mocks";

const fetchGroupsSuccess = fetchGroupsSuccessAction();
const groupsLength = Object.entries(
  fetchGroupsSuccess.payload.data.groups
).length;

let state = reducer(initialState, {});

describe("Groups reducer", () => {
  it("initializes state", () => {
    expect(state).toBeInstanceOf(Record);
    expect(state.get("data")).toBeInstanceOf(Map);
    expect(state.get("isFetching")).toBe(false);
    expect(state.get("isFailed")).toBe(false);
    expect(state.get("isSucceeded")).toBe(false);
  });

  describe("properly handle FETCH_GROUPS_REQUEST action:", () => {
    it("sets proper flags when starting fetching groups", () => {
      state = reducer(state, fetchGroupsRequestAction());
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.get("isFetching")).toBe(true);
      expect(state.get("isFailed")).toBe(false);
      expect(state.get("isSucceeded")).toBe(false);
    });
  });

  describe("properly handle FETCH_GROUPS_SUCCESS action:", () => {
    it("saves groups in store", () => {
      state = reducer(state, fetchGroupsSuccess);
      expect(state.get("data")).toBeInstanceOf(Map);
      expect(state.getIn(["data", "groups"]).size).toBe(groupsLength);
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isSucceeded")).toBe(true);
    });
  });

  describe("properly handle FETCH_GROUPS_FAIL action", () => {
    it("sets proper flags", () => {
      state = reducer(state, fetchGroupsFailAction());
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isFailed")).toBe(true);
    });
  });

  describe("properly handle LOGOUT action", () => {
    it("resets state to initialState on logout action", () => {
      expect(state.getIn(["data", "groups"]).size).toBe(groupsLength);
      state = reducer(state, logoutAction());
      expect(state.get("data").size).toBe(0);
      expect(state.getIn(["data", "groups"])).toBeUndefined();
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isSucceeded")).toBe(false);
      expect(state.get("isFailed")).toBe(false);
    });
  });
});
