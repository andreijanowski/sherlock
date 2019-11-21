import { useState } from "react";
import { func, string } from "prop-types";
import { Router } from "routes";
import {
  Button,
  FoodetectiveLogo,
  BlueText,
  YoutubeModal,
  LanguageSwitcher
} from "components";
import Cookies from "js-cookie";
import { Flex, Box } from "@rebass/grid";
import { API_URL, OAUTH_PUBLIC_CLIENT_ID, OAUTH_CALLBACK_URL } from "consts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import uuid from "uuid/v1";
import {
  Content,
  LogoWrapper,
  LogoMobileWrapper,
  ButtonWithIcon,
  H1Styled
} from "./styled";
import { ParagraphStyled } from "../sharedStyled";

const TopSection = ({ t, lng }) => {
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  return (
    <Flex flexDirection="column" mt={4} width={1} px={3}>
      <Flex alignSelf="flex-end" alignItems="center">
        <LanguageSwitcher />
        <Button
          styleName="login"
          onClick={() => {
            const state = uuid();
            Cookies.set("loginStateParam", state);
            window.location.href = `${API_URL}/oauth/authorize?client_id=${OAUTH_PUBLIC_CLIENT_ID}&redirect_uri=${OAUTH_CALLBACK_URL}&response_type=code&scope=trusted+refresh_token+public&state=${state}`;
          }}
        >
          {t("common:login")}
        </Button>
      </Flex>
      <Content>
        <LogoWrapper>
          <FoodetectiveLogo withTagline />
        </LogoWrapper>
        <LogoMobileWrapper>
          <FoodetectiveLogo />
        </LogoMobileWrapper>
        <H1Styled>
          {t("topSection.header.start")}
          <BlueText>{t("topSection.header.end")}</BlueText>
        </H1Styled>
        <ParagraphStyled>{t("topSection.paragraph")}</ParagraphStyled>
        <Flex flexDirection="row" flexWrap="wrap" m={["-2px", -1]}>
          <Box width={[1 / 2, "auto"]} p={["2px", 1]}>
            <Button
              styleName="blue"
              fluid
              fullHeight
              onClick={() => Router.pushRoute(`/${lng}/register/?plan=basic`)}
            >
              {t("topSection.getStartedForFree")}
            </Button>
          </Box>
          <Box width={[1, "auto"]} p={["2px", 1]}>
            <ButtonWithIcon
              fluid
              onClick={() =>
                setIsVideoVisible(prevIsVideoVisible => !prevIsVideoVisible)
              }
            >
              <FontAwesomeIcon icon="play" size="xs" />
              {t("topSection.watchVideo")}
            </ButtonWithIcon>
          </Box>
        </Flex>
      </Content>
      <YoutubeModal
        videoId="anlGRnk3UCo"
        close={() =>
          setIsVideoVisible(prevIsVideoVisible => !prevIsVideoVisible)
        }
        isVisible={isVideoVisible}
      />
    </Flex>
  );
};

TopSection.propTypes = {
  t: func.isRequired,
  lng: string.isRequired
};

export default TopSection;
