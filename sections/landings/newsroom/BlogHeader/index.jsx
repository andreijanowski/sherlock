import React from "react";

import { func, shape } from "prop-types";
import moment from "moment";

import {
  BackArrow,
  Container,
  FlexWrapper,
  Title,
  Image,
  Icon,
  Summary,
  InfoLabel
} from "./styled";

const BlogHeader = ({ content, onBackClick }) => (
  <Container pt={[20, null, null, 20]} pb={52} px={3}>
    {content && (
      <FlexWrapper
        mb={550}
        mx={[20, null, null, "atuo"]}
        justifyContent="space-between"
        flexDirection="column"
        flexWrap="wrap"
      >
        <BackArrow onClick={onBackClick}>&larr; Back to blog</BackArrow>
        <Title>{content.getIn(["attributes", "headline"])}</Title>
        <Summary>
          <b>{`${content.getIn(["attributes", "authorName"])}`}</b>,&nbsp;
          {moment(content.getIn(["attributes", "date"])).format(
            "DD MMMM, YYYY"
          )}
        </Summary>
        <InfoLabel>
          <Icon src="/static/img/clock.svg" />
          {content.getIn(["attributes", "readDuration"])}&nbsp;min read
        </InfoLabel>
        <Image src={content.getIn(["attributes", "coverPicture", "url"])} />
      </FlexWrapper>
    )}
  </Container>
);

BlogHeader.propTypes = {
  content: shape().isRequired,
  onBackClick: func.isRequired
};

export default BlogHeader;
