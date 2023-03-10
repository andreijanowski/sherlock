import {
  FETCH_BLOG_POST_REQUEST,
  FETCH_BLOG_POST_SUCCESS,
  FETCH_BLOG_POST_FAIL,
  FETCH_BLOG_POSTS_REQUEST,
  FETCH_BLOG_POSTS_SUCCESS,
  FETCH_BLOG_POSTS_FAIL,
  FETCH_NEWS_POSTS_REQUEST,
  FETCH_NEWS_POSTS_SUCCESS,
  FETCH_NEWS_POSTS_FAIL,
  FETCH_IMAGE_SUCCESS
} from "types/newsroom";

import { Record, Map, fromJS } from "immutable";

export const initialState = Record({
  data: Map(),
  image: Map(),
  isFetching: true,
  isFailed: false,
  isSucceeded: false,
  page: 1
})();

const reducer = (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case FETCH_BLOG_POST_REQUEST: {
      return state.merge(
        Record({
          isFetching: true,
          isFailed: false,
          isSucceeded: false
        })()
      );
    }
    case FETCH_BLOG_POST_SUCCESS: {
      let newState = state.merge(
        Record({
          isFetching: false,
          isSucceeded: true
        })()
      );
      newState = newState.mergeIn(["data", "blogPost"], fromJS(payload.data));
      return newState;
    }
    case FETCH_BLOG_POST_FAIL: {
      return state.merge(
        Record({
          isFetching: false,
          isFailed: true
        })()
      );
    }

    case FETCH_NEWS_POSTS_REQUEST: {
      return state.merge(
        Record({
          isFetching: true,
          isFailed: false,
          isSucceeded: false
        })()
      );
    }
    case FETCH_NEWS_POSTS_SUCCESS: {
      let newState = state.merge(
        Record({
          isFetching: false,
          isSucceeded: true,
          page: meta.page
        })()
      );
      if (meta.page === 1) {
        newState = newState.setIn(
          ["data", "newsPosts"],
          fromJS(payload.rawData)
        );
      } else {
        newState = newState.mergeDeepIn(
          ["data", "newsPosts"],
          fromJS(payload.rawData)
        );
      }
      return newState;
    }
    case FETCH_NEWS_POSTS_FAIL: {
      return state.merge(
        Record({
          isFetching: false,
          isFailed: true
        })()
      );
    }

    case FETCH_BLOG_POSTS_REQUEST: {
      return state.merge(
        Record({
          isFetching: true,
          isFailed: false,
          isSucceeded: false
        })()
      );
    }
    case FETCH_BLOG_POSTS_SUCCESS: {
      let newState = state.merge(
        Record({
          isFetching: false,
          isSucceeded: true,
          page: meta.page
        })()
      );
      if (meta.page === 1) {
        newState = newState.setIn(
          ["data", "blogPosts"],
          fromJS(payload.rawData)
        );
      } else {
        newState = newState.mergeDeepIn(
          ["data", "blogPosts"],
          fromJS(payload.rawData)
        );
      }
      return newState;
    }
    case FETCH_BLOG_POSTS_FAIL: {
      return state.merge(
        Record({
          isFetching: false,
          isFailed: true
        })()
      );
    }

    case FETCH_IMAGE_SUCCESS: {
      return state.setIn(["image"], fromJS(payload.data));
    }

    default: {
      return state;
    }
  }
};

export default reducer;
