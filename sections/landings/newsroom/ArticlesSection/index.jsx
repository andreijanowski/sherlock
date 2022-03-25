import React from "react";
import { bool, shape, func, number } from "prop-types";
import moment from "moment";
import { useT } from "utils/hooks";
import { addProtocol } from "utils/urls";
import Button from "components/styleguide/Button";
import {
  Article,
  BlogPost,
  BlogpostTitle,
  ButtonWrapper,
  Container,
  Date,
  Image,
  InfoLabel,
  Summary,
  StyledB,
  Text,
  Title,
  FlexWrapper
} from "./styled";

const ArticlesSection = ({
  isBlog,
  articles,
  onMoreClick,
  isFetching,
  currentPage
}) => {
  const t = useT("landing");

  const hasMore =
    articles && articles.getIn(["meta", "totalPages"]) > currentPage;

  if (!articles || !articles.getIn(["data"]).size) return null;
  return (
    <Container pt={[20, null, null, 20]} pb={52} px={3}>
      <Title>
        {isBlog
          ? t("landings.newsroom.otherArticles")
          : t("landings.newsroom.other")}
      </Title>
      {isBlog && (
        <FlexWrapper
          mx={[20, null, null, 160]}
          justifyContent={["center", "center", "center", "space-between"]}
          flexWrap="wrap"
        >
          {articles.getIn(["data"]).map(article => (
            <BlogPost
              key={article.getIn(["id"])}
              href={article.getIn(["links", "self"])}
            >
              <Image
                src={article.getIn(["attributes", "coverPicture", "url"])}
              />
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
      )}
      {!isBlog && (
        <FlexWrapper
          mx={[20, null, null, 160]}
          justifyContent={["center", "center", "center", "space-between"]}
          flexWrap="wrap"
        >
          {articles.getIn(["data"]).map(article => (
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
      {hasMore && (
        <ButtonWrapper>
          <Button onClick={onMoreClick} disabled={isFetching}>
            {t("landings.newsroom.more")}
          </Button>
        </ButtonWrapper>
      )}
    </Container>
  );
};

ArticlesSection.propTypes = {
  articles: shape().isRequired,
  isBlog: bool.isRequired,
  onMoreClick: func.isRequired,
  isFetching: bool.isRequired,
  currentPage: number.isRequired
};

export default ArticlesSection;
