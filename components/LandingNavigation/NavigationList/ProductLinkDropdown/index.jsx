import React from "react";
import { Box } from "@rebass/grid";
import { func } from "prop-types";

import LinksGroup from "./LinksGroup";
import { menuItems } from "./utils";
import { Container } from "./styled";

const ProductLinkDropdown = ({ onLinkClick }) => (
  <Container width={1}>
    {menuItems.map(group => (
      <Box px={3} key={group.title} width={[1, null, 1 / 2, 1 / 3]}>
        <LinksGroup group={group} onLinkClick={onLinkClick} />
      </Box>
    ))}
  </Container>
);

ProductLinkDropdown.propTypes = {
  onLinkClick: func.isRequired
};

export default ProductLinkDropdown;
