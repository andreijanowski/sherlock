import React from "react";
import requireAuth from "lib/requireAuth";

import { Footer } from "components";
import {
  DevelopersAndApi,
  Product,
  TopSection,
  Integrations
} from "sections/landings/main";
import { Navigation, GetReady, InstallApp } from "sections/landings/common";
import {
  DevelopersAndApiWrapper,
  FooterWrapper,
  GetReadyWrapper,
  InstallAppWrapper,
  LandingWrapper,
  NavigationWrapper,
  ProductsWrapper,
  TopSectionWrapper,
  IntegrationsWrapper
} from "sections/landings/common/sharedStyled";
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
    <IntegrationsWrapper>
      <Integrations />
    </IntegrationsWrapper>
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
