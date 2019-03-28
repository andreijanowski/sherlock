import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, arrayOf, shape } from "prop-types";
import { connect } from "react-redux";
import AppLayout from "layout/App";
import { Plans, Payments } from "sections/subscriptions";
import {
  pathSubscriptionChangePlan,
  pathSubscriptionCancel,
  postSubscription
} from "actions/subscriptions";

const namespaces = ["plans", "app"];

class SubscriptionsPage extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

  state = {
    billingInterval: "month",
    view: "plans",
    choosedPlan: null
  };

  handleChangeBillngPeriod = () =>
    this.setState(({ billingInterval }) => ({
      billingInterval: billingInterval === "month" ? "year" : "month"
    }));

  choosePlan = planName => {
    const { billingInterval } = this.state;
    const {
      subscriptions,
      updateSubscriptionPlan,
      cancelSubscriptionPlan
    } = this.props;
    if (subscriptions && subscriptions[0]) {
      if (planName === "essential") {
        cancelSubscriptionPlan(subscriptions[0].id);
      } else {
        updateSubscriptionPlan(
          subscriptions[0].id,
          `sherlock-${planName}-${billingInterval}ly-eur`
        );
      }
    } else if (planName !== "essential") {
      this.setState({
        choosedPlan: planName,
        view: "payments"
      });
    }
  };

  updateSubscription = stripeToken => {
    const { createSubscription, subscriptions } = this.props;
    const { billingInterval, choosedPlan } = this.state;
    if (subscriptions && subscriptions[0]) {
      // updateSubscriptionCard
    } else {
      createSubscription(
        stripeToken,
        `sherlock-${choosedPlan}-${billingInterval}ly-eur`
      ).then(() => {
        this.setState({
          choosedPlan: null,
          view: "success"
        });
      });
    }
  };

  render() {
    const { t, lng, subscriptions, cards } = this.props;
    const { billingInterval, view, choosedPlan } = this.state;

    return (
      <AppLayout
        {...{
          t,
          lng,
          mainIcon: "subscriptions",
          header: t("header")
        }}
      >
        {view === "plans" && (
          <Plans
            {...{
              t,
              lng,
              subscriptions,
              billingInterval,
              handleChangeBillngPeriod: this.handleChangeBillngPeriod,
              choosePlan: this.choosePlan,
              currentPlan: subscriptions && subscriptions[0]
            }}
          />
        )}
        {view === "payments" && (
          <Payments
            {...{
              t,
              lng,
              billingInterval,
              cards,
              choosedPlan,
              handleChangeBillngPeriod: this.handleChangeBillngPeriod,
              updateSubscription: this.updateSubscription
            }}
          />
        )}
      </AppLayout>
    );
  }
}

SubscriptionsPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  subscriptions: arrayOf(shape()),
  cards: arrayOf(shape()),
  updateSubscriptionPlan: func.isRequired,
  cancelSubscriptionPlan: func.isRequired,
  createSubscription: func.isRequired
};

SubscriptionsPage.defaultProps = {
  subscriptions: null,
  cards: null
};

export default requireAuth(true)(
  withI18next(namespaces)(
    connect(
      state => ({
        subscriptions: state.users.subscriptions.data,
        cards: state.users.cards.data
      }),
      {
        updateSubscriptionPlan: pathSubscriptionChangePlan,
        cancelSubscriptionPlan: pathSubscriptionCancel,
        createSubscription: postSubscription
      }
    )(SubscriptionsPage)
  )
);
