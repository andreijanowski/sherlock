import { SUBSCRIPTION_ENTREPRISE_URL, SUBSCRIPTION_PLANS } from "consts";
import { PureComponent } from "react";
import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape, bool } from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
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
import {
  fetchBusinessSetupIntent,
  fetchBusinessSubscriptions,
  fetchBusinessCards
} from "actions/businesses";
import { getPlanSlug } from "utils/plans";
import { fetchPlans } from "actions/plans";

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

  componentDidMount() {
    const { getPlans } = this.props;
    getPlans();
  }

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
    if (planName === SUBSCRIPTION_PLANS.ENTREPRISE) {
      window.location.href = SUBSCRIPTION_ENTREPRISE_URL;

      return;
    }

    const { billingInterval } = this.state;
    const {
      subscriptions,
      updateSubscriptionPlan,
      cancelSubscriptionPlan
    } = this.props;

    if (subscriptions) {
      if (planName === SUBSCRIPTION_PLANS.FREEMIUM) {
        if (!subscriptions.getIn(["attributes", "cancelAt"])) {
          this.setState({
            view: "loading"
          });
          cancelSubscriptionPlan(subscriptions.get("id"))
            .then(this.goToSuccess)
            .catch(() =>
              this.setState({
                view: "plans"
              })
            );
        }
      } else {
        const newPlanSlug = getPlanSlug({
          planName: planName.toLowerCase(),
          billingInterval
        });
        if (
          subscriptions.getIn(["attributes", "slug"]) !== newPlanSlug ||
          subscriptions.getIn(["attributes", "cancelAt"])
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
    } else if (planName !== SUBSCRIPTION_PLANS.FREEMIUM) {
      this.setState({
        chosenPlan: planName.toLowerCase(),
        view: "payments"
      });
    }
  };

  updateSubscription = (stripeToken, planName) => {
    const {
      createSubscription,
      updateSubscriptionCard,
      subscriptions,
      businessId
    } = this.props;
    const { billingInterval, chosenPlan } = this.state;
    const plan = chosenPlan || planName;
    if (subscriptions) {
      this.setState({
        view: "loading"
      });
      updateSubscriptionCard(subscriptions.get("id"), stripeToken)
        .then(() => {
          this.goToSuccess();
        })
        .catch(() => this.goToPayments());
    } else if (plan !== "basic") {
      this.setState({
        view: "loading"
      });
      createSubscription(
        businessId,
        stripeToken,
        getPlanSlug({ planName: plan, billingInterval })
      )
        .then(this.goToSuccess)
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
    const {
      getProfileSubscriptions,
      getProfileCards,
      getBusinessSubscriptions,
      getBusinessCards,
      businessId,
      subscriptionInEffect
    } = this.props;

    if (subscriptionInEffect) {
      getProfileSubscriptions();
      getProfileCards();
    } else {
      getBusinessSubscriptions(businessId);
      getBusinessCards(businessId);
    }

    this.setState({
      chosenPlan: null,
      view: "success"
    });
  };

  render() {
    const {
      t,
      lng,
      subscriptions,
      cards,
      notificationError,
      plans
    } = this.props;
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
              plans,
              lng,
              cards,
              billingInterval,
              choosePlan: this.choosePlan,
              goToPayments: this.goToPayments,
              currentPlan: subscriptions,
              handleChangeBillngPeriod: this.handleChangeBillngPeriod,
              isCanceled:
                subscriptions && subscriptions.getIn(["attributes", "cancelAt"])
            }}
          />
        )}
        {view === "payments" && (
          <Payments
            {...{
              t,
              lng,
              plans,
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
  getBusinessSubscriptions: func.isRequired,
  getBusinessCards: func.isRequired,
  getBusinessSetupIntent: func.isRequired,
  notificationError: func.isRequired,
  businessId: string.isRequired,
  isCanceled: bool,
  subscriptionInEffect: bool.isRequired,
  getPlans: func.isRequired,
  plans: shape()
};

SubscriptionsPage.defaultProps = {
  subscriptions: null,
  cards: null,
  isCanceled: false,
  plans: null
};

export default compose(
  requireAuth(true),
  withTranslation(namespaces),
  connect(
    (state, { i18n }) => {
      const subscriptions = state.getIn([
        "users",
        "subscriptions",
        "data",
        "subscriptions"
      ]);
      const users = state.getIn(["users", "profile", "data", "users"]);

      const plans = state.getIn(["plans", "data"]);

      const profile = users && users.first();

      const subscriptionInEffect =
        profile && profile.getIn(["attributes", "subscriptionInEffect"]);

      const businessData = state.getIn(["users", "currentBusiness", "data"]);
      const business = businessData && businessData.get("businesses").first();
      return {
        subscriptions: subscriptions ? subscriptions.first() : subscriptions,
        cards: state.getIn(["users", "cards", "data", "cards"]),
        businessId: business && business.get("id"),
        lng: (i18n && i18n.language) || "en",
        subscriptionInEffect,
        plans
      };
    },
    {
      updateSubscriptionPlan: pathSubscriptionChangePlan,
      updateSubscriptionCard: pathSubscriptionChangeCard,
      cancelSubscriptionPlan: pathSubscriptionCancel,
      createSubscription: postSubscription,
      getProfileSubscriptions: fetchProfileSubscriptions,
      getProfileCards: fetchProfileCards,
      getBusinessSubscriptions: fetchBusinessSubscriptions,
      getBusinessCards: fetchBusinessCards,
      getBusinessSetupIntent: fetchBusinessSetupIntent,
      notificationError: error,
      getPlans: fetchPlans
    }
  )
)(SubscriptionsPage);
