import React from "react";
import { bool } from "prop-types";

import { SidebarExpandIcon } from "icons";
import { StyledExpandIcon } from "./styled";

const MenuArrowIcon = ({ back }) => (
  <StyledExpandIcon back={back}>
    <SidebarExpandIcon />
  </StyledExpandIcon>
);

MenuArrowIcon.propTypes = {
  back: bool
};

MenuArrowIcon.defaultProps = {
  back: false
};

export default MenuArrowIcon;
