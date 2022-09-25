import React, { useMemo } from "react";
import { Box, Flex } from "@rebass/grid";
import { func, shape } from "prop-types";
import { Container, Image, ImageContainer, Name, Description } from "./styled";
import { getIntelligenceDataDetails } from "./utils";
import IntelligenceTileButton from "./intelligenceTileButton";

const IntelligenceTile = ({ data, t }) => {
  const { title, redirectionText, subtitle, logoUrl } = useMemo(
    () => getIntelligenceDataDetails(data),
    [data]
  );
  console.log(redirectionText);
  return (
    <Container>
      <Flex mb={3}>
        <Box as={ImageContainer} mr={2}>
          <Image src={logoUrl} />
        </Box>
        <Name>{title}</Name>
      </Flex>
      <Description>{subtitle}</Description>
      <Box width={1} mb="24px" flex="auto" />
      <IntelligenceTileButton
        t={t}
        id
        title
        redirectionUrl
        redirectionText
        videoUrl
        subtitle
        isIntegration
        linkLabel={t("app:manageIntegrations.goToWeb")}
      />
    </Container>
  );
};

IntelligenceTile.defaultProps = {
  data: shape()
};

IntelligenceTile.propTypes = {
  data: shape(),
  t: func.isRequired
};

export default IntelligenceTile;
