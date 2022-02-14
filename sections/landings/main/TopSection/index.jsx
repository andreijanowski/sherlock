import React from "react";
import { Box, Flex } from "@rebass/grid";

import { SUBSCRIPTION_PLANS } from "consts";
import Button, { BUTTON_VARIANT } from "components/styleguide/Button";
import { DemoButton, ImagesSlider, TopPartnersList } from "components/Landing";
import { useLng, useT } from "utils/hooks";
import { getPlanLoginPath } from "utils/plans";
import { WRAPPER_WIDTH } from "utils/theme";
import { TextScroller } from "components";
import {
  H1Styled,
  ImagesSliderColumn,
  ImagesSliderContainer,
  ParagraphStyled
} from "./styled";

const images = [
  "/static/img/topsection/dashboard.png",
  "/static/img/topsection/integrations.png",
  "/static/img/topsection/customers.png"
];

const TopSection = () => {
  const t = useT();
  const lng = useLng();
  return (
    <Box width={1} pb="50px">
      <Flex
        alignItems="start"
        flexWrap="wrap"
        m="auto"
        width={[1, null, null, WRAPPER_WIDTH]}
        px={3}
        mb={[5, null, null, "150px"]}
      >
        <Box width={[1, 1, 1, 1 / 2]} pt={[46, null, null, 60]}>
          <H1Styled tabletCentered>
            {t("landing:topSection.header.start")}
            <TextScroller
              key={lng}
              scrollerProps={{
                alignItems: ["center", null, null, "flex-start"]
              }}
              words={t("landing:topSection.header.middle", {
                returnObjects: true
              })}
            />
            {t("landing:topSection.header.end")}
          </H1Styled>
          <ImagesSliderColumn
            display={["block", null, null, "none"]}
            width={[1, 1, 1, 1 / 2]}
            mb={50}
          >
            <ImagesSliderContainer>
              <ImagesSlider images={images} />
            </ImagesSliderContainer>
          </ImagesSliderColumn>
          <ParagraphStyled>{t("landing:topSection.paragraph")}</ParagraphStyled>
          <Flex
            alignItems="center"
            flexWrap="wrap"
            justifyContent={["center", null, null, "start"]}
          >
            <Box width={[1, null, "auto"]} mr={[0, null, 16]} my={2}>
              <DemoButton />
            </Box>
            <Box width={[1, null, "auto"]} my={2}>
              <Button
                variant={BUTTON_VARIANT.SECONDARY}
                as="a"
                target="_blank"
                href={getPlanLoginPath({
                  lng,
                  name: SUBSCRIPTION_PLANS.ESSENTIAL
                })}
                rel="noreferrer noopener"
                withArrow
              >
                {t("landing:registerNow")}
              </Button>
            </Box>
          </Flex>
        </Box>
        <ImagesSliderColumn
          display={["none", null, null, "block"]}
          width={[1, 1, 1, 1 / 2]}
          pt={[30, 40]}
        >
          <ImagesSliderContainer>
            <ImagesSlider images={images} />
          </ImagesSliderContainer>
        </ImagesSliderColumn>
      </Flex>
      <TopPartnersList />
    </Box>
  );
};

export default TopSection;
