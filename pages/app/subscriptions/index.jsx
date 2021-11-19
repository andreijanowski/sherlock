import React, { useState, useEffect, useCallback } from "react";
import { func, string, shape, bool } from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { error } from "react-notification-system-redux";

import { SUBSCRIPTION_ENTREPRISE_URL, SUBSCRIPTION_PLANS } from "consts";
import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import AppLayout from "layout/App";
import { LoadingIndicator } from "components";
import { Plans, Payments, Success } from "sections/subscriptions";
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
import { getPlanData } from "utils/plans";
import { fetchPlans } from "actions/plans";

const namespaces = ["plans", "forms", "app"];

const VIEWS = {
  LOADING: "loading",
  PAYMENTS: "payments",
  PLANS: "plans",
  SUCCESS: "success"
};

const SubscriptionsPage = ({
  t,
  lng,
  currentPlan,
  plans,
  cards,
  getPlans,
  getBusinessSetupIntent,
  businessId,
  getProfileSubscriptions,
  getProfileCards,
  getBusinessSubscriptions,
  getBusinessCards,
  subscriptionNotTerminated,
  updateSubscriptionPlan,
  notificationError,
  createSubscription,
  updateSubscriptionCard,
  cancelSubscriptionPlan
}) => {
  const [newPlan, setNewPlan] = useState(null);
  const [view, setView] = useState(VIEWS.PLANS);

  const handleBusinessSetupIntent = useCallback(
    () => getBusinessSetupIntent(businessId),
    [businessId, getBusinessSetupIntent]
  );

  const goToPlans = useCallback(() => {
    setView(VIEWS.PLANS);
  }, []);

  const goToPayments = useCallback(() => {
    setView(VIEWS.PAYMENTS);
  }, []);

  const goToSuccess = useCallback(() => {
    if (subscriptionNotTerminated) {
      getProfileSubscriptions();
      getProfileCards();
    } else {
      getBusinessSubscriptions(businessId);
      getBusinessCards(businessId);
    }

    setNewPlan(null);
    setView(VIEWS.SUCCESS);
  }, [
    businessId,
    getBusinessCards,
    getBusinessSubscriptions,
    getProfileCards,
    getProfileSubscriptions,
    subscriptionNotTerminated
  ]);

  const handlePlanChoose = useCallback(
    async plan => {
      const { name, slug } = getPlanData({ plan, t });

      if (name === SUBSCRIPTION_PLANS.ULTIMATE) {
        window.location.href = SUBSCRIPTION_ENTREPRISE_URL;
      }

      if (!currentPlan) {
        setNewPlan(plan);
        setView(VIEWS.PAYMENTS);
        return;
      }

      const currentPlanSlug = currentPlan.getIn(["attributes", "slug"]);
      const isSamePlan = currentPlanSlug === slug;

      if (isSamePlan) return;

      setView(VIEWS.LOADING);
      try {
        const subscriptionId = currentPlan.get("id");
        await updateSubscriptionPlan(subscriptionId, slug);
        goToSuccess();
      } catch (e) {
        setView(VIEWS.PLANS);
      }
    },
    [t, currentPlan, updateSubscriptionPlan, goToSuccess]
  );

  const planToPay = newPlan || currentPlan;

  const updateSubscription = useCallback(
    async stripeToken => {
      setView(VIEWS.LOADING);

      if (currentPlan) {
        const currentPlanId = currentPlan.get("id");
        try {
          await updateSubscriptionCard(currentPlanId, stripeToken);
          goToSuccess();
        } catch (e) {
          goToPayments();
        }
        return;
      }

      try {
        const { slug } = getPlanData({ plan: planToPay, t });
        await createSubscription(businessId, stripeToken, slug);
        goToSuccess();
      } catch (e) {
        goToPayments();
      }
    },
    [
      businessId,
      createSubscription,
      currentPlan,
      goToPayments,
      goToSuccess,
      planToPay,
      t,
      updateSubscriptionCard
    ]
  );

  const handleCancelSubscription = useCallback(
    async planId => {
      try {
        setView(VIEWS.LOADING);
        await cancelSubscriptionPlan(planId);
        goToSuccess();
      } catch (e) {
        setView(VIEWS.PLANS);
      }
    },
    [cancelSubscriptionPlan, goToSuccess]
  );

  useEffect(() => {
    getPlans();
  }, [getPlans]);

  return (
    <AppLayout
      {...{
        t,
        lng,
        mainIcon: "subscriptions",
        header: t("header")
      }}
    >
      {view === VIEWS.LOADING && <LoadingIndicator />}
      {view === VIEWS.PLANS && (
        <Plans
          {...{
            t,
            plans,
            lng,
            cards,
            handlePlanChoose,
            goToPayments,
            currentPlan,
            handleCancelSubscription
          }}
        />
      )}
      {view === VIEWS.PAYMENTS && (
        <Payments
          {...{
            t,
            plans,
            cards,
            notificationError,
            planToPay,
            getBusinessSetupIntent: handleBusinessSetupIntent,
            goToPlans,
            updateSubscription
          }}
        />
      )}
      {view === VIEWS.SUCCESS && <Success {...{ t, lng, goToPlans }} />}
    </AppLayout>
  );
};

SubscriptionsPage.getInitialProps = async () => ({
  namespacesRequired: namespaces
});

SubscriptionsPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  currentPlan: shape(),
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
  subscriptionNotTerminated: bool.isRequired,
  getPlans: func.isRequired,
  plans: shape()
};

SubscriptionsPage.defaultProps = {
  currentPlan: null,
  cards: null,
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

      const subscriptionNotTerminated =
        profile && profile.getIn(["attributes", "subscriptionNotTerminated"]);

      const businessData = state.getIn(["users", "currentBusiness", "data"]);
      const business = businessData && businessData.get("businesses").first();
      return {
        currentPlan: subscriptions ? subscriptions.first() : subscriptions,
        cards: state.getIn(["users", "cards", "data", "cards"]),
        businessId: business && business.get("id"),
        lng: (i18n && i18n.language) || "en",
        subscriptionNotTerminated,
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
