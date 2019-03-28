import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, arrayOf, shape } from "prop-types";
import { connect } from "react-redux";
import AppLayout from "layout/App";
import { Payments } from "sections/subscriptions";

const namespaces = ["payments", "app"];

class PlansPaymentPage extends PureComponent {
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
    const { t, lng, cards } = this.props;
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
        <Payments
          {...{
            t,
            lng,
            billingPeriod,
            cards,
            handleChangeBillngPeriod: this.handleChangeBillngPeriod
          }}
        />
      </AppLayout>
    );
  }
}

PlansPaymentPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  cards: arrayOf(shape())
};

PlansPaymentPage.defaultProps = {
  cards: null
};

export default requireAuth(true)(
  withI18next(namespaces)(
    connect(state => ({
      cards: state.users.cards.data
    }))(PlansPaymentPage)
  )
);
