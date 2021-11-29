import React from "react";
import requireAuth from "lib/requireAuth";

import { Footer } from "components";
import {
  DevelopersAndApi,
  InstallApp,
  Product,
  TopSection
} from "sections/landing";
import Navigation from "sections/common/Navigation";
import { GetReady } from "sections/pricing/subscriptions";
import {
  DevelopersAndApiWrapper,
  FooterWrapper,
  GetReadyWrapper,
  InstallAppWrapper,
  LandingWrapper,
  NavigationWrapper,
  ProductsWrapper,
  TopSectionWrapper
} from "sections/common/sharedStyled";
import { theme } from "utils/theme";

const Home = () => (
  <LandingWrapper width={1} alignItems="center" flexDirection="column">
    <NavigationWrapper>
      <Navigation />
    </NavigationWrapper>
    <TopSectionWrapper>
      <TopSection />
    </TopSectionWrapper>
    <DevelopersAndApiWrapper>
      <DevelopersAndApi />
    </DevelopersAndApiWrapper>
    <ProductsWrapper>
      <Product />
    </ProductsWrapper>
    <GetReadyWrapper bgColor={theme.colors.landingDarkBlue}>
      <GetReady />
    </GetReadyWrapper>
    <InstallAppWrapper>
      <InstallApp />
    </InstallAppWrapper>
    <FooterWrapper>
      <Footer />
    </FooterWrapper>
  </LandingWrapper>
);

export default requireAuth(false)(Home);
