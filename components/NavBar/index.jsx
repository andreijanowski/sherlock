import React, { useMemo } from "react";
import { func, string, number, node, bool } from "prop-types";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { CSSTransition } from "react-transition-group";

import { Link, BusinessSelect } from "components";
import MenuArrowIcon from "components/MenuArrowIcon";
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
import { getNavConfig } from "./config";

const NavBar = ({
  t,
  lng,
  showNestedMenu,
  children,
  ordersUpdates,
  reservationsUpdates,
  toggleNestedMenu
}) => {
  const { asPath } = useRouter();
  const navConfig = useMemo(
    () => getNavConfig({ t, ordersUpdates, reservationsUpdates }),
    [ordersUpdates, reservationsUpdates, t]
  );

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
              {navConfig.map(
                ({ route, basePath, Icon, label, badge, hasNested }) => {
                  const isActive = asPath.startsWith(`/${lng}${basePath}`);
                  const shouldToggleMenu = children && isActive;
                  const onClick = shouldToggleMenu
                    ? e => {
                        e.preventDefault();
                        toggleNestedMenu();
                      }
                    : undefined;

                  return (
                    <NavItem key={basePath}>
                      <Link route={route} lng={lng}>
                        <NavItemLink isActive={isActive} onClick={onClick}>
                          <NavItemIcon>{Icon && <Icon />}</NavItemIcon>
                          {label}
                          {hasNested && <MenuArrowIcon />}
                          {badge && <BadgeNumber>{badge}</BadgeNumber>}
                        </NavItemLink>
                      </Link>
                    </NavItem>
                  );
                }
              )}
            </NavList>
          </NavTransitionContainer>
        </CSSTransition>
        {children ? <ChildrenWrapper>{children}</ChildrenWrapper> : null}
      </TransitionContainer>
    </Wrapper>
  );
};

NavBar.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  ordersUpdates: number.isRequired,
  reservationsUpdates: number.isRequired,
  showNestedMenu: bool.isRequired,
  toggleNestedMenu: func.isRequired,
  children: node
};

NavBar.defaultProps = {
  children: null
};

export default connect(state => ({
  ordersUpdates: state.getIn(["app", "ordersUpdates"]).size,
  reservationsUpdates: state.getIn(["app", "reservationsUpdates"]).size
}))(NavBar);
