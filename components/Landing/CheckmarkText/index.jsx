import React from "react";
import { node, bool } from "prop-types";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Container, CheckmarkContainer, BodySmallStyled } from "./styled";

const CheckmarkText = ({ isDark, children }) => (
  <Container>
    <CheckmarkContainer mr={3} isDark={isDark}>
      <FontAwesomeIcon icon={faCheck} />
    </CheckmarkContainer>
    <BodySmallStyled isDark={isDark}>{children}</BodySmallStyled>
  </Container>
);

CheckmarkText.propTypes = {
  children: node.isRequired,
  isDark: bool
};

CheckmarkText.defaultProps = {
  isDark: false
};

export default CheckmarkText;
