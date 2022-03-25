import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { useRouter } from "next/router";
import { func, shape } from "prop-types";

import { Footer } from "components";
import {
  BlogHeader,
  ChaptersSection,
  Recommended
} from "sections/landings/newsroom";
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
import { useLng } from "utils/hooks";

import { selectBlogPost, selectBlog } from "selectors/newsroom";
import {
  fetchBlogPostContent as fetchBlogPostContentAction,
  fetchBlogPosts as fetchBlogPostsAction
} from "actions/newsroom";

const DOWNLOAD_SECTION_ID = "downloadApp";

const BlogPostPage = ({
  fetchBlogPostContent,
  blogPost,
  blogList,
  fetchBlogPosts
}) => {
  const router = useRouter();
  const lng = useLng();
  const { id } = router.query;
  const post = blogPost && blogPost.getIn(["blogPosts"]);
  const chapters = blogPost && blogPost.getIn(["chapters"]);
  const pictures = blogPost && blogPost.getIn(["pictures"]);

  const handleBack = () => {
    router.push("/newsroom");
  };

  useEffect(() => {
    fetchBlogPostContent(id, lng);
    fetchBlogPosts(1, lng);
  }, [fetchBlogPostContent, fetchBlogPosts, id, lng]);

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
        <Recommended posts={blogList} />
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
  blogList: shape().isRequired,
  fetchBlogPostContent: func.isRequired,
  fetchBlogPosts: func.isRequired
};

const mapState = state => ({
  blogList: selectBlog(state),
  blogPost: selectBlogPost(state)
});

const mapDispatch = {
  fetchBlogPostContent: fetchBlogPostContentAction,
  fetchBlogPosts: fetchBlogPostsAction
};

export default compose(
  connect(
    mapState,
    mapDispatch
  )
)(BlogPostPage);
