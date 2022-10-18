import React from "react";
import { Flex } from "@rebass/grid";
import { shape, string, func } from "prop-types";
import { getDetectiveUrl } from "pages/app/influencerManagement/detectives";
import { DetectiveName, DetectiveReviews, DetectiveImage } from "../styled";

const Detective = ({ t, lng, detective }) =>
  detective ? (
    <Flex
      justifyContent="flex-start"
      alignItems="center"
      flexDirection="column"
      as="a"
      target="_blank"
      href={getDetectiveUrl({ lng, detective })}
    >
      <DetectiveImage
        mb={3}
        src={detective.getIn(["attributes", "avatar", "url"])}
      />
      <DetectiveName>{detective.getIn(["attributes", "name"])}</DetectiveName>
      <DetectiveReviews>
        {t("reviewsCount", {
          count: detective.getIn(["attributes", "reviewsCount"])
        })}
      </DetectiveReviews>
    </Flex>
  ) : null;

Detective.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  detective: shape().isRequired
};

export default Detective;
