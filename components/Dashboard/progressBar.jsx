import { bool, shape, string } from "prop-types";
import React from "react";
import { Flex } from "@rebass/grid";
import { number } from "currency-codes";
import { ProgressBar, ProgressBarBackground, ProgressTitle } from "./styled";

const Bar = ({
  bgcolor,
  title,
  width,
  withPercentage,
  color,
  height,
  radius,
  wrapperStyles
}) => (
  <Flex flexDirection="column" mb={10} style={wrapperStyles}>
    <Flex justifyContent="space-between">
      <ProgressTitle>{title}</ProgressTitle>
      {withPercentage && <ProgressTitle color={color}>{width}%</ProgressTitle>}
    </Flex>
    <ProgressBarBackground bgcolor={bgcolor}>
      <ProgressBar
        color={color}
        width={`${Math.min(100, width)}%`}
        height={height}
        radius={radius}
      />
    </ProgressBarBackground>
  </Flex>
);

Bar.propTypes = {
  bgcolor: string,
  width: number,
  title: string.isRequired,
  withPercentage: bool,
  color: string.isRequired,
  height: number,
  radius: number,
  wrapperStyles: shape()
};

Bar.defaultProps = {
  bgcolor: "#f2f2f2",
  width: 0,
  withPercentage: false,
  height: "18px",
  radius: "16px",
  wrapperStyles: {}
};

export default Bar;
