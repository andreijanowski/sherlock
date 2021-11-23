import React, { useCallback } from "react";
import { string } from "prop-types";
import { Box, Flex } from "@rebass/grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { SUBSCRIPTION_ENTREPRISE_URL, SUBSCRIPTION_PLANS } from "consts";
import { useTranslation } from "i18n";
import { getPlanLoginPath } from "utils/plans";
import {
  BookDemoButton,
  Container,
  H2Styled,
  Image,
  ImageContainer,
  ParagraphStyled,
  RegisterNowButton
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
          <Flex as={BookDemoButton} onClick={onBookDemoClick}>
            {t("plans:getReady.bookDemo")}
            <Box ml={2}>
              <FontAwesomeIcon icon={faChevronRight} />
            </Box>
          </Flex>
          <Flex as={RegisterNowButton} onClick={onRegisterNowClick}>
            {t("plans:getReady.registerNow")}
            <Box ml={2}>
              <FontAwesomeIcon icon={faChevronRight} />
            </Box>
          </Flex>
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
