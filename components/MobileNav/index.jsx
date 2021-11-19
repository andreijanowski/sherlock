import React, { useState } from "react";
import { Flex } from "@rebass/grid";
import { func, string, shape } from "prop-types";
import { connect } from "react-redux";

import { postBusiness } from "actions/businesses";
import { setCurrentBusiness } from "actions/app";
import prepareBusinessesList from "utils/prepareBusinessesList";
import {
  ControlCenter,
  Delivery,
  Catering,
  LiveStream,
  Hamburger
} from "icons";
import { Select } from "components";
import CollapsingGroup from "components/CollapsingGroup";
import { ToggledMobileMenu, MenuScrollContainer } from "./styled";
import MainIcon from "./MainIcon";
import SubItem from "./SubItem";

const MobileNav = ({
  t,
  lng,
  business,
  businesses,
  changeCurrentBusiness,
  addBusiness,
  config
}) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <Flex
      as="nav"
      width={1}
      mx={3}
      justifyContent="space-between"
      alignItems="center"
    >
      <MainIcon Icon={ControlCenter} {...{ lng, route: "/" }} />
      <MainIcon
        Icon={Catering}
        {...{ lng, route: "/app/events-management/catering/month/" }}
      />
      <MainIcon Icon={Delivery} {...{ lng, route: "/" }} />
      <MainIcon Icon={LiveStream} {...{ lng, route: "/" }} />
      <MainIcon
        Icon={Hamburger}
        onClick={() =>
          setIsMobileNavOpen(prevIsMobileNavOpen => !prevIsMobileNavOpen)
        }
        {...{ isMobileNavOpen, lng }}
      />
      <ToggledMobileMenu {...{ isMobileNavOpen }}>
        <Select
          value={{
            value: business && business.get("id"),
            label:
              (business && business.getIn(["attributes", "name"])) ||
              t("app:manageProfile.unnamedBusiness"),
            src: business && business.getIn(["attributes", "logo", "url"])
          }}
          items={prepareBusinessesList(t, businesses)}
          onChange={b => {
            changeCurrentBusiness(b.value);
          }}
          bottomAction={{
            text: t("app:manageProfile.addNewBusiness"),
            handleClick: () => addBusiness()
          }}
          withImage
        />
        <MenuScrollContainer>
          {config.map(subitem => {
            const renderItem = item => (
              <SubItem
                {...{
                  lng,
                  t,
                  route: item.route,
                  Icon: item.icon,
                  label: item.label,
                  submenuItems: item.submenuItems,
                  key: item.label,
                  toggleMenu: setIsMobileNavOpen
                }}
              />
            );

            const isGroup = !!subitem.groupTitle;

            return isGroup ? (
              <CollapsingGroup title={subitem.groupTitle}>
                {subitem.items.map(renderItem)}
              </CollapsingGroup>
            ) : (
              renderItem(subitem)
            );
          })}
        </MenuScrollContainer>
      </ToggledMobileMenu>
    </Flex>
  );
};

MobileNav.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  currentPage: string.isRequired,
  business: shape(),
  businesses: shape(),
  changeCurrentBusiness: func.isRequired,
  addBusiness: func.isRequired,
  logout: func.isRequired,
  config: shape().isRequired
};

MobileNav.defaultProps = {
  business: null,
  businesses: null
};

MobileNav.defaultProps = {
  business: null,
  businesses: null
};

export default connect(
  state => {
    const businessData = state.getIn(["users", "currentBusiness", "data"]);
    const business =
      businessData &&
      businessData.get("businesses") &&
      businessData.get("businesses").first();
    return {
      business,
      businesses: state.getIn([
        "users",
        "profileBusinesses",
        "data",
        "businesses"
      ])
    };
  },
  {
    addBusiness: postBusiness,
    changeCurrentBusiness: setCurrentBusiness
  }
)(MobileNav);
