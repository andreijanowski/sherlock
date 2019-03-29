import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, arrayOf, shape } from "prop-types";
import { connect } from "react-redux";
import AppLayout from "layout/App";
import { LoadingIndicator } from "components";
import { Plans, Payments, Success } from "sections/subscriptions";
import { error } from "react-notification-system-redux";
import {
  pathSubscriptionChangePlan,
  pathSubscriptionChangeCard,
  pathSubscriptionCancel,
  postSubscription
} from "actions/subscriptions";
import { fetchProfileSubscriptions } from "actions/users";

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
        this.setState({
          view: "loading"
        });
        cancelSubscriptionPlan(subscriptions[0].id).then(() => {
          this.goToSuccess();
        });
      } else {
        const newPlanSlug = `sherlock-${planName}-${billingInterval}ly-eur`;
        if (subscriptions[0].slug === newPlanSlug) {
          this.setState({
            choosedPlan: planName,
            view: "payments"
          });
        } else {
          this.setState({
            view: "loading"
          });
          updateSubscriptionPlan(subscriptions[0].id, newPlanSlug).then(() => {
            this.goToSuccess();
          });
        }
      }
    } else if (planName !== "essential") {
      this.setState({
        choosedPlan: planName,
        view: "payments"
      });
    }
  };

  updateSubscription = stripeToken => {
    const {
      createSubscription,
      updateSubscriptionCard,
      subscriptions
    } = this.props;
    const { billingInterval, choosedPlan } = this.state;
    if (subscriptions && subscriptions[0]) {
      this.setState({
        view: "loading"
      });
      updateSubscriptionCard(subscriptions[0].id, stripeToken).then(() => {
        this.goToSuccess();
      });
    } else {
      this.setState({
        view: "loading"
      });
      createSubscription(
        stripeToken,
        `sherlock-${choosedPlan}-${billingInterval}ly-eur`
      ).then(() => {
        this.goToSuccess();
      });
    }
  };

  goToSuccess = () => {
    const { getProfileSubscriptions } = this.props;
    getProfileSubscriptions();
    this.setState({
      choosedPlan: null,
      view: "success"
    });
  };

  render() {
    const { t, lng, subscriptions, cards, notificationError } = this.props;
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
        {view === "loading" && <LoadingIndicator />}
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
              notificationError,
              handleChangeBillngPeriod: this.handleChangeBillngPeriod,
              updateSubscription: this.updateSubscription
            }}
          />
        )}
        {view === "success" && <Success {...{ t, lng }} />}
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
  updateSubscriptionCard: func.isRequired,
  cancelSubscriptionPlan: func.isRequired,
  createSubscription: func.isRequired,
  getProfileSubscriptions: func.isRequired,
  notificationError: func.isRequired
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
        updateSubscriptionCard: pathSubscriptionChangeCard,
        cancelSubscriptionPlan: pathSubscriptionCancel,
        createSubscription: postSubscription,
        getProfileSubscriptions: fetchProfileSubscriptions,
        notificationError: error
      }
    )(SubscriptionsPage)
  )
);
