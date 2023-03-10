import React from "react";
import { Box, Flex } from "@rebass/grid";

import FoodetectiveLogo from "components/FoodetectiveLogo";
import { BlueText } from "sections/landings/common/sharedStyled";
import { useT } from "utils/hooks";
import {
  GET_THE_APP_ANDROID_LINK,
  GET_THE_APP_IOS_LINK,
  GET_THE_APP_VIDEO_URL
} from "consts";
import { VideoButton } from "components/Landing";
import {
  Container,
  AppPlatformLogo,
  H2Styled,
  Image,
  NavigationLink,
  VideoButtonContainer
} from "./styled";

const InstallApp = () => {
  const t = useT("landing");
  return (
    <Container
      pt={[80, null, null, 275]}
      pm={100}
      flexDirection={["column", null, null, "row"]}
      id="app"
    >
      <Image width={[1, null, null, 1 / 2]}>
        <VideoButtonContainer>
          <VideoButton url={GET_THE_APP_VIDEO_URL} isVertical />
        </VideoButtonContainer>
      </Image>
      <Flex
        flexDirection="column"
        alignItems={["center", null, null, "flex-start"]}
        mt={[3, null, null, 100]}
        p={3}
        width={1}
      >
        <FoodetectiveLogo squared />
        <Box my={30}>
          <H2Styled>
            <BlueText>{t("installApp.header.end")}</BlueText>
          </H2Styled>
          <H2Styled mt={30}>{t("installApp.header.start")}</H2Styled>
        </Box>
        <Box>
          <NavigationLink
            rel="noopener nofollower"
            target="_blank"
            href={GET_THE_APP_IOS_LINK}
          >
            <AppPlatformLogo src="/static/img/applestore.png" />
          </NavigationLink>
          <NavigationLink
            rel="noopener nofollower"
            target="_blank"
            href={GET_THE_APP_ANDROID_LINK}
          >
            <AppPlatformLogo src="/static/img/googleplay.png" />
          </NavigationLink>
        </Box>
      </Flex>
    </Container>
  );
};

export default InstallApp;
