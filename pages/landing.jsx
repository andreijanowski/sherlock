import React, { PureComponent } from "react";
import requireAuth from "lib/requireAuth";
import { func, string } from "prop-types";
import { Footer } from "components";
import { TopSection, Services, Plans } from "sections/landing";
import { withNamespaces } from "i18n";

const namespaces = ["landing", "plans", "common"];

class Home extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  constructor(props) {
    super(props);
    this.plansRef = React.createRef();
    this.state = {
      billingInterval: "month"
    };
  }

  handleChangeBillngPeriod = () =>
    this.setState(({ billingInterval }) => ({
      billingInterval: billingInterval === "month" ? "year" : "month"
    }));

  render() {
    const { t, lng } = this.props;
    const { billingInterval } = this.state;
    return (
      <>
        <TopSection {...{ t, lng, plansRef: this.plansRef }} />
        <Services {...{ t }} />
        <Plans
          {...{
            t,
            lng,
            billingInterval,
            handleChangeBillngPeriod: this.handleChangeBillngPeriod,
            ref: this.plansRef
          }}
        />
        <Footer />
      </>
    );
  }
}

Home.propTypes = {
  t: func.isRequired,
  lng: string.isRequired
};

export default requireAuth(false)(withNamespaces(namespaces)(Home));
