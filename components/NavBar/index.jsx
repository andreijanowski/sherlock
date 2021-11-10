import React from "react";
import { func, string, shape, arrayOf, bool } from "prop-types";
import { useRouter } from "next/router";
import { CSSTransition } from "react-transition-group";

import { Link, BusinessSelect, Menu } from "components";
import { PARTNERS_URL, WHOLESALERS_URL } from "sections/integrations/utils";
import MenuArrowIcon from "components/MenuArrowIcon";
import { isMenuItemActive } from "utils/menuConfig";
import {
  Wrapper,
  BadgeNumber,
  NavList,
  NavItem,
  NavItemLink,
  NavItemIcon,
  SelectWrapper,
  ChildrenWrapper,
  TransitionContainer,
  NavTransitionContainer
} from "./styled";
import CollapsingGroup from "./CollapsingGroup";

const routesWithSearch = [PARTNERS_URL, WHOLESALERS_URL];

const NavBar = ({
  t,
  lng,
  showNestedMenu,
  config,
  withMenu,
  submenuItems,
  toggleNestedMenu
}) => {
  const { asPath, pathname } = useRouter();

  const withSearch = routesWithSearch.includes(pathname);

  return (
    <Wrapper>
      <SelectWrapper>
        <BusinessSelect t={t} lng={lng} />
      </SelectWrapper>
      <TransitionContainer>
        <CSSTransition
          in={!showNestedMenu}
          classNames="rightSlide"
          appear
          mountOnEnter
          unmountOnExit
          timeout={300}
        >
          <NavTransitionContainer>
            <NavList>
              {config.flatMap(menuItem => {
                const renderItem = item => {
                  const {
                    route,
                    basePath,
                    icon,
                    label,
                    badge,
                    submenuItems: itemSubmenuItems
                  } = item;

                  const withoutIcon = !icon;

                  const isActive = isMenuItemActive({
                    lng,
                    asPath,
                    menuItem
                  });
                  const shouldToggleMenu = withMenu && isActive;
                  const onClick = shouldToggleMenu
                    ? e => {
                        e.preventDefault();
                        toggleNestedMenu();
                      }
                    : undefined;

                  const hasNested = !!itemSubmenuItems;

                  return (
                    <NavItem key={basePath} withoutIcon={withoutIcon}>
                      <Link route={route} lng={lng}>
                        <NavItemLink
                          isActive={isActive}
                          onClick={onClick}
                          withoutIcon={withoutIcon}
                        >
                          {icon && (
                            <NavItemIcon>
                              {React.createElement(icon)}
                            </NavItemIcon>
                          )}
                          {label}
                          {hasNested && <MenuArrowIcon />}
                          {badge && <BadgeNumber>{badge}</BadgeNumber>}
                        </NavItemLink>
                      </Link>
                    </NavItem>
                  );
                };

                const isGroup = !!menuItem.groupTitle;

                return isGroup ? (
                  <CollapsingGroup title={menuItem.groupTitle}>
                    {menuItem.items.map(renderItem)}
                  </CollapsingGroup>
                ) : (
                  renderItem(menuItem)
                );
              })}
            </NavList>
          </NavTransitionContainer>
        </CSSTransition>
        {withMenu && (
          <ChildrenWrapper>
            <Menu
              {...{
                withSearch,
                t,
                lng,
                menuItems: submenuItems,
                toggleNestedMenu
              }}
            />
          </ChildrenWrapper>
        )}
      </TransitionContainer>
    </Wrapper>
  );
};

NavBar.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  showNestedMenu: bool.isRequired,
  toggleNestedMenu: func.isRequired,
  config: arrayOf(shape()).isRequired,
  withMenu: bool,
  submenuItems: arrayOf(shape())
};

NavBar.defaultProps = {
  withMenu: false,
  submenuItems: null
};

export default NavBar;
