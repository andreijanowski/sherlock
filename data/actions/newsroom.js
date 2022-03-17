import {
  FETCH_BLOG_POSTS_REQUEST,
  FETCH_NEWS_POSTS_REQUEST,
  FETCH_IMAGE_REQUEST
} from "types/newsroom";

export const fetchBlogPosts = (page = 1) => ({
  type: FETCH_BLOG_POSTS_REQUEST,
  payload: {
    endpoint: "/api/v1/blog_posts",
    params: {
      per_page: 6,
      page
    }
  },
  meta: { thunk: true, page }
});

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

export const fetchImage = () => ({
  type: FETCH_IMAGE_REQUEST,
  payload: {
    endpoint: "/api/v1/banners/newsroom"
  },
  meta: { thunk: true }
});
