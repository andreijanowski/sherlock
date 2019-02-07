import {
  POST_OPEN_PERIOD_REQUEST,
  PATCH_OPEN_PERIOD_REQUEST,
  DELETE_OPEN_PERIOD_REQUEST
} from "types/openPeriods";
import { getRelationships } from "./utils";

export const postOpenPeriod = (id, attributes) => ({
  type: POST_OPEN_PERIOD_REQUEST,
  payload: {
    method: "POST",
    endpoint: `/api/v1/open_periods`,
    data: {
      data: {
        type: "open_periods",
        attributes,
        relationships: getRelationships("business", id)
      }
    }
  },
  meta: { thunk: true }
});

export const patchOpenPeriod = (id, attributes) => ({
  type: PATCH_OPEN_PERIOD_REQUEST,
  payload: {
    method: "PATCH",
    endpoint: `/api/v1/open_periods/${id}`,
    data: {
      data: {
        id,
        type: "open_periods",
        attributes
      }
    }
  },
  meta: { thunk: true }
});

export const deleteOpenPeriod = id => ({
  type: DELETE_OPEN_PERIOD_REQUEST,
  payload: {
    method: "DELETE",
    endpoint: `/api/v1/open_periods/${id}`
  },
  meta: { thunk: true, id }
});
