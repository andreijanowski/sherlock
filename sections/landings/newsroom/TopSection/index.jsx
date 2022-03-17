import React from "react";

import { bool, func, shape } from "prop-types";

import { useT } from "utils/hooks";
import { SwitchBlogButton } from "components/Landing";
import { Flex } from "@rebass/grid";
import {
  Container,
  Title,
  StyledH2,
  StyledH3,
  Image,
  FeatureLabel,
  InfoLabel,
  MainArticle
} from "./styled";

const TopSection = ({
  onContentChange,
  isBlog,
  isFetching,
  article,
  image
}) => {
  const t = useT("landing");
  console.log(article && article.toJS());

  return (
    <Container pt={[20, null, null, 20]} pb={52} px={3}>
      <Title>{t("landings.newsroom.title")}</Title>
      <SwitchBlogButton
        onChange={onContentChange}
        isBlog={isBlog}
        isFetching={isFetching}
      />
      {article && (
        <Flex
          mb={250}
          mx={[20, null, null, 160]}
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <MainArticle>
            <FeatureLabel>{t("landings.newsroom.featured")}</FeatureLabel>
            {isBlog && (
              <InfoLabel>
                {`  •  ${article.getIn([
                  "attributes",
                  "category"
                ])}  •  ${article.getIn([
                  "attributes",
                  "readDuration"
                ])} min read`}
              </InfoLabel>
            )}
            <StyledH2>
              {isBlog
                ? article.getIn(["attributes", "headline"])
                : article.getIn(["attributes", "headline"])}
            </StyledH2>
            <StyledH3>
              {isBlog
                ? article.getIn(["attributes", "summary"])
                : article.getIn(["attributes", "date"])}
            </StyledH3>
          </MainArticle>
          {image && <Image src={image} />}
        </Flex>
      )}
    </Container>
  );
};

TopSection.propTypes = {
  onContentChange: func.isRequired,
  isBlog: bool.isRequired,
  article: shape().isRequired,
  image: shape().isRequired,
  isFetching: bool.isRequired
};

export default TopSection;
