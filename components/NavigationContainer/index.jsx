import React, { useCallback, useEffect } from "react";
import { bool, func, string, arrayOf, shape } from "prop-types";
import { connect } from "react-redux";
import { NavBar, Menu, MobileNav } from "components";
import { setNestedMenuVisibility } from "actions/app";
import { Wrapper, MobileWrapper } from "./styled";

const NavigationContainer = ({
  withMenu,
  menuItems,
  t,
  lng,
  updateNestedMenuVisibility,
  isNestedMenuVisible
}) => {
  const toggleNestedMenu = useCallback(() => {
    updateNestedMenuVisibility(!isNestedMenuVisible);
  }, [isNestedMenuVisible, updateNestedMenuVisibility]);

  useEffect(() => {
    // applying animation on mount if have a nested menu
    if (withMenu) {
      updateNestedMenuVisibility(true);
    }
  }, [updateNestedMenuVisibility, withMenu]);

  const showNestedMenu = withMenu && isNestedMenuVisible;

  return (
    <>
      <Wrapper>
        <NavBar {...{ t, lng, showNestedMenu, toggleNestedMenu }}>
          {withMenu && <Menu {...{ t, lng, menuItems, toggleNestedMenu }} />}
        </NavBar>
      </Wrapper>
      <MobileWrapper>
        <MobileNav {...{ t, lng }} />
      </MobileWrapper>
    </>
  );
};

NavigationContainer.propTypes = {
  withMenu: bool,
  menuItems: arrayOf(
    shape({
      onClick: func,
      route: string,
      label: string.isRequired,
      isActive: bool
    })
  ),
  mainIcon: string,
  t: func.isRequired,
  lng: string.isRequired,
  isNestedMenuVisible: bool.isRequired,
  updateNestedMenuVisibility: func.isRequired
};

NavigationContainer.defaultProps = {
  menuItems: null,
  withMenu: false,
  mainIcon: null
};

export default connect(
  state => ({
    isNestedMenuVisible: state.getIn(["app", "isNestedMenuVisible"])
  }),
  { updateNestedMenuVisibility: setNestedMenuVisibility }
)(NavigationContainer);
