import React, { useCallback } from "react";
import { Box, Flex } from "@rebass/grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faCheck } from "@fortawesome/free-solid-svg-icons";

import { SUBSCRIPTION_ENTREPRISE_URL } from "consts";
import { useTranslation } from "i18n";
import {
  Container,
  H2Styled,
  ParagraphStyled,
  BookDemoButton,
  SeeSubscriptionsButton,
  ImageContainer,
  Image,
  ImageOverlay
} from "./styled";

const GetReady = () => {
  const { t } = useTranslation();
  const onBookDemoClick = useCallback(() => {
    window.open(SUBSCRIPTION_ENTREPRISE_URL, "_blank", "noreferrer noopener");
  }, []);

  const onSeeSubscriptionsClick = useCallback(() => {
    // todo check what should we do on click
  }, []);

  return (
    <Container>
      <Box width={[1, 1, 1, 3 / 5]} mb={[30, 30, 30, 0]}>
        <H2Styled>{t("plans:getReady.title")}</H2Styled>
        <Box mb={60}>
          <ParagraphStyled>{t("plans:getReady.description")}</ParagraphStyled>
        </Box>
        <Flex alignItems="flex-start" flexWrap={["wrap", "nowrap"]}>
          <Flex as={BookDemoButton} onClick={onBookDemoClick}>
            {t("plans:getReady.bookDemo")}
            <Box ml={2}>
              <FontAwesomeIcon icon={faChevronRight} />
            </Box>
          </Flex>
          <Flex as={SeeSubscriptionsButton} onClick={onSeeSubscriptionsClick}>
            {t("plans:getReady.seeSubscriptions")}
            <Box ml={2}>
              <FontAwesomeIcon icon={faChevronRight} />
            </Box>
          </Flex>
        </Flex>
      </Box>
      <ImageContainer>
        <Image src="/static/img/plansLandingTablet.png" />
        <ImageOverlay>
          <FontAwesomeIcon icon={faCheck} />
        </ImageOverlay>
      </ImageContainer>
    </Container>
  );
};

export default GetReady;
