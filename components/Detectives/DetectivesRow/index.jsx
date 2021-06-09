import React from "react";
import { Flex, Box } from "@rebass/grid";
import { shape, func, string } from "prop-types";

import { Wrapper, StyledHeading } from "../styled";
import Detective from "../Detective";

const TopDetective = ({ t, detectives, title, lng, theme }) =>
  detectives && detectives.size ? (
    <Wrapper background={theme.colors.detectivesBackgroundGrey}>
      <StyledHeading bold>{title}</StyledHeading>
      <Flex
        my={3}
        flexWrap="wrap"
        justifyContent="space-between"
        alignSelf="center"
        width={1}
      >
        {detectives.map(detective => (
          <Box
            key={detective.getIn(["attributes", "slug"])}
            width={[1, 1, 1 / 3, 1 / 3, 1 / 6]}
          >
            <Detective t={t} lng={lng} detective={detective} />
          </Box>
        ))}
      </Flex>
    </Wrapper>
  ) : null;

TopDetective.propTypes = {
  t: func.isRequired,
  title: string.isRequired,
  lng: string.isRequired,
  detectives: shape().isRequired,
  theme: shape().isRequired
};

export default TopDetective;
