import { Link } from "components";
import { func, string } from "prop-types";
import { logout as logoutAction } from "actions/auth";
import { connect } from "react-redux";
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
import {
  Icon1,
  Icon2,
  Icon3,
  Icon4,
  Icon5,
  Icon6,
  Icon7,
  Icon8,
  ProfileIcon,
  Icon10,
  SettingsIcon
} from "./icons";

const NavBar = ({ t, lng, logout }) => (
  <Wrapper>
    <LogoWrapper>
      <Logo />
    </LogoWrapper>
    <Item>
      <Icon>
        <Icon1 />
      </Icon>
    </Item>
    <Item>
      <Link {...{ lng, route: `/app/catering/month/` }}>
        <Icon>
          <Icon2 />
        </Icon>
      </Link>
    </Item>
    <Item>
      <Icon>
        <Icon3 />
      </Icon>
    </Item>
    <Item>
      <Icon>
        <Icon4 />
      </Icon>
    </Item>
    <Item>
      <Icon>
        <Icon5 />
      </Icon>
    </Item>
    <Item>
      <Icon>
        <Icon6 />
      </Icon>
    </Item>
    <Item>
      <Icon>
        <Icon7 />
      </Icon>
    </Item>
    <Item>
      <Icon>
        <Icon8 />
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
        <Icon10 />
      </Icon>
    </Item>
    <Item>
      <Icon>
        <SettingsIcon />
      </Icon>
      <SubitemsWrapper top={-160} arrowTop={160}>
        <Subitems arrowTop={175}>
          <Link {...{ lng, route: `/app/user/basic-information/` }}>
            <Subitem>{t("app:userSettings.basicInformation")}</Subitem>
          </Link>
          <Link {...{ lng, route: `/app/user/billing/` }}>
            <Subitem>{t("app:userSettings.billing")}</Subitem>
          </Link>
          <Link {...{ lng, route: `/app/user/password/` }}>
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
