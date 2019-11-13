import { func, string } from "prop-types";
import { Router } from "routes";
import {
  Button,
  FoodetectiveLogo,
  BlueText
  // uncomment after translations are ready
  // LanguageSwitcher
} from "components";
import { Flex, Box } from "@rebass/grid";
import { Content, LogoWrapper, LogoMobileWrapper, H1Styled } from "./styled";
import YoutubeVideo from "./YoutubeVideo";
import { ParagraphStyled } from "../sharedStyled";

const TopSection = ({ t, lng }) => (
  <Flex flexDirection="column" mt={4} width={1}>
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
      <Flex alignItems="center" flexWrap="wrap" m={-2}>
        <Box width={[1, 1 / 2]} p={2}>
          <H1Styled>
            {t("topSection.header.start")}
            <BlueText>{t("topSection.header.end")}</BlueText>
          </H1Styled>
          <ParagraphStyled>{t("topSection.paragraph")}</ParagraphStyled>
          <Box width={[1, "auto"]}>
            <Button
              styleName="blue"
              fluid
              fullHeight
              onClick={() => Router.pushRoute(`/${lng}/register/?plan=basic`)}
            >
              {t("topSection.getStartedForFree")}
            </Button>
          </Box>
        </Box>
        <Box width={[1, 1 / 2]} p={2}>
          <YoutubeVideo />
        </Box>
      </Flex>
    </Content>
  </Flex>
);

TopSection.propTypes = {
  t: func.isRequired,
  lng: string.isRequired
};

export default TopSection;
