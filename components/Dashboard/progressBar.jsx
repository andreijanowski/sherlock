import { bool, string } from "prop-types";
import React from "react";
import { Flex } from "@rebass/grid";
import { ProgressBar, ProgressBarBackground, ProgressTitle } from "./styled";

export default function Bar({ title, width, withPercentage, color }) {
  return (
    <Flex flexDirection="column" mb={10}>
      <Flex justifyContent="space-between">
        <ProgressTitle>{title}</ProgressTitle>
        {withPercentage && (
          <ProgressTitle color={color}>{width}%</ProgressTitle>
        )}
      </Flex>
      <ProgressBarBackground>
        <ProgressBar color={color} width={width} />
      </ProgressBarBackground>
    </Flex>
  );
}

Bar.propTypes = {
  width: string,
  title: string.isRequired,
  withPercentage: bool,
  color: string.isRequired
};

Bar.defaultProps = {
  width: 0,
  withPercentage: false
};
