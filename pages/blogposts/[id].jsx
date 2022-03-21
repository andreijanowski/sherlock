import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { useRouter } from "next/router";
import { func, shape } from "prop-types";

import { Footer } from "components";
import { BlogHeader, ChaptersSection } from "sections/landings/newsroom";
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

import { selectBlogPost } from "selectors/newsroom";
import { fetchBlogPostContent as fetchBlogPostContentAction } from "actions/newsroom";

const DOWNLOAD_SECTION_ID = "downloadApp";

const BlogPostPage = ({ fetchBlogPostContent, blogPost }) => {
  const router = useRouter();
  const { id } = router.query;
  const post = blogPost && blogPost.getIn(["blogPosts"]);
  const chapters = blogPost && blogPost.getIn(["chapters"]);
  const pictures = blogPost && blogPost.getIn(["pictures"]);

  const handleBack = () => {
    router.push("/newsroom");
  };

  useEffect(() => {
    fetchBlogPostContent(id);
  }, [fetchBlogPostContent, id]);

  return (
    <LandingWrapper width={1} alignItems="center" flexDirection="column">
      <NavigationWrapper>
        <Navigation />
      </NavigationWrapper>
      <TopSectionWrapper>
        <BlogHeader content={post && post.first()} onBackClick={handleBack} />
      </TopSectionWrapper>
      <WhiteWrapper>
        <ChaptersSection chapters={chapters} pictures={pictures} />
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

BlogPostPage.propTypes = {
  blogPost: shape().isRequired,
  fetchBlogPostContent: func.isRequired
};

const mapState = state => ({
  blogPost: selectBlogPost(state)
});

const mapDispatch = {
  fetchBlogPostContent: fetchBlogPostContentAction
};

export default compose(
  connect(
    mapState,
    mapDispatch
  )
)(BlogPostPage);
