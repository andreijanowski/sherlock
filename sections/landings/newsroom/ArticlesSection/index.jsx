import React from "react";
import { arrayOf, shape } from "prop-types";
import { useT } from "utils/hooks";
import { Article, Container, Title } from "./styled";

const ArticlesSection = ({ articles }) => {
  const t = useT("landing");
  return (
    <Container pt={[20, null, null, 20]} pb={52} px={3}>
      <Title>{t("landings.newsroom.other")}</Title>
      {articles &&
        articles.map(article => (
          <Article key={article.id}>{article.date}</Article>
        ))}
    </Container>
  );
};

ArticlesSection.propTypes = {
  articles: arrayOf(shape()).isRequired
};

export default ArticlesSection;
