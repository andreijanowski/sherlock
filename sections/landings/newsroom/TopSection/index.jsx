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
  MainArticle
} from "./styled";

const TopSection = ({ onContentChange, isBlog, article, image }) => {
  const t = useT("landing");
  const img = image && image.getIn(["attributes", "picture", "url"]);

  return (
    <Container pt={[20, null, null, 20]} pb={52} px={3}>
      <Title>{t("landings.newsroom.title")}</Title>
      <SwitchBlogButton onChange={onContentChange} isBlog={isBlog} />
      <Flex
        mb={250}
        mx={[20, null, null, 160]}
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <MainArticle>
          <FeatureLabel>{t("landings.newsroom.featured")}</FeatureLabel>
          <StyledH2>
            {article && article.getIn(["attributes", "headline"])}
          </StyledH2>
          <StyledH3>
            {article && article.getIn(["attributes", "date"])}
          </StyledH3>
        </MainArticle>
        {img && <Image src={img} />}
      </Flex>
    </Container>
  );
};

TopSection.propTypes = {
  onContentChange: func.isRequired,
  isBlog: bool.isRequired,
  article: shape().isRequired,
  image: shape().isRequired
};

export default TopSection;
