import React from "react";
import requireAuth from "lib/requireAuth";
import { compose } from "redux";
import { func, shape, string } from "prop-types";

import { Footer } from "components";
import {
  DevelopersAndApi,
  Features,
  InstallApp,
  Services,
  TopSection
} from "sections/landing";
import Navigation, { SECTION_IDS } from "sections/common/Navigation";
import { withTranslation } from "i18n";
import {
  DevelopersAndApiWrapper,
  FeaturesWrapper,
  FooterWrapper,
  InstallAppWrapper,
  LandingWrapper,
  NavigationWrapper,
  ProductsWrapper,
  TopSectionWrapper
} from "sections/common/sharedStyled";

const namespaces = ["landing", "plans", "common"];

const Home = ({ t, i18n }) => {
  const lng = (i18n && i18n.language) || "en";

  return (
    <LandingWrapper width={1} alignItems="center" flexDirection="column">
      <NavigationWrapper>
        <Navigation t={t} lng={lng} />
      </NavigationWrapper>
      <TopSectionWrapper>
        <TopSection t={t} lng={lng} />
      </TopSectionWrapper>
      <ProductsWrapper id="services">
        <Services t={t} id={SECTION_IDS.SERVICES} />
      </ProductsWrapper>
      <DevelopersAndApiWrapper>
        <DevelopersAndApi t={t} id={SECTION_IDS.DEVELOPERS_AND_API} />
      </DevelopersAndApiWrapper>
      <FeaturesWrapper>
        <Features t={t} id={SECTION_IDS.FEATURES} />
      </FeaturesWrapper>
      <InstallAppWrapper>
        <InstallApp t={t} />
      </InstallAppWrapper>
      <FooterWrapper>
        <Footer lng={lng} />
      </FooterWrapper>
    </LandingWrapper>
  );
};

Home.getInitialProps = async () => ({
  namespacesRequired: namespaces
});

Home.propTypes = {
  t: func.isRequired,
  i18n: shape({ language: string.isRequired }).isRequired
};

export default compose(
  requireAuth(false),
  withTranslation(namespaces)
)(Home);
