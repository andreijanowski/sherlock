import { FOODETECTIVE_URL } from "consts";

export const DETECTIVES_CITIES = [
  "Paris",
  "London",
  "Geneva",
  "Berlin",
  "Madrid"
];

export const getDetectiveUrl = ({ lng, detective }) =>
  `${FOODETECTIVE_URL}/${lng}/public-profile/${detective.getIn([
    "attributes",
    "slug"
  ])}`;
