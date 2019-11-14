import React, { PureComponent } from "react";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
// import { Flex, Box } from "@rebass/grid";
import { Footer } from "components";
import {
  Navigation,
  TopSection,
  Services,
  Plans,
  Cooperations,
  Features,
  Testimonials
} from "sections/landing";
import { LandingWrapper } from "sections/landing/sharedStyled";
import { withTranslation } from "i18n";

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
    this.industriesRef = React.createRef();
    this.featuresRef = React.createRef();
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
    const { servicesRef, industriesRef, featuresRef, scrollTo } = this;
    const { t, i18n } = this.props;
    const { billingInterval } = this.state;
    const lng = (i18n && i18n.language) || "en";
    return (
      <>
        <Navigation {...{ t, lng, scrollTo }} />
        <LandingWrapper>
          <TopSection {...{ t, lng }} />
          <Services {...{ t, servicesRef }} />
          <Cooperations {...{ t, industriesRef }} />
        </LandingWrapper>
        <Features {...{ t, featuresRef }} />
        <LandingWrapper>
          <Testimonials {...{ t }} />
          <Plans
            {...{
              t,
              lng: (i18n && i18n.language) || "en",
              billingInterval,
              handleChangeBillngPeriod: this.handleChangeBillngPeriod
            }}
          />
        </LandingWrapper>
        <Footer />
      </>
    );
  }
}

Home.propTypes = {
  t: func.isRequired,
  i18n: shape({ lng: string.isRequired }).isRequired
};

export default requireAuth(false)(withTranslation(namespaces)(Home));
