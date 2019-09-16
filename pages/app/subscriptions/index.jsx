import { PureComponent } from "react";
import { withNamespaces } from "i18n";
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
import { fetchBusinessSetupIntent } from "actions/businesses";

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

  updateSubscription = (stripeToken, planName) => {
    const {
      createSubscription,
      updateSubscriptionCard,
      subscriptions
    } = this.props;
    const { billingInterval } = this.state;
    if (subscriptions) {
      this.setState({
        view: "loading"
      });
      updateSubscriptionCard(subscriptions.get("id"), stripeToken)
        .then(() => {
          this.goToSuccess();
        })
        .catch(() => this.goToPayments());
    } else if (planName !== "essential") {
      this.setState({
        view: "loading"
      });
      createSubscription(
        stripeToken,
        `sherlock-${planName}-${billingInterval}ly-eur`
      )
        .then(() => {
          this.goToSuccess();
        })
        .catch(() => this.goToPayments());
    }
  };

  getBusinessSetupIntent = () => {
    const { getBusinessSetupIntent, businessId } = this.props;
    return getBusinessSetupIntent(businessId);
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
              getBusinessSetupIntent: this.getBusinessSetupIntent,
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
  getBusinessSetupIntent: func.isRequired,
  notificationError: func.isRequired,
  businessId: string.isRequired
};

SubscriptionsPage.defaultProps = {
  subscriptions: null,
  cards: null
};

export default requireAuth(true)(
  withNamespaces(namespaces)(
    connect(
      state => {
        const subscriptions = state.getIn([
          "users",
          "subscriptions",
          "data",
          "subscriptions"
        ]);
        const businessData = state.getIn(["users", "currentBusiness", "data"]);
        const business = businessData && businessData.get("businesses").first();
        return {
          subscriptions: subscriptions ? subscriptions.first() : subscriptions,
          cards: state.getIn(["users", "cards", "data", "cards"]),
          businessId: business && business.get("id")
        };
      },
      {
        updateSubscriptionPlan: pathSubscriptionChangePlan,
        updateSubscriptionCard: pathSubscriptionChangeCard,
        cancelSubscriptionPlan: pathSubscriptionCancel,
        createSubscription: postSubscription,
        getProfileSubscriptions: fetchProfileSubscriptions,
        getProfileCards: fetchProfileCards,
        getBusinessSetupIntent: fetchBusinessSetupIntent,
        notificationError: error
      }
    )(SubscriptionsPage)
  )
);
