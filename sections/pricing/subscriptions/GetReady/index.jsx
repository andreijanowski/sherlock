import React, { useCallback } from "react";
import { string } from "prop-types";
import { Box, Flex } from "@rebass/grid";

import { SUBSCRIPTION_ENTREPRISE_URL, SUBSCRIPTION_PLANS } from "consts";
import { useTranslation } from "i18n";
import { getPlanLoginPath } from "utils/plans";
import Button, { BUTTON_VARIANT } from "components/styleguide/Button";
import {
  Container,
  H2Styled,
  Image,
  ImageContainer,
  ParagraphStyled
} from "./styled";

const GetReady = ({ lng }) => {
  const { t } = useTranslation();
  const onBookDemoClick = useCallback(() => {
    window.open(SUBSCRIPTION_ENTREPRISE_URL, "_blank", "noreferrer noopener");
  }, []);

  const onRegisterNowClick = useCallback(() => {
    window.location.href = getPlanLoginPath({
      lng,
      name: SUBSCRIPTION_PLANS.ESSENTIAL
    });
  }, [lng]);

  return (
    <Container alignItems="center" flexWrap={["wrap", "wrap", "nowrap"]}>
      <Flex
        flexDirection="column"
        alignItems={["center", null, "flex-start"]}
        width={[1, null, 1 / 2, 3 / 5]}
        mb={[30, null, null, 0]}
      >
        <H2Styled>{t("plans:getReady.title")}</H2Styled>
        <Box mb={60}>
          <ParagraphStyled>{t("plans:getReady.description")}</ParagraphStyled>
        </Box>
        <Flex
          flexDirection={["column", "row"]}
          justifyContent={["center", "flex-start"]}
          alignItems="flex-start"
          flexWrap={["wrap", "nowrap"]}
        >
          <Box mr={[0, "13px"]}>
            <Button onClick={onBookDemoClick} withArrow>
              {t("plans:getReady.bookDemo")}
            </Button>
          </Box>
          <Button
            variant={BUTTON_VARIANT.SECONDARY}
            onClick={onRegisterNowClick}
            withArrow
          >
            {t("plans:getReady.registerNow")}
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

GetReady.propTypes = {
  lng: string.isRequired
};

export default GetReady;
