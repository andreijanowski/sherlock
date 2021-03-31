import { FETCH_CATEGORIES_REQUEST } from "types/categories";

export const fetchCategories = (language = "en", page = 1) => ({
  type: FETCH_CATEGORIES_REQUEST,
  payload: {
    endpoint: "/api/v1/categories",
    params: {
      per_page: 500,
      page,
      language
    }
  },
  meta: { thunk: true }
});
