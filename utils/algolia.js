import qs from "qs";

export const createURL = state => `?${qs.stringify(state)}`;

export const pathToSearchState = path =>
  path.includes("?") ? qs.parse(path.substring(path.indexOf("?") + 1)) : {};

export const searchStateToURL = (location, searchState) =>
  searchState ? `${location.pathname}?${qs.stringify(searchState)}` : "";
