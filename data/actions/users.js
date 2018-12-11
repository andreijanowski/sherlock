import { FETCH_PROFILE_REQUEST } from "types/users";

// eslint-disable-next-line import/prefer-default-export
export const fetchProfile = () => ({
  type: FETCH_PROFILE_REQUEST,
  payload: {
    endpoint: "/api/v1/users/me"
  },
  meta: { thunk: true }
});
