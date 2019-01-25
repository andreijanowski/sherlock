import React from "react";
import { PulseLoader } from "react-spinners";
import { colors } from "utils/theme";
import { number } from "prop-types";

const LoadingIndicator = ({ size }) => (
  <PulseLoader size={size} color={`rgb(${colors.blue})`} loading />
);

LoadingIndicator.propTypes = {
  size: number
};

LoadingIndicator.defaultProps = {
  size: 15
};

export default LoadingIndicator;
