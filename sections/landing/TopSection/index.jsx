import { func, string } from "prop-types";
import { Router } from "routes";
import {
  Button,
  FoodetectiveLogo,
  H1,
  BlueText,
  Paragraph,
  LanguageSwitcher
} from "components";
import { Flex, Box } from "@rebass/grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Content, LogoWrapper, ButtonWithIcon } from "./styled";

const TopSection = ({ t, lng }) => (
  <Flex flexDirection="column" mt={4} px={4} width={1}>
    <Flex alignSelf="flex-end" alignItems="center">
      <LanguageSwitcher />
      <Button
        styleName="login"
        onClick={() => Router.pushRoute(`/${lng}/register`)}
      >
        {t("common:login")}
      </Button>
    </Flex>
    <Content>
      <LogoWrapper>
        <FoodetectiveLogo withTagline />
      </LogoWrapper>
      <H1>
        {t("topSection.header.start")}
        <BlueText>{t("topSection.header.end")}</BlueText>
      </H1>
      <Paragraph>{t("topSection.paragraph")}</Paragraph>
      <Flex flexDirection="row">
        <Box mr={2}>
          <Button
            styleName="blue"
            onClick={() => Router.pushRoute(`/${lng}/register`)}
          >
            {t("topSection.getStartedForFree")}
          </Button>
        </Box>
        <Box mr={2}>
          <Button
            styleName="blue"
            onClick={() => Router.pushRoute(`/${lng}/register`)}
          >
            {t("topSection.addYourBusiness")}
          </Button>
        </Box>
        <Box mr={2}>
          <Button styleName="blue">{t("topSection.addManager")}</Button>
        </Box>
        <Box>
          <ButtonWithIcon>
            <FontAwesomeIcon icon="play" size="xs" />
            {t("topSection.watchVideo")}
          </ButtonWithIcon>
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
