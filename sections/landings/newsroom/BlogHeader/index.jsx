import React from "react";

import { func, shape } from "prop-types";
import moment from "moment";
import { useT } from "utils/hooks";

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

const BlogHeader = ({ content, onBackClick }) => {
  const t = useT("landing");

  return (
    <Container pt={[20, null, null, 20]} pb={52} px={3}>
      {content && (
        <FlexWrapper
          mb={550}
          mx={[20, null, null, "atuo"]}
          justifyContent="space-between"
          flexDirection="column"
          flexWrap="wrap"
        >
          <BackArrow onClick={onBackClick}>
            &larr;&nbsp;{t("landings.newsroom.backToBlog")}
          </BackArrow>
          <Title>{content.getIn(["attributes", "headline"])}</Title>
          <Summary>
            <b>{`${content.getIn(["attributes", "authorName"])}`}</b>,&nbsp;
            {moment(content.getIn(["attributes", "date"])).format(
              "DD MMMM, YYYY"
            )}
          </Summary>
          <InfoLabel>
            <Icon src="/static/img/clock.svg" />
            {content.getIn(["attributes", "readDuration"])}
            &nbsp;{t("landings.newsroom.minRead")}
          </InfoLabel>
          <Image
            src={content.getIn(["attributes", "coverPicture", "url"])}
            alt={content.getIn(["attributes", "altText"])}
          />
        </FlexWrapper>
      )}
    </Container>
  );
};

BlogHeader.propTypes = {
  content: shape().isRequired,
  onBackClick: func.isRequired
};

export default BlogHeader;
