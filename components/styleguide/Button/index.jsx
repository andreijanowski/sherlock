import React from "react";
import { bool, node, string } from "prop-types";
import { Box } from "@rebass/grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { ButtonContainer } from "./styled";
import { BUTTON_VARIANT } from "./utils";

const Button = ({ children, variant, withArrow, ...rest }) => (
  <ButtonContainer variant={variant} {...rest}>
    {children}
    {withArrow && (
      <Box ml="10px">
        <FontAwesomeIcon icon={faChevronRight} />
      </Box>
    )}
  </ButtonContainer>
);

Button.propTypes = {
  children: node.isRequired,
  variant: string,
  withArrow: bool,
  as: string
};

Button.defaultProps = {
  as: "button",
  withArrow: false,
  variant: BUTTON_VARIANT.PRIMARY
};

export { BUTTON_VARIANT };

export default Button;
