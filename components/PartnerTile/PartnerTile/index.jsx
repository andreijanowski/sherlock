import React from "react";
import { oneOfType, shape } from "prop-types";
import { Box, Flex } from "@rebass/grid";
import { useT } from "utils/hooks";
import { without } from "lodash";
import { WHOLESALER, AVAILABLE } from "consts";

import PlayVideoButton from "../PlayVideoButton";
import {
  ButtonWrapper,
  InfoButton,
  Category,
  Container,
  Image,
  ImageContainer,
  ParnterFullyConnectedCheckmark,
  Name,
  Status
} from "./styled";

const PartnerTile = ({
  partner: { name, status, videoUrl, websiteUrl, logo, categories }
}) => {
  const t = useT("app");
  const isAvailable = status === AVAILABLE;
  const category = without(categories, WHOLESALER);

  return (
    <Container isAvailable={isAvailable}>
      <Flex mb={3}>
        <Box as={ImageContainer} mr={2}>
          <Image src={logo.url} />
        </Box>
        <Flex
          flexDirection="column"
          alignItems="space-between"
          justifyContent="space-between"
        >
          <Name>{name}</Name>
          <Category>{t(`app:manageIntegrations.${category[0]}`)}</Category>
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
  partner: oneOfType([shape()]).isRequired
};

export default PartnerTile;
