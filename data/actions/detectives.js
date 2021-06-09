import {
  FETCH_TOP_DETECTIVE_REQUEST,
  FETCH_DETECTIVES_REQUEST
} from "types/detectives";

export const fetchTopDetective = () => ({
  type: FETCH_TOP_DETECTIVE_REQUEST,
  payload: {
    endpoint: "/api/v1/users/detectives",
    params: {
      page: 1,
      per_page: 1
    }
  },
  meta: { thunk: true }
});

export const fetchDetectives = ({ city = "", excludeCities = [] }) => ({
  type: FETCH_DETECTIVES_REQUEST,
  payload: {
    endpoint: "/api/v1/users/detectives",
    params: {
      page: 1,
      per_page: 5,
      ...(excludeCities.length
        ? {
            "filter[exclude_cities]": excludeCities
          }
        : {
            "filter[city]": city
          })
    }
  },
  meta: { thunk: true, city }
});
