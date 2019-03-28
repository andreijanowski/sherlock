import React, { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string } from "prop-types";
import { Footer } from "components";
import { TopSection, Services, Plans } from "sections/landing";

const namespaces = ["landing", "plans", "common"];

class Home extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      billingPeriod: "monthly"
    };
    this.plansRef = React.createRef();
  }

  handleChangeBillngPeriod = () =>
    this.setState(({ billingPeriod }) => ({
      billingPeriod: billingPeriod === "monthly" ? "yearly" : "monthly"
    }));

  render() {
    const { t, lng } = this.props;
    const { billingPeriod } = this.state;
    return (
      <>
        <TopSection {...{ t, lng, plansRef: this.plansRef }} />
        <Services {...{ t }} />
        <Plans
          {...{
            t,
            lng,
            billingPeriod,
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

export default requireAuth(false)(withI18next(namespaces)(Home));
