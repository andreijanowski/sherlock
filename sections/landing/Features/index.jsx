import React from "react";
import { func, string } from "prop-types";
import { Flex, Box } from "@rebass/grid";
import { Button } from "components";
import ReactPlayer from "react-player";

import { becomePartnerLink } from "consts";
import { BlueText } from "sections/common/sharedStyled";
import { FeaturesWrapper, H2Styled, ParagraphStyled } from "./styled";

const Features = ({ t, id }) => (
  <FeaturesWrapper width="auto" pt={75} pb={[0, 75]}>
    <Box mt={[180, 280]} mb={[0, 60]} width={[1]}>
      <Flex
        flexDirection={["column", "column", "row"]}
        alignItems="center"
        justifyContent="space-between"
      >
        <H2Styled id={id}>{t("features.header")}</H2Styled>
        <Button
          styleName="becomePartner"
          onClick={() => {
            window.location.href = becomePartnerLink;
          }}
        >
          {t("cooperations.becomePartner")}
        </Button>
      </Flex>
      <Box width={[1, 3 / 4]}>
        <ParagraphStyled big>
          {t("features.subHeader.start")}
          <BlueText>{t("features.subHeader.end")}</BlueText>
        </ParagraphStyled>
      </Box>
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
  </FeaturesWrapper>
);

Features.propTypes = {
  t: func.isRequired,
  id: string.isRequired
};

export default Features;
