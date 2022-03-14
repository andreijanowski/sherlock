import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { arrayOf, func, shape } from "prop-types";

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
import { selectNews } from "selectors/newsroom";
import { fetchNewsPosts as fetchNewsPostsAction } from "actions/newsroom";

const DOWNLOAD_SECTION_ID = "downloadApp";

const NewsroomPage = ({ fetchNewsPosts, newsList }) => {
  const [isBlog, setIsBlog] = useState(true);
  useEffect(() => {
    fetchNewsPosts();
  }, [fetchNewsPosts]);

  return (
    <LandingWrapper width={1} alignItems="center" flexDirection="column">
      <NavigationWrapper>
        <Navigation />
      </NavigationWrapper>
      <TopSectionWrapper>
        <TopSection
          onContentChange={setIsBlog}
          isBlog={isBlog}
          article={newsList && newsList.toList()[0]}
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
  newsList: arrayOf(shape()).isRequired
};

const mapState = state => ({
  newsList: selectNews(state)
});

const mapDispatch = {
  fetchNewsPosts: fetchNewsPostsAction
};

export default compose(
  connect(
    mapState,
    mapDispatch
  )
)(NewsroomPage);
