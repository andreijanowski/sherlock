import { Flex } from "@rebass/grid";
import { bool, node, string } from "prop-types";
import {
  Wrapper,
  HeaderWrapper,
  MainIconWrapper,
  Header,
  Icon,
  Avatar
} from "./styled";
import { Docs, Feedback, Notifications } from "./icons";
import { ProfileIcon } from "../NavBar/icons";

const chooseIcon = icon => {
  switch (icon) {
    case "profile":
      return ProfileIcon;
    default:
      return null;
  }
};

const MainApp = ({ withMenu, mainIcon, header, children }) => {
  const MainIcon = chooseIcon(mainIcon);
  return (
    <Wrapper {...{ withMenu }}>
      <HeaderWrapper>
        <Flex alignItems="center">
          <MainIconWrapper>
            <MainIcon>{mainIcon}</MainIcon>
          </MainIconWrapper>
          <Header>{header}</Header>
        </Flex>
        <Flex>
          <Icon>
            <Feedback />
          </Icon>
          <Icon>
            <Docs />
          </Icon>
          <Icon>
            <Notifications />
          </Icon>
          <Avatar src="https://foodetective-production.s3.amazonaws.com/uploads/user/avatar/b4a9df76-7c7f-43a2-be2e-a504c09fd072/avatar.png" />
        </Flex>
      </HeaderWrapper>
      {children}
    </Wrapper>
  );
};

MainApp.propTypes = {
  withMenu: bool.isRequired,
  mainIcon: string.isRequired,
  header: string.isRequired,
  children: node.isRequired
};

export default MainApp;
