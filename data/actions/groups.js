import { FETCH_GROUPS_REQUEST } from "types/groups";

export const fetchGroups = (page = 1) => ({
  type: FETCH_GROUPS_REQUEST,
  payload: {
    endpoint: "/api/v1/groups",
    params: {
      per_page: 500,
      page
    }
  },
  meta: { thunk: true, page }
});
