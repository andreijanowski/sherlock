import React, { PureComponent } from "react";
import requireAuth from "lib/requireAuth";
import { compose } from "redux";
import { func, shape, string } from "prop-types";

import { Footer } from "components";
import {
  DevelopersAndApi,
  Features,
  InstallApp,
  Navigation,
  Services,
  TopSection
} from "sections/landing";
import { withTranslation } from "i18n";
import {
  DevelopersAndApiWrapper,
  FeaturesWrapper,
  FooterWrapper,
  InstallAppWrapper,
  LandingWrapper,
  NavigationWrapper,
  PlansWrapper,
  ProductsWrapper,
  TopSectionWrapper
} from "sections/landing/sharedStyled";
import PlansV2 from "sections/landing/PlansV2";

const namespaces = ["landing", "plans", "common"];

class Home extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  constructor(props) {
    super(props);
    this.servicesRef = React.createRef();
    this.developersAndApiRef = React.createRef();
    this.featuresRef = React.createRef();
    this.plansRef = React.createRef();
  }

  getLng = () => {
    const { i18n } = this.props;

    return (i18n && i18n.language) || "en";
  };

  scrollTo = section => {
    window.scrollTo({
      top: this[`${section}Ref`].current.offsetTop - 100,
      behavior: "smooth"
    });
  };

  render() {
    const {
      servicesRef,
      developersAndApiRef,
      scrollTo,
      plansRef,
      featuresRef
    } = this;
    const { t } = this.props;
    const lng = this.getLng();

    return (
      <LandingWrapper width={1} alignItems="center" flexDirection="column">
        <NavigationWrapper>
          <Navigation {...{ t, lng, scrollTo }} />
        </NavigationWrapper>
        <TopSectionWrapper>
          <TopSection {...{ t, lng }} />
        </TopSectionWrapper>
        <ProductsWrapper>
          <Services {...{ t, servicesRef }} />
        </ProductsWrapper>
        <DevelopersAndApiWrapper>
          <DevelopersAndApi {...{ t, lng, developersAndApiRef }} />
        </DevelopersAndApiWrapper>
        <FeaturesWrapper id="features">
          <Features {...{ t, lng, featuresRef }} />
        </FeaturesWrapper>
        <PlansWrapper ref={plansRef}>
          <PlansV2 />
        </PlansWrapper>
        <InstallAppWrapper>
          <InstallApp {...{ t }} />
        </InstallAppWrapper>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </LandingWrapper>
    );
  }
}

Home.propTypes = {
  t: func.isRequired,
  i18n: shape({ language: string.isRequired }).isRequired,
  plans: shape()
};

Home.defaultProps = {
  plans: null
};

export default compose(
  requireAuth(false),
  withTranslation(namespaces)
)(Home);
