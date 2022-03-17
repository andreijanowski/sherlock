export const selectNews = state =>
  state.getIn(["newsroom", "data", "newsPosts", "newsPosts"]);

export const selectBlog = state =>
  state.getIn(["newsroom", "data", "blogPosts", "blogPosts"]);

export const selectNewsIsFetching = state =>
  state.getIn(["newsroom", "isFetching"]);

export const selectImage = state =>
  state.getIn(["newsroom", "image", "banners"]);
