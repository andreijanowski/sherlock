import { Arrow, ArrowDown } from "icons";
import { bool } from "prop-types";
import React from "react";
import { ArrowWrapper } from "./styled";

const ArrowComponent = ({ isDown }) => (
  <ArrowWrapper>{isDown ? <ArrowDown /> : <Arrow />}</ArrowWrapper>
);

ArrowComponent.propTypes = {
  isDown: bool
};

ArrowComponent.defaultProps = {
  isDown: false
};

export default ArrowComponent;
