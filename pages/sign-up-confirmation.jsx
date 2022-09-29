import React from "react";

import { Footer } from "components";
import { Popup } from "components/modals";
import { useT } from "utils/hooks";
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

const SignUpConfirmation = () => {
  const t = useT();

  return (
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
      <Popup
        cta={t("landing:landings.welcome.cta")}
        disclaimer={t("landing:landings.welcome.disclaimer")}
        title={t("landing:landings.welcome.title")}
        subtitle={t("landing:landings.welcome.subtitle")}
        image="/static/img/popup1.svg"
        hasRedirection
        hasCancelButton
        maxWidth="600px"
      />
    </LandingWrapper>
  );
};

export default SignUpConfirmation;
