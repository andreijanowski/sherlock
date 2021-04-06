import React, { useMemo } from "react";
import { func, string, number } from "prop-types";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import { Link, BusinessSelect } from "components";
import {
  Wrapper,
  BadgeNumber,
  NavList,
  NavItem,
  NavItemLink,
  NavItemIcon,
  SelectWrapper
} from "./styled";
import { getNavConfig } from "./config";

const NavBar = ({ t, lng, ordersUpdates, reservationsUpdates }) => {
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
      <NavList>
        {navConfig.map(({ route, basePath, Icon, label, badge }) => {
          const isActive = asPath.startsWith(`/${lng}${basePath}`);
          return (
            <NavItem key={basePath}>
              <Link route={route} lng={lng}>
                <NavItemLink isActive={isActive}>
                  <NavItemIcon>{Icon && <Icon />}</NavItemIcon>
                  {label}
                  {badge && <BadgeNumber>{badge}</BadgeNumber>}
                </NavItemLink>
              </Link>
            </NavItem>
          );
        })}
      </NavList>
    </Wrapper>
  );
};

NavBar.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  ordersUpdates: number.isRequired,
  reservationsUpdates: number.isRequired
};

export default connect(state => ({
  ordersUpdates: state.getIn(["app", "ordersUpdates"]).size,
  reservationsUpdates: state.getIn(["app", "reservationsUpdates"]).size
}))(NavBar);
