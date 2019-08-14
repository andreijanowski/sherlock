import { Link } from "components";
import { func, string } from "prop-types";
import { logout as logoutAction } from "actions/auth";
import { connect } from "react-redux";
import {
  // Temporary hidden icons:
  // ControlCenter,
  // Bookings,
  // SocialMedia,
  // Billing,
  Delivery,
  Catering,
  Privatisations,
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
      <Link {...{ lng, route: `/app/profile/basic-information/` }}>
        <Icon>
          <ProfileIcon />
        </Icon>
      </Link>
      <SubitemsWrapper top={-16} arrowTop={16}>
        <Subitems arrowTop={30}>
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
          <Link {...{ lng, route: `/app/profile/live-info/` }}>
            <Subitem>{t("app:manageProfile.liveInfo")}</Subitem>
          </Link>
        </Subitems>
      </SubitemsWrapper>
    </Item>
    <Item>
      <Link {...{ lng, route: `/app/catering/month/` }}>
        <Icon>
          <Catering />
        </Icon>
      </Link>
      <SubitemsWrapper>
        <Subitems>
          <Link {...{ lng, route: `/app/catering/month/` }}>
            <Subitem>{t("app:catering")}</Subitem>
          </Link>
        </Subitems>
      </SubitemsWrapper>
    </Item>
    <Item>
      <Link {...{ lng, route: `/app/privatisation/month/` }}>
        <Icon>
          <Privatisations />
        </Icon>
      </Link>
      <SubitemsWrapper>
        <Subitems>
          <Link {...{ lng, route: `/app/privatisation/month/` }}>
            <Subitem>{t("app:privatisations")}</Subitem>
          </Link>
        </Subitems>
      </SubitemsWrapper>
    </Item>
    <Item>
      <Link {...{ lng, route: `/app/lefood/orders/` }}>
        <Icon>
          <Delivery />
        </Icon>
      </Link>
      <SubitemsWrapper>
        <Subitems>
          <Link {...{ lng, route: `/app/lefood/orders/` }}>
            <Subitem>{t("app:delivery")}</Subitem>
          </Link>
        </Subitems>
      </SubitemsWrapper>
    </Item>
    <Item>
      <Link {...{ lng, route: `/app/subscriptions/` }}>
        <Icon>
          <Subscriptions />
        </Icon>
      </Link>
      <SubitemsWrapper>
        <Subitems>
          <Link {...{ lng, route: `/app/subscriptions/` }}>
            <Subitem>{t("app:subscriptions")}</Subitem>
          </Link>
        </Subitems>
      </SubitemsWrapper>
    </Item>
    <Item>
      <Link {...{ lng, route: `/app/settings/basic-information/` }}>
        <Icon>
          <SettingsIcon />
        </Icon>
      </Link>
      <SubitemsWrapper top={-120} arrowTop={120}>
        <Subitems arrowTop={135}>
          <Link {...{ lng, route: `/app/settings/basic-information/` }}>
            <Subitem>{t("app:userSettings.basicInformation")}</Subitem>
          </Link>
          <Link {...{ lng, route: `/app/settings/password/` }}>
            <Subitem>{t("app:userSettings.password")}</Subitem>
          </Link>
          <Subitem onClick={logout}>{t("app:userSettings.logout")}</Subitem>
        </Subitems>
      </SubitemsWrapper>
    </Item>
    {/* Temporary hidden icons */}
    {/* <Item inactive>
      <Icon inactive>
        <ControlCenter />
      </Icon>
      <SubitemsWrapper>
        <Subitems>
          <Subitem>{t("app:controlCenter")}</Subitem>
        </Subitems>
      </SubitemsWrapper>
    </Item>
    <Item inactive>
      <Icon inactive>
        <Bookings />
      </Icon>
      <SubitemsWrapper>
        <Subitems>
          <Subitem>{t("app:bookings")}</Subitem>
        </Subitems>
      </SubitemsWrapper>
    </Item>
    <Item inactive>
      <Icon inactive>
        <SocialMedia />
      </Icon>
      <SubitemsWrapper>
        <Subitems>
          <Subitem>{t("app:socialMedia")}</Subitem>
        </Subitems>
      </SubitemsWrapper>
    </Item>
    <Item inactive>
      <Icon inactive>
        <Billing />
      </Icon>
      <SubitemsWrapper>
        <Subitems>
          <Subitem>{t("app:billing")}</Subitem>
        </Subitems>
      </SubitemsWrapper>
    </Item> */}
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
