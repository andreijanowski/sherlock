import { func } from "prop-types";
import { Flex, Box } from "@rebass/grid";
import FoodetectiveLogo from "components/FoodetectiveLogo";
import { H2Styled, Image, AppPlatformLogo, NavigationLink } from "./styled";
import { BlueText } from "../sharedStyled";

const InstallApp = ({ t }) => (
  <Flex mx="auto" width={1150} justifyContent="space-around">
    <Image />
    <Flex flexDirection="column" justifyContent="flex-start" mt={140}>
      <FoodetectiveLogo squared />
      <H2Styled my={30}>
        {t("installApp.header.start")}
        <BlueText>{t("installApp.header.end")}</BlueText>
      </H2Styled>
      <Box>
        <NavigationLink href="#">
          <AppPlatformLogo src="/static/img/applestore.png" />
        </NavigationLink>
        <NavigationLink href="#">
          <AppPlatformLogo src="/static/img/googleplay.png" />
        </NavigationLink>
      </Box>
    </Flex>
  </Flex>
);

InstallApp.propTypes = {
  t: func.isRequired
};

export default InstallApp;
