import React from "react";
import { bool, shape } from "prop-types";
import moment from "moment";
import { useT } from "utils/hooks";
import { addProtocol } from "utils/urls";
import {
  Article,
  BlogPost,
  BlogpostTitle,
  Container,
  Date,
  Image,
  InfoLabel,
  Summary,
  Text,
  Title,
  FlexWrapper
} from "./styled";

const ArticlesSection = ({ isBlog, articles }) => {
  const t = useT("landing");

  if (!articles) return null;
  return (
    <Container pt={[20, null, null, 20]} pb={52} px={3}>
      <Title>{isBlog ? "Other articles" : t("landings.newsroom.other")}</Title>
      {isBlog && (
        <FlexWrapper
          mx={[20, null, null, 160]}
          justifyContent={["center", "center", "center", "space-between"]}
          flexWrap="wrap"
        >
          {articles.toList().map(article => (
            <BlogPost
              key={article.getIn(["id"])}
              href={article.getIn(["links", "self"])}
              target="_blank"
            >
              <Image
                src={article.getIn(["attributes", "coverPicture", "url"])}
              />
              <InfoLabel>{`  •  ${article.getIn([
                "attributes",
                "category"
              ])}  •  ${article.getIn([
                "attributes",
                "readDuration"
              ])} min read`}</InfoLabel>
              <BlogpostTitle>
                {article.getIn(["attributes", "headline"])}
              </BlogpostTitle>
              <InfoLabel>{article.getIn(["attributes", "summary"])}</InfoLabel>
              <Summary>{`${article.getIn([
                "attributes",
                "authorName"
              ])}, ${moment(article.getIn(["attributes", "date"])).format(
                "DD MMMM, YYYY"
              )}`}</Summary>
            </BlogPost>
          ))}
        </FlexWrapper>
      )}
      {!isBlog && (
        <FlexWrapper
          mx={[20, null, null, 160]}
          justifyContent={["center", "center", "center", "space-between"]}
          flexWrap="wrap"
        >
          {articles.toList().map(article => (
            <Article
              key={article.getIn(["id"])}
              href={addProtocol(article.getIn(["attributes", "url"]))}
              target="_blank"
            >
              <Date>
                {moment(article.getIn(["attributes", "date"])).format(
                  "MMMM D, YYYY"
                )}
              </Date>
              <Text>{article.getIn(["attributes", "headline"])}</Text>
            </Article>
          ))}
        </FlexWrapper>
      )}
    </Container>
  );
};

ArticlesSection.propTypes = {
  articles: shape().isRequired,
  isBlog: bool.isRequired
};

export default ArticlesSection;
