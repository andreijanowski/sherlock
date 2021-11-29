import { Box, Flex } from "@rebass/grid";

import FoodetectiveLogo from "components/FoodetectiveLogo";
import { BlueText } from "sections/common/sharedStyled";
import { useT } from "utils/hooks";
import {
  Container,
  AppPlatformLogo,
  H2Styled,
  Image,
  NavigationLink
} from "./styled";

const InstallApp = () => {
  const t = useT("landing");
  return (
    <Container flexDirection={["column", "row"]}>
      {/* todo add video button */}
      <Image width={[1, 1 / 2]} />
      <Flex
        flexDirection="column"
        alignItems={["center", "flex-start"]}
        mt={[0, 100]}
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
    </Container>
  );
};

export default InstallApp;
