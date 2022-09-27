import React, { useMemo, useState, useEffect } from "react";
import { Box, Flex } from "@rebass/grid";
import { func, shape } from "prop-types";
import { Container, Image, ImageContainer, Name, Description } from "./styled";
import { getIntelligenceDataDetails } from "../utils";
import IntelligenceTileButton from "../intelligenceTileButton";

const IntelligenceTile = ({ data, t }) => {
  const [state, setState] = useState();
  const {
    title,
    redirectionText,
    subtitle,
    logoUrl,
    videoUrl,
    redirectionUrl,
    description
  } = useMemo(() => getIntelligenceDataDetails(data), [data]);

  useEffect(() => {
    setState({
      title,
      redirectionText,
      subtitle,
      logoUrl,
      videoUrl,
      redirectionUrl,
      description
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Container>
      <Flex mb={3}>
        <Box as={ImageContainer} mr={2}>
          <Image src={logoUrl} />
        </Box>
        <Flex flexDirection="column">
          <Name>{title}</Name>
          <Description>{subtitle}</Description>
        </Flex>
      </Flex>
      <Box width={1} mb="24px" flex="auto" />
      <IntelligenceTileButton t={t} data={{ ...state }} />
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
