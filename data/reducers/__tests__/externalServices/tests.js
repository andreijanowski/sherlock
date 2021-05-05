/* eslint-env jest */

import reducer, { initialState } from "reducers/externalServices";
import { Record, Map } from "immutable";
import {
  fetchExternalServicesRequestAction,
  fetchExternalServicesFailAction,
  fetchExternalServicesSuccessAction,
  fetchBusinessLinkRequestAction,
  fetchBusinessLinkFailAction,
  fetchBusinessLinkSuccessAction,
  patchExternalServiceLinkSuccessAction,
  connectExternalServiceLinkSuccessAction,
  deleteExternalServiceLinkSuccessAction
} from "./mocks";

let state;

const externalServicesSuccessAction = fetchExternalServicesSuccessAction()
const businessLinksSuccessAction = fetchBusinessLinkSuccessAction()

const service = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  name: 'test service'
}

const updatedService = {
  ...service,
  name: 'new test service'
}

const connectServiceSuccessAction = connectExternalServiceLinkSuccessAction({id: service.id, data: service})
const patchServiceSuccessAction = patchExternalServiceLinkSuccessAction({id: updatedService.id, data: updatedService})
const deleteServiceSuccessAction = deleteExternalServiceLinkSuccessAction(service.id)

describe("External services reducer", () => {
  beforeEach(() => {
    state = reducer(initialState, {});
  })

  it("initializes state", () => {
    expect(state).toBeInstanceOf(Record);
    expect(state.get("data")).toBeInstanceOf(Map);
    expect(state.get("isFetching")).toBe(false);
    expect(state.get("isFailed")).toBe(false);
    expect(state.get("isSucceeded")).toBe(false);
  });

  describe("properly handle FETCH_EXTERNAL_SERVICES_REQUEST action:", () => {
    it("sets proper flags when starting fetching external services", () => {
      state = reducer(state, fetchExternalServicesRequestAction());
      expect(state.get("isFetching")).toBe(true);
      expect(state.get("isFailed")).toBe(false);
      expect(state.get("isSucceeded")).toBe(false);
    });
  });

  describe("properly handle FETCH_EXTERNAL_SERVICES_FAIL action:", () => {
    it("sets proper flags when finish fetching external services", () => {
      state = reducer(state, fetchExternalServicesFailAction());
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isFailed")).toBe(true);
      expect(state.get("isSucceeded")).toBe(false);
    });
  });

  describe("properly handle FETCH_EXTERNAL_SERVICES_SUCCESS action:", () => {
    it("saves external services", () => {
      state = reducer(state, externalServicesSuccessAction);
      expect(state.getIn(["data", "services"]).toJS()).toStrictEqual(externalServicesSuccessAction.payload.rawData.data);
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isSucceeded")).toBe(true);
    });
  })

  describe("properly handle FETCH_BUSINESS_SERVICE_LINKS_REQUEST action:", () => {
    it("sets proper flags when starting fetching business links", () => {
      state = reducer(state, fetchBusinessLinkRequestAction());
      expect(state.get("isFetching")).toBe(true);
      expect(state.get("isFailed")).toBe(false);
      expect(state.get("isSucceeded")).toBe(false);
    });
  });

  describe("properly handle FETCH_EXTERNAL_SERVICES_FAIL action:", () => {
    it("sets proper flags when finish business links", () => {
      state = reducer(state, fetchBusinessLinkFailAction());
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isFailed")).toBe(true);
      expect(state.get("isSucceeded")).toBe(false);
    });
  });

  describe("properly handle FETCH_BUSINESS_SERVICE_LINKS_SUCCESS action:", () => {
    it("saves business links", () => {
      state = reducer(state, businessLinksSuccessAction);
      expect(state.getIn(["data", "links"]).toJS()).toStrictEqual(businessLinksSuccessAction.payload.data.externalServiceLinks);
      expect(state.get("isFetching")).toBe(false);
      expect(state.get("isSucceeded")).toBe(true);
    });
  });

  describe("properly handle CONNECT_EXTERNAL_SERVICES_SUCCESS action:", () => {
    it("saves connected business link", () => {
      state = reducer(state, connectServiceSuccessAction);
      expect(state.getIn(["data", "links", service.id]).toJS()).toStrictEqual(service);
    });
  });

  describe("properly handle PATCH_EXTERNAL_SERVICE_LINK_SUCCESS action:", () => {
    it("saves patched business link", () => {
      state = reducer(state, connectServiceSuccessAction);
      expect(state.getIn(["data", "links", service.id]).toJS()).toStrictEqual(service);
      state = reducer(state, patchServiceSuccessAction);
      expect(state.getIn(["data", "links", service.id]).toJS()).toStrictEqual(updatedService);
    });
  });

  describe("properly handle DELETE_EXTERNAL_SERVICE_LINK_SUCCESS action:", () => {
    it("deletes link from state", () => {
      state = reducer(state, connectServiceSuccessAction);
      expect(state.getIn(["data", "links", service.id]).toJS()).toStrictEqual(service);
      state = reducer(state, deleteServiceSuccessAction);
      expect(state.getIn(["data", "links", service.id])).toBeUndefined()
    });
  });
});
