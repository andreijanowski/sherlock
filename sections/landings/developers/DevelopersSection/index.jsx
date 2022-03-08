import React from "react";
import { Box, Flex } from "@rebass/grid";

import { useT } from "utils/hooks";
import { H1Landing } from "components/styleguide/Typography";
import { AdaptiveBox } from "components/styleguide/common";
import { CTAButton } from "components/Landing";
import { apiGuideLink } from "consts";
import {
  APIImage,
  Container,
  H2Styled,
  FeatureImage,
  FlexWrapper,
  Image,
  ImageContainer,
  Overlay,
  SubtitleStyled
} from "./styled";

const DevelopersSection = () => {
  const t = useT();

  return (
    <Container
      alignItems="center"
      px={3}
      pt="90px"
      pb={["80px", null, null, "0"]}
      flexWrap={["wrap", "wrap", "nowrap"]}
    >
      <FlexWrapper
        flexDirection="column"
        alignItems={["center", null, null, "flex-start"]}
        width={[1, null, null, 3 / 5]}
      >
        <H1Landing tabletCentered mb={["24px", null, null, "0"]}>
          {t("landing:landings.developers.title")}
        </H1Landing>
        <Box mb={[48, null, null, 60]}>
          <AdaptiveBox>
            <H2Styled>{t("landing:landings.developers.subtitle")}</H2Styled>
          </AdaptiveBox>
          <AdaptiveBox>
            <SubtitleStyled tabletCentered>
              {t("landing:landings.developers.description")}
            </SubtitleStyled>
          </AdaptiveBox>
        </Box>
        <Flex
          width={1}
          flexDirection={["column", null, "row"]}
          justifyContent={["center", null, null, "flex-start"]}
        >
          <CTAButton
            label={t("landing:landings.developers.cta")}
            href={apiGuideLink}
            mr={[0, null, "13px"]}
            mb={[3, null, 0]}
            width={[1, null, "auto"]}
          />
        </Flex>
      </FlexWrapper>
      <AdaptiveBox width={[1, null, 1 / 2, 2 / 5]} pl={[0, null, 20]}>
        <ImageContainer>
          <APIImage src="/static/img/developersapi.svg" />
          <Overlay />
          <FeatureImage>
            <Image src="/static/img/geats.svg" />
          </FeatureImage>
        </ImageContainer>
      </AdaptiveBox>
    </Container>
  );
};

export default DevelopersSection;
