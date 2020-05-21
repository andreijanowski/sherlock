import { Flex } from "@rebass/grid";
import { bool, node, string, func, arrayOf, shape } from "prop-types";
import { connect } from "react-redux";

import { i18n } from "i18n";
import { InfoBar, Link, Button } from "components";
import { Docs, Feedback, Notifications } from "icons";
import {
  Wrapper,
  HeaderWrapper,
  MainIconWrapper,
  Header,
  Icon,
  Avatar,
  IconsWrapper
} from "./styled";
import { chooseIcon, getButtonRoutes } from "./utils";

const MainApp = ({
  t,
  withMenu,
  mainIcon,
  header,
  children,
  avatar,
  isAccountConfirmed,
  menuItems
}) => {
  const lng = (i18n && i18n.language) || "en";
  const MainIcon = chooseIcon(mainIcon);
  const { prevRoute, nextRoute } = getButtonRoutes(menuItems, mainIcon);

  return (
    <Wrapper withMenu={withMenu}>
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
      <Flex
        py="4"
        justifyContent={nextRoute && !prevRoute ? "flex-end" : "space-between"}
      >
        {prevRoute && (
          <Link lng={lng} route={prevRoute}>
            <Button styleName="blue">{t("common:prev")}</Button>
          </Link>
        )}
        {nextRoute && (
          <Link lng={lng} route={nextRoute}>
            <Button styleName="blue">{t("common:next")}</Button>
          </Link>
        )}
      </Flex>
    </Wrapper>
  );
};

MainApp.propTypes = {
  menuItems: arrayOf(
    shape({
      route: string,
      label: string,
      isActive: bool
    })
  ),
  withMenu: bool.isRequired,
  mainIcon: string,
  header: string,
  children: node.isRequired,
  avatar: string,
  t: func.isRequired,
  isAccountConfirmed: bool
};

MainApp.defaultProps = {
  menuItems: [],
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
