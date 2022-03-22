import React from "react";
import { shape } from "prop-types";
import moment from "moment";

import {
  BlogPost,
  BlogpostTitle,
  Container,
  Image,
  InfoLabel,
  Summary,
  StyledB,
  Title,
  FlexWrapper
} from "./styled";

const Recommended = ({ posts }) => {
  const recommended = posts && posts.toArray().slice(1, 3);

  if (!recommended) return null;
  return (
    <Container pt={[20, null, null, 20]} pb={52} px={3}>
      <Title>Recommended Reading</Title>
      <FlexWrapper
        mx={[20, null, null, 160]}
        justifyContent={["center", "center", "center", "space-between"]}
        flexWrap="wrap"
      >
        {recommended.map(article => (
          <BlogPost
            key={article[1].getIn(["id"])}
            href={article[1].getIn(["links", "self"])}
            target="_blank"
          >
            <Image
              src={article[1].getIn(["attributes", "coverPicture", "url"])}
            />
            <InfoLabel>
              {article[1].getIn(["attributes", "category"])}&nbsp;•&nbsp;
              {article[1].getIn(["attributes", "readDuration"])}&nbsp;min read
            </InfoLabel>
            <BlogpostTitle>
              {article[1].getIn(["attributes", "headline"])}
            </BlogpostTitle>
            <InfoLabel>{article[1].getIn(["attributes", "summary"])}</InfoLabel>
            <Summary>
              <StyledB>
                {`${article[1].getIn(["attributes", "authorName"])}`},
              </StyledB>
              &nbsp;
              {moment(article[1].getIn(["attributes", "date"])).format(
                "DD MMMM, YYYY"
              )}
            </Summary>
          </BlogPost>
        ))}
      </FlexWrapper>
    </Container>
  );
};

Recommended.propTypes = {
  posts: shape().isRequired
};

export default Recommended;
