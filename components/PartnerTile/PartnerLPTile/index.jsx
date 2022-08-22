import React from "react";
import { arrayOf, oneOfType, shape } from "prop-types";
import { Box, Flex } from "@rebass/grid";
import { useT } from "utils/hooks";

import PlayVideoButton from "../PlayVideoButton";
import {
  ButtonWrapper,
  InfoButton,
  Container,
  Image,
  ImageContainer,
  ParnterFullyConnectedCheckmark,
  Name,
  Status
} from "./styled";

const PartnerTile = ({ partner }) => {
  const t = useT("app");
  const name = partner.get("name");
  const status = partner.get("status");
  const isAvailable = status === "available";
  const videoUrl = partner.get("videoUrl");
  const websiteUrl = partner.get("websiteUrl");

  return (
    <Container isAvailable={isAvailable}>
      <Flex mb={3}>
        <Box as={ImageContainer} mr={2}>
          <Image src={partner.getIn(["logo", "url"])} />
        </Box>
        <Flex
          flexDirection="column"
          alignItems="space-between"
          justifyContent="space-between"
        >
          <Name>{name}</Name>
          {isAvailable ? (
            <Status>
              <ParnterFullyConnectedCheckmark /> &nbsp;Available
            </Status>
          ) : (
            <Status>Coming soon</Status>
          )}
        </Flex>
      </Flex>
      <Box width={1} mb="24px" flex="auto">
        <ButtonWrapper>
          {videoUrl && <PlayVideoButton t={t} isLP url={videoUrl} />}
          {websiteUrl && (
            <InfoButton
              as="a"
              target="_blank"
              href={websiteUrl}
              styleName="navyBlue"
            >
              {t("app:info")}
            </InfoButton>
          )}
        </ButtonWrapper>
      </Box>
    </Container>
  );
};

PartnerTile.propTypes = {
  partner: oneOfType([arrayOf(), shape()]).isRequired
};

export default PartnerTile;
