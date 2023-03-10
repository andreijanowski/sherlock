import React, { useCallback, useEffect, useMemo } from "react";
import { bool, func, string, number } from "prop-types";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import { NavBar, MobileNav } from "components";
import { setNestedMenuVisibility } from "actions/app";
import { logout as logoutAction } from "actions/auth";
import { getMenuConfig, isMenuItemActive } from "utils/menuConfig";
import { Wrapper, MobileWrapper } from "./styled";

const NavigationContainer = ({
  t,
  lng,
  updateNestedMenuVisibility,
  isNestedMenuVisible,
  ordersUpdates,
  reservationsUpdates,
  intelligenceUpdates,
  logout
}) => {
  const { asPath } = useRouter();

  const config = useMemo(
    () =>
      getMenuConfig({
        t,
        ordersUpdates,
        reservationsUpdates,
        logout,
        intelligenceUpdates
      }),
    [t, ordersUpdates, reservationsUpdates, logout, intelligenceUpdates]
  );

  const mainMenuActiveItem = useMemo(() => {
    const flatConfig = [];

    config.forEach(menuItem => {
      if (menuItem.groupTitle) {
        flatConfig.push(...menuItem.items);
      } else {
        flatConfig.push(menuItem);
      }
    });

    return flatConfig.find(menuItem =>
      isMenuItemActive({ lng, asPath, menuItem })
    );
  }, [config, lng, asPath]);

  const submenuItems = mainMenuActiveItem && mainMenuActiveItem.submenuItems;
  const withMenu = !!submenuItems;

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
        <NavBar
          {...{
            t,
            lng,
            config,
            withMenu,
            submenuItems,
            showNestedMenu,
            toggleNestedMenu
          }}
        />
      </Wrapper>
      <MobileWrapper>
        <MobileNav {...{ t, lng, config }} />
      </MobileWrapper>
    </>
  );
};

NavigationContainer.propTypes = {
  mainIcon: string,
  t: func.isRequired,
  lng: string.isRequired,
  isNestedMenuVisible: bool,
  updateNestedMenuVisibility: func.isRequired,
  ordersUpdates: number.isRequired,
  intelligenceUpdates: number.isRequired,
  reservationsUpdates: number.isRequired,
  logout: func.isRequired
};

NavigationContainer.defaultProps = {
  mainIcon: null,
  isNestedMenuVisible: false
};

export default connect(
  state => ({
    isNestedMenuVisible: state.getIn(["app", "isNestedMenuVisible"]),
    ordersUpdates: state.getIn(["app", "ordersUpdates"]).size,
    reservationsUpdates: state.getIn(["app", "reservationsUpdates"]).size,
    intelligenceUpdates: state.getIn(["intelligence", "totalCount"])
  }),
  { updateNestedMenuVisibility: setNestedMenuVisibility, logout: logoutAction }
)(NavigationContainer);
