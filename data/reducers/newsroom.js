import {
  FETCH_NEWS_POSTS_REQUEST,
  FETCH_NEWS_POSTS_SUCCESS,
  FETCH_NEWS_POSTS_FAIL,
  FETCH_IMAGE_SUCCESS
} from "types/newsroom";

import { Record, Map, fromJS } from "immutable";

export const initialState = Record({
  data: Map(),
  image: Map(),
  isFetching: false,
  isFailed: false,
  isSucceeded: false
})();

const reducer = (state = initialState, { type, payload, meta }) => {
  switch (type) {
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
          isSucceeded: true
        })()
      );
      if (meta.page === 1) {
        newState = newState.setIn(["data"], fromJS(payload.data));
      } else {
        newState = newState.mergeDeepIn(["data"], fromJS(payload.data));
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

    case FETCH_IMAGE_SUCCESS: {
      return state.setIn(["image"], fromJS(payload.data));
    }

    default: {
      return state;
    }
  }
};

export default reducer;
