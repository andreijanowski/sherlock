import {
  FETCH_GROUPS_REQUEST,
  FETCH_GROUPS_SUCCESS,
  FETCH_GROUPS_FAIL
} from "types/groups";
import { LOGOUT } from "types/auth";

export const fetchGroupsRequestAction = () => ({
  type: FETCH_GROUPS_REQUEST
});

export const fetchGroupsSuccessAction = () => ({
  type: FETCH_GROUPS_SUCCESS,
  payload: {
    data: {
      groups: {
        "38773cb9-44ce-4521-8abf-932da26f22ac": {
          id: "38773cb9-44ce-4521-8abf-932da26f22ac"
        },
        "7b4fe06d-22db-499c-a459-b2245c84ee30": {
          id: "7b4fe06d-22db-499c-a459-b2245c84ee30"
        },
        "57499f23-6439-4c91-99d0-6ecc78eb3bc1": {
          id: "57499f23-6439-4c91-99d0-6ecc78eb3bc1"
        },
        "b5a7a8e4-a098-4537-af06-4f3976ba9d90": {
          id: "b5a7a8e4-a098-4537-af06-4f3976ba9d90"
        },
        "d88079a6-7178-4a70-8be0-5c01ac4e2b29": {
          id: "d88079a6-7178-4a70-8be0-5c01ac4e2b29"
        },
        "9255a57d-997b-4cc6-946d-f909dd47e296": {
          id: "9255a57d-997b-4cc6-946d-f909dd47e296"
        },
        "f6492044-ea28-4ee3-8d8b-6b6aff87ae04": {
          id: "f6492044-ea28-4ee3-8d8b-6b6aff87ae04"
        }
      }
    }
  },
  meta: {
    page: 1
  }
});

export const fetchGroupsFailAction = () => ({
  type: FETCH_GROUPS_FAIL
});

export const logoutAction = () => ({
  type: LOGOUT
});
