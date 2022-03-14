import { FETCH_NEWS_POSTS_REQUEST } from "types/newsroom";

export const fetchNewsPosts = (page = 1) => ({
  type: FETCH_NEWS_POSTS_REQUEST,
  payload: {
    endpoint: "/api/v1/news_posts",
    params: {
      per_page: page === 1 ? 11 : 10,
      page
    }
  },
  meta: { thunk: true, page }
});
