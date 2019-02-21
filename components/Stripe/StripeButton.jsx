import React from "react";
import { node } from "prop-types";
import { StripeButtonStyled, StripeLogo } from "./styled";

const StripeButton = ({ children }) => (
  <StripeButtonStyled>
    <StripeLogo />
    <span>{children}</span>
  </StripeButtonStyled>
);

StripeButton.propTypes = {
  children: node.isRequired
};

export default StripeButton;
