import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { func, shape } from "prop-types";

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
import { selectNews, selectImage } from "selectors/newsroom";
import {
  fetchNewsPosts as fetchNewsPostsAction,
  fetchImage as fetchImageAction
} from "actions/newsroom";

const DOWNLOAD_SECTION_ID = "downloadApp";

const NewsroomPage = ({ fetchNewsPosts, fetchImage, newsList, image }) => {
  const [isBlog, setIsBlog] = useState(true);
  useEffect(() => {
    fetchNewsPosts();
    fetchImage();
  }, [fetchNewsPosts, fetchImage]);

  return (
    <LandingWrapper width={1} alignItems="center" flexDirection="column">
      <NavigationWrapper>
        <Navigation />
      </NavigationWrapper>
      <TopSectionWrapper>
        <TopSection
          onContentChange={setIsBlog}
          isBlog={isBlog}
          article={newsList && newsList.first()}
          image={image && image.first()}
        />
      </TopSectionWrapper>
      <WhiteWrapper>
        <ArticlesSection isBlog={isBlog} articles={newsList} />
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
  fetchNewsPosts: func.isRequired,
  fetchImage: func.isRequired,
  newsList: shape().isRequired,
  image: shape().isRequired
};

const mapState = state => ({
  newsList: selectNews(state),
  image: selectImage(state)
});

const mapDispatch = {
  fetchNewsPosts: fetchNewsPostsAction,
  fetchImage: fetchImageAction
};

export default compose(
  connect(
    mapState,
    mapDispatch
  )
)(NewsroomPage);
