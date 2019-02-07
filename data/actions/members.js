import {
  POST_MEMBER_REQUEST,
  PATCH_MEMBER_REQUEST,
  DELETE_MEMBER_REQUEST
} from "types/members";
import { getRelationships } from "./utils";

export const postMember = (values, id) => ({
  type: POST_MEMBER_REQUEST,
  payload: {
    method: "POST",
    endpoint: "/api/v1/members",
    data: {
      data: {
        type: "members",
        attributes: {
          ...values
        },
        relationships: getRelationships("business", id)
      }
    }
  },
  meta: { thunk: true }
});

export const patchMember = (id, values) => ({
  type: PATCH_MEMBER_REQUEST,
  payload: {
    method: "PATCH",
    endpoint: `/api/v1/members/${id}`,
    data: {
      data: {
        id,
        type: "members",
        attributes: {
          ...values
        }
      }
    }
  },
  meta: { thunk: true }
});

export const deleteMember = id => ({
  type: DELETE_MEMBER_REQUEST,
  payload: {
    method: "DELETE",
    endpoint: `/api/v1/members/${id}`
  },
  meta: { thunk: true }
});
