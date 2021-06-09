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

export const fetchDetectives = ({ city = "", excludeCities = [] }) => {
  const endpoint = excludeCities.length
    ? `/api/v1/users/detectives?${excludeCities
        .map(excludeCity => `filter[exclude_cities][]=${excludeCity}`)
        .join("&")}`
    : `/api/v1/users/detectives?filter[city]=${city}`;

  return {
    type: FETCH_DETECTIVES_REQUEST,
    payload: {
      endpoint,
      params: {
        page: 1,
        per_page: 5
      }
    },
    meta: { thunk: true, city }
  };
};
