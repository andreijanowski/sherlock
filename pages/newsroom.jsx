import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { bool, func, shape, number } from "prop-types";
import { useLng } from "utils/hooks";

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
  selectNewsIsFetching,
  selectCurrentPage
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
  image,
  page
}) => {
  const [isBlog, setIsBlog] = useState(true);
  const lng = useLng();
  useEffect(() => {
    fetchBlogPosts(1, lng).then(fetchNewsPosts(1).then(fetchImage()));
  }, [fetchNewsPosts, fetchImage, fetchBlogPosts, lng]);

  const handleChange = () => setIsBlog(!isBlog);
  const mainArticle = isBlog
    ? blogList && blogList.getIn(["data"]).first()
    : newsList && newsList.getIn(["data"]).first();
  const mainImage = isBlog
    ? mainArticle && mainArticle.getIn(["attributes", "coverPicture", "url"])
    : image && image.first().getIn(["attributes", "picture", "url"]);
  const mainAltText = isBlog
    ? mainArticle && mainArticle.getIn(["attributes", "altText"])
    : image && image.first().getIn(["attributes", "altText"]);

  const handleMoreClick = () =>
    isBlog ? fetchBlogPosts(page + 1, lng) : fetchNewsPosts(page + 1, lng);

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
          altText={mainAltText}
        />
      </TopSectionWrapper>
      <WhiteWrapper>
        <ArticlesSection
          isBlog={isBlog}
          isFetching={isFetching}
          articles={isBlog ? blogList : newsList}
          onMoreClick={handleMoreClick}
          currentPage={page}
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
  isFetching: bool.isRequired,
  page: number.isRequired
};

const mapState = state => ({
  blogList: selectBlog(state),
  newsList: selectNews(state),
  image: selectImage(state),
  isFetching: selectNewsIsFetching(state),
  page: selectCurrentPage(state)
});

const mapDispatch = {
  fetchBlogPosts: fetchBlogPostsAction,
  fetchNewsPosts: fetchNewsPostsAction,
  fetchImage: fetchImageAction
};

export default compose(connect(mapState, mapDispatch))(NewsroomPage);
