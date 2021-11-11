import React from "react";
import { Flex } from "@rebass/grid";
import { shape, func, string } from "prop-types";

import { getDetectiveUrl } from "pages/app/influencerManagement/detectives/config";
import { Wrapper, StyledHeading, DetectiveImage } from "../styled";

const TopDetective = ({ t, lng, detective, theme }) =>
  detective ? (
    <Wrapper>
      <StyledHeading bold color={theme.colors.blue}>
        {t("detectiveOfTheWeek")}
      </StyledHeading>
      <Flex
        pt={3}
        justifyContent="flex-start"
        alignItems="center"
        flexDirection={["column", "column", "row"]}
        as="a"
        target="_blank"
        href={getDetectiveUrl({ lng, detective })}
      >
        <DetectiveImage
          src={detective.getIn(["attributes", "avatar", "url"])}
        />
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems={["center", "center", "flex-start"]}
          ml={4}
        >
          <StyledHeading color={theme.colors.blue}>
            {detective.getIn(["attributes", "name"])}
          </StyledHeading>
          <StyledHeading color={theme.colors.blue}>
            {t("reviewsCount", {
              count: detective.getIn(["attributes", "reviewsCount"])
            })}
          </StyledHeading>
          <StyledHeading color={theme.colors.lightGreyText}>
            {detective.getIn(["attributes", "city"])}
          </StyledHeading>
        </Flex>
      </Flex>
    </Wrapper>
  ) : null;

TopDetective.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  detective: shape().isRequired,
  theme: shape().isRequired
};

export default TopDetective;
