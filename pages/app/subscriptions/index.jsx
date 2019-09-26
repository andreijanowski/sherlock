import { PureComponent } from "react";
import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
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
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  state = {
    billingInterval: "month",
    view: "plans",
    chosenPlan: null
  };

  componentDidUpdate(prevProps) {
    const { subscriptions } = this.props;
    const { subscriptions: prevSubscriptions } = prevProps;
    if (subscriptions && subscriptions !== prevSubscriptions) {
      this.handleChangeBillngPeriod({
        interval: subscriptions.getIn(["attributes", "interval"])
      });
    }
  }

  handleChangeBillngPeriod = ({ interval }) =>
    this.setState(({ billingInterval }) => ({
      billingInterval:
        interval || (billingInterval === "month" ? "year" : "month")
    }));

  choosePlan = planName => {
    const { billingInterval } = this.state;
    const {
      subscriptions,
      updateSubscriptionPlan,
      cancelSubscriptionPlan
    } = this.props;
    if (subscriptions) {
      if (planName === "essential") {
        if (!subscriptions.getIn(["attribues", "cancelAt"])) {
          this.setState({
            view: "loading"
          });
          cancelSubscriptionPlan(subscriptions.get("id"))
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
          subscriptions.getIn(["attribues", "slug"]) !== newPlanSlug ||
          subscriptions.getIn(["attribues", "cancelAt"])
        ) {
          this.setState({
            view: "loading"
          });
          updateSubscriptionPlan(subscriptions.get("id"), newPlanSlug)
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
        chosenPlan: planName,
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
    const { billingInterval, chosenPlan } = this.state;
    if (subscriptions) {
      this.setState({
        view: "loading"
      });
      updateSubscriptionCard(subscriptions.get("id"), stripeToken)
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
        `sherlock-${chosenPlan}-${billingInterval}ly-eur`
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
      chosenPlan: null,
      view: "payments"
    });
  };

  goToSuccess = () => {
    const { getProfileSubscriptions, getProfileCards } = this.props;
    getProfileSubscriptions();
    getProfileCards();
    this.setState({
      chosenPlan: null,
      view: "success"
    });
  };

  render() {
    const { t, lng, subscriptions, cards, notificationError } = this.props;
    const { billingInterval, view, chosenPlan } = this.state;

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
              billingInterval,
              choosePlan: this.choosePlan,
              goToPayments: this.goToPayments,
              currentPlan: subscriptions,
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
              notificationError,
              chosenPlan,
              currentPlan: subscriptions,
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
  subscriptions: shape(),
  cards: shape(),
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
  withTranslation(namespaces)(
    connect(
      (state, { i18n }) => {
        const subscriptions = state.getIn([
          "users",
          "subscriptions",
          "data",
          "subscriptions"
        ]);
        return {
          subscriptions: subscriptions ? subscriptions.first() : subscriptions,
          cards: state.getIn(["users", "cards", "data", "cards"]),
          lng: (i18n && i18n.language) || "en"
        };
      },
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
