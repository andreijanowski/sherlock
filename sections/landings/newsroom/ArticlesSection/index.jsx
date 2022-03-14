import React from "react";
import { shape } from "prop-types";
import moment from "moment";
import { useT } from "utils/hooks";
import { Article, Container, Date, Text, Title } from "./styled";

const ArticlesSection = ({ articles }) => {
  const t = useT("landing");

  if (!articles) return null;
  return (
    <Container pt={[20, null, null, 20]} pb={52} px={3}>
      <Title>{t("landings.newsroom.other")}</Title>
      {articles.toList().map(article => (
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
  articles: shape().isRequired
};

export default ArticlesSection;
