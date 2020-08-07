import React from "react";
import { func, oneOfType, shape, any } from "prop-types";
import { Flex, Box } from "@rebass/grid";
import { Button } from "components";
import { FeaturesWrapper, Image, H2Styled } from "./styled";
import { BlueText } from "../sharedStyled";

const Features = ({ t, featuresRef }) => (
  <FeaturesWrapper ref={featuresRef} width="auto">
    <Box my={[80, 100]} width={[1]}>
      <H2Styled>{t("features.header")}</H2Styled>
      <H2Styled>
        {t("features.subHeader.start")}
        <BlueText>{t("features.subHeader.end")}</BlueText>
      </H2Styled>
    </Box>
    <Image />
    <Flex width={1} justifyContent="center" mt={[0, 40]}>
      <Button
        styleName="becomePartner"
        onClick={() => {
          window.location.href = `https://api.foodetective.co/static_pages/api-auth-guide`;
        }}
      >
        {t("cooperations.becomePartner")}
      </Button>
    </Flex>
  </FeaturesWrapper>
);

Features.propTypes = {
  t: func.isRequired,
  featuresRef: oneOfType([func, shape({ current: any })]).isRequired
};

export default Features;
