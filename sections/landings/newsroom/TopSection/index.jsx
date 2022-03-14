import React from "react";

import { bool, func } from "prop-types";

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

const TopSection = ({ onContentChange, isBlog }) => {
  const t = useT("landing");

  return (
    <Container pt={[20, null, null, 20]} pb={52} px={3}>
      <Title>{t("landings.newsroom.title")}</Title>
      <SwitchBlogButton onChange={onContentChange} isBlog={isBlog} />
      <Flex mb={250} mx={160} justifyContent="space-between">
        <MainArticle>
          <FeatureLabel>{t("landings.newsroom.featured")}</FeatureLabel>
          <StyledH2>
            Sneak a peak into our Las Vegas experience at CES 2022.
          </StyledH2>
          <StyledH3>
            Explore how tech meets innovation and follow us in this cosmic ride
            ! Read the news
          </StyledH3>
        </MainArticle>
        <Image src="/static/img/newsroom.png" />
      </Flex>
    </Container>
  );
};

TopSection.propTypes = {
  onContentChange: func.isRequired,
  isBlog: bool.isRequired
  // article: shape().isRequired
};

export default TopSection;
