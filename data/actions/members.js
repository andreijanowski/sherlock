import {
  CREATE_MEMBER_REQUEST,
  UPDATE_MEMBER_REQUEST,
  DELETE_MEMBER_REQUEST,
  ACCEPT_REQUEST,
  REJECT_REQUEST
} from "types/members";

export const createMember = (id, values) => ({
  type: CREATE_MEMBER_REQUEST,
  payload: {
    method: "POST",
    endpoint: "/api/v1/members",
    data: {
      data: {
        type: "members",
        attributes: {
          ...values
        },
        relationships: {
          business: {
            data: {
              type: "business",
              id
            }
          }
        }
      }
    }
  },
  meta: { thunk: true }
});

export const updateMember = (id, values) => ({
  type: UPDATE_MEMBER_REQUEST,
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

export const acceptInvitation = values => ({
  type: ACCEPT_REQUEST,
  payload: {
    method: "PATCH",
    endpoint: `/api/v1/members/accept`,
    data: {
      data: {
        type: "members",
        attributes: {
          ...values
        }
      }
    }
  },
  meta: { thunk: true }
});

export const rejectInvitation = token => ({
  type: REJECT_REQUEST,
  payload: {
    method: "PATCH",
    endpoint: `/api/v1/members/reject`,
    data: {
      data: {
        type: "members",
        attributes: {
          auth_token: token
        }
      }
    }
  },
  meta: { thunk: true }
});
