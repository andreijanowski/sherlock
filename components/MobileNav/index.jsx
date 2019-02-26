import React, { PureComponent } from "react";
import { Flex } from "@rebass/grid";
import { func, string, shape } from "prop-types";
import { connect } from "react-redux";
import { postBusiness } from "actions/businesses";
import { setCurrentBusiness } from "actions/users";
import prepareBusinessesList from "utils/prepareBusinessesList";
import {
  ControlCentre,
  TakeAway,
  Catering,
  Notifications,
  Hamburger
} from "icons";
import { Select } from "components";
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
      addBusiness
    } = this.props;
    return (
      <Flex
        as="nav"
        width={1}
        mx={3}
        justifyContent="space-between"
        alignItems="center"
      >
        <MainIcon Icon={ControlCentre} {...{ lng }} />
        <MainIcon Icon={Catering} route="/app/catering/month/" {...{ lng }} />
        <MainIcon Icon={TakeAway} {...{ lng }} />
        <MainIcon Icon={Notifications} {...{ lng }} />
        <MainIcon
          Icon={Hamburger}
          onClick={this.toggleNav}
          {...{ isMobileNavOpen }}
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
            {generateToggledMobileMenuSubitems(t, lng).map(subitem => (
              <SubItem
                {...{
                  lng,
                  t,
                  route: subitem.route,
                  Icon: subitem.icon,
                  label: subitem.label,
                  withSubmenu: subitem.withSubmenu,
                  submenuItems: subitem.submenuItems
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
  business: shape().isRequired,
  businesses: func.isRequired,
  changeCurrentBusiness: func.isRequired,
  addBusiness: func.isRequired
};

export default connect(
  state => ({
    business: state.users.currentBusiness.data,
    businesses: state.users.profileBusinesses.data
  }),
  {
    addBusiness: postBusiness,
    changeCurrentBusiness: setCurrentBusiness
  }
)(MobileNav);
