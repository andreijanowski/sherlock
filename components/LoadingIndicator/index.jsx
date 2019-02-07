import React from "react";
import { PulseLoader } from "react-spinners";
import { colors } from "utils/theme";
import { number, bool } from "prop-types";
import { LoadingWrapper } from "./styled";

const LoadingIndicator = ({ size, wrapped }) =>
  wrapped ? (
    <LoadingWrapper>
      <PulseLoader size={size} color={`rgb(${colors.blue})`} loading />
    </LoadingWrapper>
  ) : (
    <PulseLoader size={size} color={`rgb(${colors.blue})`} loading />
  );

LoadingIndicator.propTypes = {
  size: number,
  wrapped: bool
};

LoadingIndicator.defaultProps = {
  size: 15,
  wrapped: true
};

export default LoadingIndicator;
