import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { bool, func, shape } from "prop-types";

import { Footer } from "components";
import {
  FooterWrapper,
  GetReadyLandingTopGradientWrapper,
  InstallAppWrapper,
  LandingWrapper,
  NavigationWrapper
} from "sections/landings/common/sharedStyled";
import { GetReady, InstallApp, Navigation } from "sections/landings/common";
import {
  TopSectionWrapper,
  WhiteWrapper
} from "sections/landings/product/styled";
import { TopSection, ArticlesSection } from "sections/landings/newsroom";
import {
  selectBlog,
  selectNews,
  selectImage,
  selectNewsIsFetching
} from "selectors/newsroom";
import {
  fetchNewsPosts as fetchNewsPostsAction,
  fetchImage as fetchImageAction,
  fetchBlogPosts as fetchBlogPostsAction
} from "actions/newsroom";

const DOWNLOAD_SECTION_ID = "downloadApp";

const NewsroomPage = ({
  blogList,
  fetchBlogPosts,
  fetchNewsPosts,
  fetchImage,
  isFetching,
  newsList,
  image
}) => {
  const [isBlog, setIsBlog] = useState(true);
  useEffect(() => {
    fetchBlogPosts().then(fetchNewsPosts().then(fetchImage()));
  }, [fetchNewsPosts, fetchImage, fetchBlogPosts]);

  const handleChange = () => setIsBlog(!isBlog);
  const mainArticle = isBlog
    ? blogList && blogList.first()
    : newsList && newsList.first();
  const mainImage = isBlog
    ? mainArticle && mainArticle.getIn(["attributes", "coverPicture", "url"])
    : image && image.first().getIn(["attributes", "picture", "url"]);

  return (
    <LandingWrapper width={1} alignItems="center" flexDirection="column">
      <NavigationWrapper>
        <Navigation />
      </NavigationWrapper>
      <TopSectionWrapper>
        <TopSection
          onContentChange={handleChange}
          isBlog={isBlog}
          isFetching={isFetching}
          article={mainArticle}
          image={mainImage}
        />
      </TopSectionWrapper>
      <WhiteWrapper>
        <ArticlesSection
          isBlog={isBlog}
          articles={isBlog ? blogList : newsList}
        />
      </WhiteWrapper>
      <GetReadyLandingTopGradientWrapper>
        <GetReady />
      </GetReadyLandingTopGradientWrapper>
      <InstallAppWrapper id={DOWNLOAD_SECTION_ID}>
        <InstallApp />
      </InstallAppWrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </LandingWrapper>
  );
};

NewsroomPage.propTypes = {
  blogList: shape().isRequired,
  fetchBlogPosts: func.isRequired,
  fetchNewsPosts: func.isRequired,
  fetchImage: func.isRequired,
  newsList: shape().isRequired,
  image: shape().isRequired,
  isFetching: bool.isRequired
};

const mapState = state => ({
  blogList: selectBlog(state),
  newsList: selectNews(state),
  image: selectImage(state),
  isFetching: selectNewsIsFetching(state)
});

const mapDispatch = {
  fetchBlogPosts: fetchBlogPostsAction,
  fetchNewsPosts: fetchNewsPostsAction,
  fetchImage: fetchImageAction
};

export default compose(
  connect(
    mapState,
    mapDispatch
  )
)(NewsroomPage);
