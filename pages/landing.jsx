import React, { PureComponent } from "react";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import { Footer } from "components";
import {
  Navigation,
  TopSection,
  Services,
  DevelopersAndApi,
  Features,
  Plans
} from "sections/landing";
import { withTranslation } from "i18n";
import {
  TopSectionWrapper,
  LandingWrapper,
  NavigationWrapper,
  ProductsWrapper,
  DevelopersAndApiWrapper
} from "sections/landing/sharedStyled";

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
    this.state = {
      billingInterval: "month"
    };
  }

  scrollTo = section => {
    window.scrollTo({
      top: this[`${section}Ref`].current.offsetTop,
      behavior: "smooth"
    });
  };

  handleChangeBillngPeriod = () =>
    this.setState(({ billingInterval }) => ({
      billingInterval: billingInterval === "month" ? "year" : "month"
    }));

  render() {
    const {
      servicesRef,
      developersAndApiRef,
      scrollTo,
      featuresRef,
      plansRef
    } = this;
    const { t, i18n } = this.props;
    const { billingInterval } = this.state;
    const lng = (i18n && i18n.language) || "en";
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
        <Features {...{ t, lng, featuresRef }} />

        <Plans
          {...{
            t,
            plansRef,
            lng: (i18n && i18n.language) || "en",
            billingInterval,
            handleChangeBillngPeriod: this.handleChangeBillngPeriod
          }}
        />
        <Footer />
      </LandingWrapper>
    );
  }
}

Home.propTypes = {
  t: func.isRequired,
  i18n: shape({ language: string.isRequired }).isRequired
};

export default requireAuth(false)(withTranslation(namespaces)(Home));
