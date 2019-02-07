import { Link } from "components";
import { func, string } from "prop-types";
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

const NavBar = ({ t, lng, slug }) => (
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
      <Icon>
        <Icon2 />
      </Icon>
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
          <Link {...{ lng, route: `/app/${slug}/profile/basic-information/` }}>
            <Subitem>{t("app:navBar.manageProfile.basicInformation")}</Subitem>
          </Link>
          <Link
            {...{ lng, route: `/app/${slug}/profile/contact-information/` }}
          >
            <Subitem>
              {t("app:navBar.manageProfile.contactInformation")}
            </Subitem>
          </Link>
          <Link {...{ lng, route: `/app/${slug}/profile/opening-hours/` }}>
            <Subitem>{t("app:navBar.manageProfile.openingHours")}</Subitem>
          </Link>
          <Link {...{ lng, route: `/app/${slug}/profile/pictures-and-menus/` }}>
            <Subitem>{t("app:navBar.manageProfile.picturesAndMenus")}</Subitem>
          </Link>
          <Link
            {...{ lng, route: `/app/${slug}/profile/additional-information/` }}
          >
            <Subitem>
              {t("app:navBar.manageProfile.additionalInformation")}
            </Subitem>
          </Link>
          <Link {...{ lng, route: `/app/${slug}/profile/members/` }}>
            <Subitem>{t("app:navBar.manageProfile.inviteYourTeam")}</Subitem>
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
    </Item>
  </Wrapper>
);

NavBar.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  slug: string.isRequired
};

export default NavBar;
