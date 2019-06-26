import { Flex } from "@rebass/grid";
import { bool, node, string, func } from "prop-types";
import { connect } from "react-redux";
import { InfoBar } from "components";
import {
  ProfileIcon,
  SettingsIcon,
  Docs,
  Feedback,
  Notifications,
  Catering,
  TakeAway,
  Subscriptions,
  Privatisations
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
      return TakeAway;
    case "subscriptions":
      return Subscriptions;
    case "privatisations":
      return Privatisations;
    default:
      return () => <></>;
  }
};

const MainApp = ({
  t,
  withMenu,
  mainIcon,
  header,
  children,
  avatar,
  isAccountConfirmed
}) => {
  const MainIcon = chooseIcon(mainIcon);
  return (
    <Wrapper {...{ withMenu }}>
      {!isAccountConfirmed && <InfoBar info={t("app:confirmAccount")} />}
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
  avatar: string,
  t: func.isRequired,
  isAccountConfirmed: bool
};

MainApp.defaultProps = {
  mainIcon: "",
  header: "",
  avatar: "",
  isAccountConfirmed: false
};

export default connect(state => {
  const users = state.getIn(["users", "profile", "data", "users"]);
  const user = users && users.first();
  return {
    avatar: user && user.getIn(["attributes", "avatar", "url"]),
    isAccountConfirmed: user && user.getIn(["attributes", "confirmed"])
  };
})(MainApp);
