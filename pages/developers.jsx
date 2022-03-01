import React from "react";

import requireAuth from "lib/requireAuth";
import { Footer } from "components";
import {
  FooterWrapper,
  InstallAppWrapper,
  LandingWrapper,
  NavigationWrapper
} from "sections/landings/common/sharedStyled";
import { InstallApp, Navigation } from "sections/landings/common";
import { DevelopersSection } from "sections/landings/developers";

const DOWNLOAD_SECTION_ID = "downloadApp";

const CustomersPage = () => (
  <LandingWrapper width={1} alignItems="center" flexDirection="column">
    <NavigationWrapper isDark>
      <Navigation />
    </NavigationWrapper>
    <NavigationWrapper isDark>
      <DevelopersSection />
    </NavigationWrapper>
    <InstallAppWrapper id={DOWNLOAD_SECTION_ID}>
      <InstallApp />
    </InstallAppWrapper>
    <FooterWrapper>
      <Footer />
    </FooterWrapper>
  </LandingWrapper>
);

export default requireAuth(false)(CustomersPage);
