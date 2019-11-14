import React, { PureComponent } from "react";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import { Footer } from "components";
import {
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
    this.state = {
      billingInterval: "month"
    };
  }

  handleChangeBillngPeriod = () =>
    this.setState(({ billingInterval }) => ({
      billingInterval: billingInterval === "month" ? "year" : "month"
    }));

  render() {
    const { t, i18n } = this.props;
    const { billingInterval } = this.state;
    return (
      <>
        <LandingWrapper>
          <TopSection {...{ t, lng: (i18n && i18n.language) || "en" }} />
          <Services {...{ t }} />
          <Cooperations {...{ t }} />
        </LandingWrapper>
        <Features {...{ t }} />
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
