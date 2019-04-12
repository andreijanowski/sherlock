import { PureComponent } from "react";
import { func, string, shape, object } from "prop-types";
import { Router } from "routes";
import {
  Button,
  FoodetectiveLogo,
  BlueText,
  YoutubeModal
  // uncomment after translations are ready
  // LanguageSwitcher
} from "components";
import { Flex, Box } from "@rebass/grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Content,
  LogoWrapper,
  LogoMobileWrapper,
  ButtonWithIcon,
  H1Styled
} from "./styled";
import { ParagraphStyled } from "../sharedStyled";

class TopSection extends PureComponent {
  state = {
    isVideoVisible: false
  };

  toggleVideo = () =>
    this.setState(state => ({
      isVideoVisible: !state.isVideoVisible
    }));

  render() {
    const { t, lng, plansRef } = this.props;
    const { isVideoVisible } = this.state;
    return (
      <Flex flexDirection="column" mt={4} width={1} px={3}>
        <Flex alignSelf="flex-end" alignItems="center">
          {/* uncomment after translations are ready */}
          {/* <LanguageSwitcher /> */}
          <Button
            styleName="login"
            onClick={() => Router.pushRoute(`/${lng}/login/`)}
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
            <Box width={[1, "auto"]} p={["2px", 1]}>
              <Button
                styleName="blue"
                fluid
                fullHeight
                onClick={() =>
                  plansRef.current.scrollIntoView({
                    behavior: "smooth"
                  })
                }
              >
                {t("topSection.getStartedForFree")}
              </Button>
            </Box>
            <Box width={[1 / 2, "auto"]} p={["2px", 1]}>
              <Button
                styleName="blue"
                fluid
                fullHeight
                onClick={() =>
                  Router.pushRoute(`/${lng}/register/?plan="basic"`)
                }
              >
                {t("topSection.addYourBusiness")}
              </Button>
            </Box>
            <Box width={[1, "auto"]} p={["2px", 1]}>
              <ButtonWithIcon fluid onClick={this.toggleVideo}>
                <FontAwesomeIcon icon="play" size="xs" />
                {t("topSection.watchVideo")}
              </ButtonWithIcon>
            </Box>
          </Flex>
        </Content>
        <YoutubeModal
          videoId="anlGRnk3UCo"
          close={this.toggleVideo}
          isVisible={isVideoVisible}
        />
      </Flex>
    );
  }
}

TopSection.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  plansRef: shape({ current: object }).isRequired
};

export default TopSection;
