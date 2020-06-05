import { useState } from "react";
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
import { logout as logoutAction } from "actions/auth";
import { ToggledMobileMenu, MenuScrollContainer } from "./styled";
import MainIcon from "./MainIcon";
import SubItem from "./SubItem";
import { generateToggledMobileMenuSubitems } from "./utils";

const MobileNav = ({
  t,
  lng,
  business,
  businesses,
  changeCurrentBusiness,
  addBusiness,
  logout
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
      <MainIcon Icon={Catering} {...{ lng, route: "/app/catering/month/" }} />
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
            setIsMobileNavOpen(false);
          }}
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
};

MobileNav.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  business: shape(),
  businesses: shape(),
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
    changeCurrentBusiness: setCurrentBusiness,
    logout: logoutAction
  }
)(MobileNav);
