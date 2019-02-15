import { Link } from "components";
import { func, string } from "prop-types";
import { logout as logoutAction } from "actions/auth";
import { connect } from "react-redux";
import {
  ControlCentre,
  CateringIcon,
  Delivery,
  TakeAway,
  Catering,
  Privatisations,
  LeFood,
  Billing,
  ProfileIcon,
  Subscriptions,
  SettingsIcon
} from "icons";
import {
  Wrapper,
  LogoWrapper,
  Logo,
  Item,
  SubitemsWrapper,
  Subitems,
  Subitem,
  Icon
} from "./styled";

const NavBar = ({ t, lng, logout }) => (
  <Wrapper>
    <LogoWrapper>
      <Logo />
    </LogoWrapper>
    <Item>
      <Icon>
        <ControlCentre />
      </Icon>
    </Item>
    <Item>
      <Link {...{ lng, route: `/app/catering/month/` }}>
        <Icon>
          <CateringIcon />
        </Icon>
      </Link>
    </Item>
    <Item>
      <Icon>
        <Delivery />
      </Icon>
    </Item>
    <Item>
      <Icon>
        <TakeAway />
      </Icon>
    </Item>
    <Item>
      <Icon>
        <Catering />
      </Icon>
    </Item>
    <Item>
      <Icon>
        <Privatisations />
      </Icon>
    </Item>
    <Item>
      <Icon>
        <LeFood />
      </Icon>
    </Item>
    <Item>
      <Icon>
        <Billing />
      </Icon>
    </Item>
    <Item>
      <Icon>
        <ProfileIcon />
      </Icon>
      <SubitemsWrapper>
        <Subitems>
          <Link {...{ lng, route: `/app/profile/basic-information/` }}>
            <Subitem>{t("app:manageProfile.basicInformation")}</Subitem>
          </Link>
          <Link {...{ lng, route: `/app/profile/contact-information/` }}>
            <Subitem>{t("app:manageProfile.contactInformation")}</Subitem>
          </Link>
          <Link {...{ lng, route: `/app/profile/opening-hours/` }}>
            <Subitem>{t("app:manageProfile.openingHours")}</Subitem>
          </Link>
          <Link {...{ lng, route: `/app/profile/pictures-and-menus/` }}>
            <Subitem>{t("app:manageProfile.picturesAndMenus")}</Subitem>
          </Link>
          <Link {...{ lng, route: `/app/profile/additional-information/` }}>
            <Subitem>{t("app:manageProfile.additionalInformation")}</Subitem>
          </Link>
          <Link {...{ lng, route: `/app/profile/members/` }}>
            <Subitem>{t("app:manageProfile.inviteYourTeam")}</Subitem>
          </Link>
        </Subitems>
      </SubitemsWrapper>
    </Item>
    <Item>
      <Icon>
        <Subscriptions />
      </Icon>
    </Item>
    <Item>
      <Icon>
        <SettingsIcon />
      </Icon>
      <SubitemsWrapper top={-160} arrowTop={160}>
        <Subitems arrowTop={175}>
          <Link {...{ lng, route: `/app/settings/basic-information/` }}>
            <Subitem>{t("app:userSettings.basicInformation")}</Subitem>
          </Link>
          <Link {...{ lng, route: `/app/settings/billing/` }}>
            <Subitem>{t("app:userSettings.billing")}</Subitem>
          </Link>
          <Link {...{ lng, route: `/app/settings/password/` }}>
            <Subitem>{t("app:userSettings.password")}</Subitem>
          </Link>
          <Subitem onClick={logout}>{t("app:userSettings.logout")}</Subitem>
        </Subitems>
      </SubitemsWrapper>
    </Item>
  </Wrapper>
);

NavBar.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  logout: func.isRequired
};

export default connect(
  null,
  { logout: logoutAction }
)(NavBar);
