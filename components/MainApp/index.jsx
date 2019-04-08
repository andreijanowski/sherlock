import { Flex } from "@rebass/grid";
import { bool, node, string } from "prop-types";
import { connect } from "react-redux";
import {
  ProfileIcon,
  SettingsIcon,
  Docs,
  Feedback,
  Notifications,
  Catering,
  LeFood,
  Subscriptions
} from "icons";
import {
  Wrapper,
  HeaderWrapper,
  MainIconWrapper,
  Header,
  Icon,
  Avatar,
  IconsWrapper
} from "./styled";

const chooseIcon = icon => {
  switch (icon) {
    case "profile":
      return ProfileIcon;
    case "settings":
      return SettingsIcon;
    case "catering":
      return Catering;
    case "leFood":
      return LeFood;
    case "subscriptions":
      return Subscriptions;
    default:
      return () => <></>;
  }
};

const MainApp = ({ withMenu, mainIcon, header, children, avatar }) => {
  const MainIcon = chooseIcon(mainIcon);
  return (
    <Wrapper {...{ withMenu }}>
      <HeaderWrapper>
        <Flex alignItems="center">
          {mainIcon && (
            <MainIconWrapper>
              <MainIcon />
            </MainIconWrapper>
          )}
          {header && <Header>{header}</Header>}
        </Flex>
        <IconsWrapper>
          <Icon>
            <Feedback />
          </Icon>
          <Icon>
            <Docs />
          </Icon>
          <Icon>
            <Notifications />
          </Icon>
          <Avatar src={avatar} />
        </IconsWrapper>
      </HeaderWrapper>
      {children}
    </Wrapper>
  );
};

MainApp.propTypes = {
  withMenu: bool.isRequired,
  mainIcon: string,
  header: string,
  children: node.isRequired,
  avatar: string
};

MainApp.defaultProps = {
  mainIcon: "",
  header: "",
  avatar: ""
};

export default connect(state => ({
  avatar:
    state.users.profile.data &&
    state.users.profile.data.avatar &&
    state.users.profile.data.avatar.url
}))(MainApp);
