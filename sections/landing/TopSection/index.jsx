import { func, string, shape, object } from "prop-types";
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

const TopSection = ({ t, lng, plansRef }) => (
  <Flex flexDirection="column" mt={4} width={1} px={3}>
    <Flex alignSelf="flex-end" alignItems="center">
      <LanguageSwitcher />
      <Button
        styleName="login"
        onClick={() => Router.pushRoute(`/${lng}/login`)}
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
      <Flex flexDirection="row" flexWrap="wrap" m={["-2px", -1]}>
        <Box width={[1, "auto"]} p={["2px", 1]}>
          <Button
            styleName="blue"
            fluid
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
            onClick={() => Router.pushRoute(`/${lng}/register`)}
          >
            {t("topSection.addYourBusiness")}
          </Button>
        </Box>
        <Box width={[1 / 2, "auto"]} p={["2px", 1]}>
          <Button fluid styleName="blue">
            {t("topSection.addManager")}
          </Button>
        </Box>
        <Box width={[1, "auto"]}>
          <ButtonWithIcon fluid>
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
  lng: string.isRequired,
  plansRef: shape({ current: object }).isRequired
};

export default TopSection;
