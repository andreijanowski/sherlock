import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import loadTranslations from "utils/loadTranslations";
import { func } from "prop-types";
import { Footer } from "components";
import { TopSection, Services, Plans } from "sections/landing";

const namespaces = ["landing", "common"];

class Home extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

  state = {
    billingPeriod: "monthly"
  };

  handleChangeBillngPeriod = () => {
    const { billingPeriod } = this.state;
    const newBillingPeriod = billingPeriod === "monthly" ? "yearly" : "monthly";
    this.setState({ billingPeriod: newBillingPeriod });
  };

  render() {
    const { t } = this.props;
    const { billingPeriod } = this.state;
    return (
      <>
        <TopSection {...{ t }} />
        <Services {...{ t }} />
        <Plans
          {...{
            t,
            billingPeriod,
            handleChangeBillngPeriod: this.handleChangeBillngPeriod
          }}
        />
        <Footer />
      </>
    );
  }
}

Home.propTypes = {
  t: func.isRequired
};

export default withI18next(namespaces)(Home);
