import React from "react";
import { Box, Flex } from "@rebass/grid";

import FoodetectiveLogo from "components/FoodetectiveLogo";
import { BlueText } from "sections/common/sharedStyled";
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
    <Container flexDirection={["column", "row"]}>
      <Image width={[1, 1 / 2]}>
        <VideoButtonContainer>
          <VideoButton url={GET_THE_APP_VIDEO_URL} isVertical />
        </VideoButtonContainer>
      </Image>
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
