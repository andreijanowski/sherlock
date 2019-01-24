/* eslint-disable import/prefer-default-export */
import { FETCH_GROUPS_REQUEST } from "types/groups";

export const fetchGroups = () => ({
  type: FETCH_GROUPS_REQUEST,
  payload: {
    endpoint: "/api/v1/groups",
    params: {
      per_page: 500,
      page: 1
    }
  },
  meta: { thunk: true }
});
