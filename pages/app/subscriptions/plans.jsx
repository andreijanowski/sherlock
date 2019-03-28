import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string } from "prop-types";
import { connect } from "react-redux";
import AppLayout from "layout/App";
import { Plans } from "sections/subscriptions";

const namespaces = ["plans", "app"];

class PlansPage extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

  state = {
    billingPeriod: "monthly"
  };

  handleChangeBillngPeriod = () =>
    this.setState(({ billingPeriod }) => ({
      billingPeriod: billingPeriod === "monthly" ? "yearly" : "monthly"
    }));

  render() {
    const { t, lng } = this.props;
    const { billingPeriod } = this.state;

    return (
      <AppLayout
        {...{
          t,
          lng,
          mainIcon: "subscriptions",
          header: t("header")
        }}
      >
        <Plans
          {...{
            t,
            lng,
            billingPeriod,
            handleChangeBillngPeriod: this.handleChangeBillngPeriod
          }}
        />
      </AppLayout>
    );
  }
}

PlansPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired
};

export default requireAuth(true)(withI18next(namespaces)(connect()(PlansPage)));
