import React, { PureComponent } from "react";
import { Flex } from "@rebass/grid";
import { arrayOf, func, string, shape } from "prop-types";
import { connect } from "react-redux";
import { postBusiness } from "actions/businesses";
import { setCurrentBusiness } from "actions/app";
import prepareBusinessesList from "utils/prepareBusinessesList";
import {
  ControlCentre,
  TakeAway,
  Catering,
  LiveStream,
  Hamburger
} from "icons";
import { Select } from "components";
import { logout as logoutAction } from "actions/auth";
import { ToggledMobileMenu, MenuScrollContainer } from "./styled";
import MainIcon from "./MainIcon";
import SubItem from "./SubItem";
import { generateToggledMobileMenuSubitems } from "./utils";

class MobileNav extends PureComponent {
  state = {
    isMobileNavOpen: false
  };

  toggleNav = () => {
    this.setState(prevState => ({
      isMobileNavOpen: !prevState.isMobileNavOpen
    }));
  };

  render() {
    const { isMobileNavOpen } = this.state;
    const {
      t,
      lng,
      business,
      businesses,
      changeCurrentBusiness,
      addBusiness,
      logout
    } = this.props;
    return (
      <Flex
        as="nav"
        width={1}
        mx={3}
        justifyContent="space-between"
        alignItems="center"
      >
        <MainIcon Icon={ControlCentre} {...{ lng, route: "/" }} />
        <MainIcon Icon={Catering} {...{ lng, route: "/app/catering/month/" }} />
        <MainIcon Icon={TakeAway} {...{ lng, route: "/" }} />
        <MainIcon Icon={LiveStream} {...{ lng, route: "/" }} />
        <MainIcon
          Icon={Hamburger}
          onClick={this.toggleNav}
          {...{ isMobileNavOpen, lng }}
        />
        <ToggledMobileMenu {...{ isMobileNavOpen }}>
          <Select
            value={{
              value: business && business.id,
              label:
                (business && business.name) ||
                t("app:manageProfile.unnamedBusiness"),
              src: business && business.logo.url
            }}
            items={prepareBusinessesList(t, businesses)}
            onChange={b => changeCurrentBusiness(b.value)}
            bottomAction={{
              text: t("app:manageProfile.addNewBusiness"),
              handleClick: () => addBusiness()
            }}
            withImage
          />
          <MenuScrollContainer>
            {generateToggledMobileMenuSubitems(t, lng, logout).map(subitem => (
              <SubItem
                {...{
                  lng,
                  t,
                  route: subitem.route,
                  Icon: subitem.icon,
                  label: subitem.label,
                  withSubmenu: subitem.withSubmenu,
                  submenuItems: subitem.submenuItems,
                  key: subitem.label
                }}
              />
            ))}
          </MenuScrollContainer>
        </ToggledMobileMenu>
      </Flex>
    );
  }
}

MobileNav.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  business: shape(),
  businesses: arrayOf(shape()),
  changeCurrentBusiness: func.isRequired,
  addBusiness: func.isRequired,
  logout: func.isRequired
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
  state => ({
    business: state.users.currentBusiness.data,
    businesses: state.users.profileBusinesses.data
  }),
  {
    addBusiness: postBusiness,
    changeCurrentBusiness: setCurrentBusiness,
    logout: logoutAction
  }
)(MobileNav);
