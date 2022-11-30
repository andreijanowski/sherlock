import { useEffect, useState, useMemo } from "react";
import { Flex } from "@rebass/grid";
import { bool, func, node, string } from "prop-types";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { Form as FinalForm, FormSpy } from "react-final-form";
import { MainInfoIcon } from "components/Icons";
import {
  Button,
  InfoBar,
  LanguageSwitcher,
  Link,
  Modal,
  NotificationsSwitch
} from "components";
import isServer from "utils/isServer";
import { togglePlayNotification } from "actions/app";
import { useLng, useT } from "utils/hooks";
import Tippy from "@tippyjs/react/headless";
import {
  Avatar,
  Header,
  HeaderWrapper,
  Icon,
  IconsWrapper,
  MainIconWrapper,
  Wrapper,
  YoutubeWrapper,
  LanguageSwitcherWrapper,
  Container,
  CheckboxesContainer
} from "./styled";
import {
  chooseIcon,
  getButtonRoutes,
  getInfoHref,
  getLandingPageUrl
} from "./utils";
import { WatchVideosIcon } from "../Icons";

const MainApp = ({
  mainIcon,
  header,
  children,
  avatar,
  isAccountConfirmed,
  shouldPlayNotification,
  toggleSound,
  // eslint-disable-next-line react/prop-types
  business
}) => {
  const router = useRouter();
  const lng = useLng();
  const t = useT();

  const MainIcon = chooseIcon(mainIcon);
  const { prevRoute, nextRoute } = getButtonRoutes({
    lng,
    asPath: router.asPath,
    mainIcon
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isProfile = router.pathname.includes("profile");
  const [visible, setVisibility] = useState(false);
  const toggleVisibility = () => {
    setVisibility(value => !value);
  };

  const businessName = useMemo(
    () => ({
      label:
        business &&
        business
          // eslint-disable-next-line react/prop-types
          .get("slug")
    }),
    [business]
  );

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

  const hasRoutesBar = !!(prevRoute || nextRoute);
  const toggleModalOpen = () => {
    setIsModalOpen(value => !value);
  };

  const renderAvatar = attrs => (
    <FinalForm
      onSubmit={() => null}
      subscription={{}}
      render={({ handleSubmit }) => (
        <CheckboxesContainer onSubmit={handleSubmit} {...attrs}>
          <FormSpy
            subscription={{
              values: true
            }}
            onChange={handleSubmit}
          />
          <a
            target="_blank"
            href={
              businessName.label
                ? `${getLandingPageUrl()}/${lng}/business/${businessName.label}`
                : `${getLandingPageUrl()}/${lng}`
            }
            rel="noopener noreferrer"
          >
            {t("common:seeProfile")}
          </a>
        </CheckboxesContainer>
      )}
    />
  );

  return (
    <Wrapper mainIcon={mainIcon}>
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
          <Icon onClick={toggleModalOpen} onKeyDown={toggleModalOpen}>
            <WatchVideosIcon />
          </Icon>
          <NotificationsSwitch mx={1} />
          <Icon
            as="a"
            target="_blank"
            rel="noopener nofollower"
            href={getInfoHref(lng)}
          >
            <MainInfoIcon />
          </Icon>

          <Tippy
            interactive
            interactiveBorder={20}
            render={renderAvatar}
            visible={visible}
            onClickOutside={toggleVisibility}
            placement="bottom"
          >
            <Container onClick={toggleVisibility}>
              <Avatar src={avatar} />
            </Container>
          </Tippy>

          <LanguageSwitcherWrapper>
            <LanguageSwitcher />
          </LanguageSwitcherWrapper>
        </IconsWrapper>
      </HeaderWrapper>
      {children}
      {hasRoutesBar && (
        <Flex
          py="4"
          justifyContent={
            nextRoute && !prevRoute ? "flex-end" : "space-between"
          }
        >
          {prevRoute && (
            <Link lng={lng} route={prevRoute}>
              <Button styleName="blue" gradient>
                {t("common:prev")}
              </Button>
            </Link>
          )}
          {nextRoute && (
            <Link lng={lng} route={nextRoute}>
              <Button styleName="blue" gradient>
                {t("common:next")}
              </Button>
            </Link>
          )}
        </Flex>
      )}
    </Wrapper>
  );
};

MainApp.propTypes = {
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
  mainIcon: "",
  header: "",
  avatar: "",
  isAccountConfirmed: true,
  shouldPlayNotification: false
};

export default connect(
  state => {
    const users = state.getIn(["users", "profile", "data", "users"]);
    const user = users && users.first();
    const businessData = state.getIn(["users", "currentBusiness", "data"]);
    const business = businessData && businessData.get("businesses").first();
    return {
      avatar: business && business.getIn(["attributes", "logo", "url"]),
      isAccountConfirmed: user && user.getIn(["attributes", "confirmed"]),
      shouldPlayNotification: state.getIn(["app", "playNotification"]),
      business: business && business.get("attributes")
    };
  },
  { toggleSound: togglePlayNotification }
)(MainApp);
