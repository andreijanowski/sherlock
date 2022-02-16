import React from "react";
import { Flex, Box } from "@rebass/grid";
import { node } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { ButtonStyled } from "./styled";

const AddEntityButton = ({ children, ...rest }) => (
  <Flex
    flexWrap="nowrap"
    alignItems="center"
    as={ButtonStyled}
    mb={3}
    {...rest}
  >
    <Box mr={2}>
      <FontAwesomeIcon icon={faPlus} />
    </Box>
    {children}
  </Flex>
);

AddEntityButton.propTypes = {
  children: node.isRequired
};

export default AddEntityButton;
