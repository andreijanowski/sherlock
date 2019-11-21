import React from "react";
import { func, string } from "prop-types";
import { navItems } from "./Nav.config";
import { NavContainer, NavItem, NavItemText } from "./Nav.styled";

const Nav = ({ t, activeNavItem, setActiveNavItem }) => (
  <NavContainer>
    {navItems.map(item => (
      <NavItem
        onClick={() => {
          setActiveNavItem(item);
        }}
      >
        <NavItemText isActive={activeNavItem === item}>
          {t(`features.navItems.${item}`)}
        </NavItemText>
      </NavItem>
    ))}
  </NavContainer>
);

Nav.propTypes = {
  t: func.isRequired,
  activeNavItem: string.isRequired,
  setActiveNavItem: func.isRequired
};

export default Nav;
