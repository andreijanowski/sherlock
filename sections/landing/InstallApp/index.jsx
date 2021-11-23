import { func } from "prop-types";
import { Flex, Box } from "@rebass/grid";

import FoodetectiveLogo from "components/FoodetectiveLogo";
import { BlueText } from "sections/common/sharedStyled";
import { H2Styled, Image, AppPlatformLogo, NavigationLink } from "./styled";

const InstallApp = ({ t }) => (
  <Flex
    style={{ maxWidth: "1150px" }}
    mx="auto"
    width={1}
    justifyContent="space-around"
    flexDirection={["column", "row"]}
  >
    <Image width={[1, 1 / 2]} />
    <Flex
      flexDirection="column"
      alignItems={["center", "flex-start"]}
      mt={[0, 140]}
      mb={[600, 0]}
      p={3}
      width={1}
    >
      <FoodetectiveLogo squared />
      <Box my={30}>
        <H2Styled mt={30}>{t("installApp.header.start")}</H2Styled>
        <H2Styled>
          <BlueText>{t("installApp.header.end")}</BlueText>
        </H2Styled>
      </Box>
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
