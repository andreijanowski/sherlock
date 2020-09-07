import React from "react";
import { func, oneOfType, shape, any } from "prop-types";
import { Flex, Box } from "@rebass/grid";
import { Button } from "components";
import ReactPlayer from "react-player";
import { FeaturesWrapper, H2Styled, ParagraphStyled } from "./styled";
import { BlueText } from "../sharedStyled";

const Features = ({ t, featuresRef }) => (
  <FeaturesWrapper width="auto" pt={75} pb={[0, 75]}>
    <Box ref={featuresRef} mt={[180, 280]} mb={[0, 60]} width={[1]}>
      <H2Styled>{t("features.header")}</H2Styled>
      <ParagraphStyled>
        {t("features.subHeader.start")}
        <BlueText>{t("features.subHeader.end")}</BlueText>
      </ParagraphStyled>
    </Box>
    <div
      style={{
        position: "relative",
        paddingTop: "56.25%",
        height: "100%",
        width: "100%"
      }}
    >
      <ReactPlayer
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          padding: "20px 0"
        }}
        width="100%"
        height="100%"
        url="https://www.youtube.com/watch?v=XW2Hffcne60"
        light="/static/img/features/integrations.png"
        controls
      />
    </div>
    <Flex width={1} justifyContent="center" mt={[0, 40]}>
      <Button
        styleName="becomePartner"
        onClick={() => {
          window.location.href = `https://foodetective.typeform.com/to/tzqu8b`;
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
