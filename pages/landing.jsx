import React, { PureComponent } from "react";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import { Footer } from "components";
import { TopSection, Services, Plans } from "sections/landing";
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
        <TopSection {...{ t, lng: (i18n && i18n.language) || "en" }} />
        <Services {...{ t }} />
        <Plans
          {...{
            t,
            lng: (i18n && i18n.language) || "en",
            billingInterval,
            handleChangeBillngPeriod: this.handleChangeBillngPeriod
          }}
        />
        <Footer />
      </>
    );
  }
}

Home.propTypes = {
  t: func.isRequired,
  i18n: shape({ language: string.isRequired }).isRequired
};

export default requireAuth(false)(withTranslation(namespaces)(Home));
