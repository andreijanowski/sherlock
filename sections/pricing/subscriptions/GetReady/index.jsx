import React from "react";
import { Box, Flex } from "@rebass/grid";

import { SUBSCRIPTION_ENTREPRISE_URL, SUBSCRIPTION_PLANS } from "consts";
import { useTranslation } from "i18n";
import { getPlanLoginPath } from "utils/plans";
import Button, { BUTTON_VARIANT } from "components/styleguide/Button";
import { useLng } from "utils/hooks";
import { H1 } from "components/styleguide/Typography";
import { Container, Image, ImageContainer, H3Styled } from "./styled";

const GetReady = () => {
  const lng = useLng();
  const { t } = useTranslation();

  return (
    <Container alignItems="center" flexWrap={["wrap", "wrap", "nowrap"]}>
      <Flex
        flexDirection="column"
        alignItems={["center", null, "flex-start"]}
        width={[1, null, 1 / 2, 3 / 5]}
        mb={[30, null, null, 0]}
      >
        <H1>{t("plans:getReady.title")}</H1>
        <Box mb={60}>
          <H3Styled>{t("plans:getReady.description")}</H3Styled>
        </Box>
        <Flex
          flexDirection={["column", "row"]}
          justifyContent={["center", "flex-start"]}
          alignItems="flex-start"
          flexWrap={["wrap", "nowrap"]}
        >
          <Box mr={[0, "13px"]}>
            <Button
              as="a"
              target="_blank"
              href={SUBSCRIPTION_ENTREPRISE_URL}
              rel="noreferrer noopener"
              withArrow
            >
              {t("landing:bookDemo")}
            </Button>
          </Box>
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
        </Flex>
      </Flex>
      <Box width={[1, 1, 1 / 2, 2 / 5]} pl={[0, 0, 20]}>
        <ImageContainer>
          <Image src="/static/img/plansLandingTablet.png" />
        </ImageContainer>
      </Box>
    </Container>
  );
};

export default GetReady;
