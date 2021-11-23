import React from "react";
import { func, string } from "prop-types";
import { Box, Flex } from "@rebass/grid";

import { Button } from "components";
import {
  BlueText,
  H2Styled,
  ParagraphStyled
} from "sections/common/sharedStyled";
import { DevelopersAndApiWrapper } from "./styled";

const DevelopersAndApi = ({ t, id }) => (
  <DevelopersAndApiWrapper>
    <Box width={[1, 1 / 2]}>
      <H2Styled id={id}>{t("developersAndApi.header")}</H2Styled>
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
  id: string.isRequired
};

export default DevelopersAndApi;
