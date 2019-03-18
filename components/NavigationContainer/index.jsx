import React from "react";
import { NavBar, Menu, MobileNav } from "components";
import { Flex } from "@rebass/grid";
import { bool, func, string, arrayOf, shape } from "prop-types";
import { Wrapper, MobileWrapper } from "./styled";

const NavigationContainer = ({ withMenu, menuItems, t, lng, select }) => (
  <>
    <Wrapper>
      <Flex>
        <NavBar {...{ t, lng, withMenu }} />
        {withMenu && <Menu {...{ lng, menuItems, select }} />}
      </Flex>
    </Wrapper>
    <MobileWrapper>
      <MobileNav {...{ t, lng }} />
    </MobileWrapper>
  </>
);

NavigationContainer.propTypes = {
  withMenu: bool,
  menuItems: arrayOf(
    shape({
      onClick: func,
      route: string,
      label: string.isRequired,
      isActive: bool.isRequired
    })
  ),
  mainIcon: string,
  header: string,
  t: func.isRequired,
  lng: string.isRequired,
  select: shape()
};

NavigationContainer.defaultProps = {
  menuItems: null,
  withMenu: false,
  mainIcon: null,
  header: null,
  select: null
};

export default NavigationContainer;
