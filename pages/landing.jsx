import React from "react";
import requireAuth from "lib/requireAuth";

import { Footer } from "components";
import {
  DevelopersAndApi,
  Integrations,
  Product,
  TopSection
} from "sections/landings/main";
import { GetReady, InstallApp, Navigation } from "sections/landings/common";
import {
  DevelopersAndApiWrapper,
  FooterWrapper,
  GetReadyLandingWrapper,
  InstallAppWrapper,
  IntegrationsWrapper,
  LandingWrapper,
  NavigationWrapper,
  ProductsWrapper,
  TopSectionWrapper
} from "sections/landings/common/sharedStyled";

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
    <GetReadyLandingWrapper>
      <GetReady />
    </GetReadyLandingWrapper>
    <InstallAppWrapper>
      <InstallApp />
    </InstallAppWrapper>
    <FooterWrapper>
      <Footer />
    </FooterWrapper>
  </LandingWrapper>
);

export default requireAuth(false)(Home);
