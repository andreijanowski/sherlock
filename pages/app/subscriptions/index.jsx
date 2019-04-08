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
import { fetchProfileSubscriptions, fetchProfileCards } from "actions/users";

const namespaces = ["plans", "forms", "app"];

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

  componentDidUpdate(prevProps) {
    const { subscriptions } = this.props;
    const { subscriptions: prevSubscriptions } = prevProps;
    if (subscriptions && subscriptions !== prevSubscriptions) {
      this.handleChangeBillngPeriod({ interval: subscriptions.interval });
    }
  }

  handleChangeBillngPeriod = ({ interval }) =>
    this.setState(({ billingInterval }) => ({
      billingInterval:
        interval || billingInterval === "month" ? "year" : "month"
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
        if (!subscriptions[0].cancelAt) {
          this.setState({
            view: "loading"
          });
          cancelSubscriptionPlan(subscriptions[0].id)
            .then(() => {
              this.goToSuccess();
            })
            .catch(() =>
              this.setState({
                view: "plans"
              })
            );
        }
      } else {
        const newPlanSlug = `sherlock-${planName}-${billingInterval}ly-eur`;
        if (
          subscriptions[0].slug !== newPlanSlug ||
          subscriptions[0].cancelAt
        ) {
          this.setState({
            view: "loading"
          });
          updateSubscriptionPlan(subscriptions[0].id, newPlanSlug)
            .then(() => {
              this.goToSuccess();
            })
            .catch(() =>
              this.setState({
                view: "plans"
              })
            );
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
      updateSubscriptionCard(subscriptions[0].id, stripeToken)
        .then(() => {
          this.goToSuccess();
        })
        .catch(() => this.goToPayments());
    } else {
      this.setState({
        view: "loading"
      });
      createSubscription(
        stripeToken,
        `sherlock-${choosedPlan}-${billingInterval}ly-eur`
      )
        .then(() => {
          this.goToSuccess();
        })
        .catch(() => this.goToPayments());
    }
  };

  goToPlans = () => {
    this.setState({
      view: "plans"
    });
  };

  goToPayments = () => {
    this.setState({
      view: "payments"
    });
  };

  goToSuccess = () => {
    const { getProfileSubscriptions, getProfileCards } = this.props;
    getProfileSubscriptions();
    getProfileCards();
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
              cards,
              subscriptions,
              billingInterval,
              choosePlan: this.choosePlan,
              goToPayments: this.goToPayments,
              currentPlan: subscriptions && subscriptions[0],
              handleChangeBillngPeriod: this.handleChangeBillngPeriod
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
              goToPlans: this.goToPlans,
              handleChangeBillngPeriod: this.handleChangeBillngPeriod,
              updateSubscription: this.updateSubscription
            }}
          />
        )}
        {view === "success" && (
          <Success {...{ t, lng, goToPlans: this.goToPlans }} />
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
  updateSubscriptionCard: func.isRequired,
  cancelSubscriptionPlan: func.isRequired,
  createSubscription: func.isRequired,
  getProfileSubscriptions: func.isRequired,
  getProfileCards: func.isRequired,
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
        getProfileCards: fetchProfileCards,
        notificationError: error
      }
    )(SubscriptionsPage)
  )
);
