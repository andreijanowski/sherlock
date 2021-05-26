import React from "react";
import { func, oneOfType, shape, any } from "prop-types";
import { Box, Flex } from "@rebass/grid";
import { Button } from "components";
import { DevelopersAndApiWrapper } from "./styled";
import { BlueText, H2Styled, ParagraphStyled } from "../sharedStyled";

const DevelopersAndApi = ({ t, developersAndApiRef }) => (
  <DevelopersAndApiWrapper ref={developersAndApiRef}>
    <Box width={[1, 1 / 2]}>
      <H2Styled>{t("developersAndApi.header")}</H2Styled>
      <ParagraphStyled big>
        {t("developersAndApi.subHeader.start")}
        <BlueText>{t("developersAndApi.subHeader.end")}</BlueText>
      </ParagraphStyled>
      <ParagraphStyled>{t("developersAndApi.paragraph")}</ParagraphStyled>
    </Box>
    <Flex width={1} justifyContent="center" mt={[40, 80]}>
      <Button
        styleName="goToApiDocs"
        onClick={() => {
          window.location.href = `https://api.foodetective.co/static_pages/api-auth-guide`;
        }}
      >
        {t("developersAndApi.goToApiDocs")}
      </Button>
    </Flex>
  </DevelopersAndApiWrapper>
);

DevelopersAndApi.propTypes = {
  t: func.isRequired,
  developersAndApiRef: oneOfType([func, shape({ current: any })]).isRequired
};

export default DevelopersAndApi;
