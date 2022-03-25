import React from "react";
import { shape } from "prop-types";
import moment from "moment";

import { useT } from "utils/hooks";
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
  const recommended = posts && posts.getIn(["data"]).slice(1, 3);
  const t = useT("landing");

  if (!recommended || !recommended.size) return null;
  return (
    <Container pt={[20, null, null, 20]} pb={52} px={3}>
      <Title>{t("landings.newsroom.recommended")}</Title>
      <FlexWrapper
        mx={[20, null, null, 160]}
        justifyContent={["center", "center", "center", "space-between"]}
        flexWrap="wrap"
      >
        {recommended.map(article => (
          <BlogPost
            key={article.getIn(["id"])}
            href={article.getIn(["links", "self"])}
            target="_blank"
          >
            <Image src={article.getIn(["attributes", "coverPicture", "url"])} />
            <InfoLabel>
              {article.getIn(["attributes", "category"])}&nbsp;•&nbsp;
              {article.getIn(["attributes", "readDuration"])}&nbsp;
              {t("landings.newsroom.minRead")}
            </InfoLabel>
            <BlogpostTitle>
              {article.getIn(["attributes", "headline"])}
            </BlogpostTitle>
            <InfoLabel>{article.getIn(["attributes", "summary"])}</InfoLabel>
            <Summary>
              <StyledB>
                {`${article.getIn(["attributes", "authorName"])}`},
              </StyledB>
              &nbsp;
              {moment(article.getIn(["attributes", "date"])).format(
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
