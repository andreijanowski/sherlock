import React from "react";
import { bool, shape } from "prop-types";
import moment from "moment";
import { useT } from "utils/hooks";
import { Flex } from "@rebass/grid";
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
  Title
} from "./styled";

const ArticlesSection = ({ isBlog, articles }) => {
  const t = useT("landing");

  if (!articles) return null;
  return (
    <Container pt={[20, null, null, 20]} pb={52} px={3}>
      <Title>{isBlog ? "Other articles" : t("landings.newsroom.other")}</Title>
      {isBlog && (
        <Flex
          mx={[20, null, null, 160]}
          justifyContent="space-between"
          flexWrap="wrap"
          maxWidth="1300"
        >
          {articles.toList().map(article => (
            <BlogPost
              key={article.getIn(["id"])}
              href={`//${article.getIn(["attributes", "url"])}`}
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
        </Flex>
      )}
      {!isBlog &&
        articles.toList().map(article => (
          <Article
            key={article.getIn(["id"])}
            href={`//${article.getIn(["attributes", "url"])}`}
          >
            <Date>
              {moment(article.getIn(["attributes", "date"])).format(
                "MMMM D, YYYY"
              )}
            </Date>
            <Text>{article.getIn(["attributes", "headline"])}</Text>
          </Article>
        ))}
    </Container>
  );
};

ArticlesSection.propTypes = {
  articles: shape().isRequired,
  isBlog: bool.isRequired
};

export default ArticlesSection;
