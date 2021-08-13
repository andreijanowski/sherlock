import { useEffect, useState } from "react";
import { Flex } from "@rebass/grid";
import { bool, node, string, func, arrayOf, shape } from "prop-types";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import { i18n } from "i18n";
import { InfoBar, Link, Button, Modal } from "components";
import { Docs, Feedback, Notifications } from "icons";
import isServer from "utils/isServer";
import { togglePlayNotification } from "actions/app";
import {
  Wrapper,
  HeaderWrapper,
  MainIconWrapper,
  Header,
  Icon,
  Avatar,
  IconsWrapper,
  TutorialButton,
  YoutubeWrapper
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
  menuItems,
  shouldPlayNotification,
  toggleSound
}) => {
  const router = useRouter();
  const lng = (i18n && i18n.language) || "en";
  const MainIcon = chooseIcon(mainIcon);
  const { prevRoute, nextRoute } = getButtonRoutes(menuItems, mainIcon);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isProfile = router.pathname.includes("profile");
  useEffect(() => {
    let notification = new Audio("/static/sounds/notification.mp3");

    if (!isServer && shouldPlayNotification) {
      notification.play();
      toggleSound(false);
    }

    return () => {
      notification = undefined;
    };
  }, [shouldPlayNotification, toggleSound]);

  return (
    <Wrapper withMenu={withMenu} mainIcon={mainIcon}>
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
        <Modal {...{ open: isModalOpen, onClose: () => setIsModalOpen(false) }}>
          <YoutubeWrapper>
            <iframe
              title="tutorial 2"
              width="560"
              height="315"
              src={
                isProfile
                  ? "https://www.youtube.com/embed/bYsks2vFq1E"
                  : "https://www.youtube.com/embed/LpF218nrIMs"
              }
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </YoutubeWrapper>
        </Modal>
        <IconsWrapper>
          <TutorialButton
            role="button"
            tabIndex="0"
            onClick={() => setIsModalOpen(true)}
            onKeyDown={() => setIsModalOpen(true)}
          >
            Watch tutorials
          </TutorialButton>
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
  isAccountConfirmed: bool,
  shouldPlayNotification: bool,
  toggleSound: func.isRequired
};

MainApp.defaultProps = {
  menuItems: [],
  mainIcon: "",
  header: "",
  avatar: "",
  isAccountConfirmed: false,
  shouldPlayNotification: false
};

export default connect(
  state => {
    const users = state.getIn(["users", "profile", "data", "users"]);
    const user = users && users.first();
    return {
      avatar: user && user.getIn(["attributes", "avatar", "url"]),
      isAccountConfirmed: user && user.getIn(["attributes", "confirmed"]),
      shouldPlayNotification: state.getIn(["app", "playNotification"])
    };
  },
  { toggleSound: togglePlayNotification }
)(MainApp);
