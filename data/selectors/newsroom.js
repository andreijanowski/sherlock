export const selectNews = state =>
  state.getIn(["newsroom", "data", "newsPosts", "newsPosts"]);

export const selectBlog = state =>
  state.getIn(["newsroom", "data", "blogPosts", "blogPosts"]);

export const selectBlogPost = state =>
  state.getIn(["newsroom", "data", "blogPost"]);

export const selectNewsIsFetching = state =>
  state.getIn(["newsroom", "isFetching"]);

export const selectImage = state =>
  state.getIn(["newsroom", "image", "banners"]);
