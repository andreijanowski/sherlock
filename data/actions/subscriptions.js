import {
  PATCH_SUBSCRIPTION_CHANGE_PLAN_REQUEST,
  PATCH_SUBSCRIPTION_CANCEL_REQUEST,
  POST_SUBSCRIPTION_REQUEST
} from "types/subscriptions";
import { getRelationships } from "./utils";

export const postSubscription = (stripeToken, stripePlan) => ({
  type: POST_SUBSCRIPTION_REQUEST,
  payload: {
    method: "POST",
    endpoint: `/api/v1/subscriptions`,
    data: {
      data: {
        type: "subscriptions",
        attributes: {
          stripeToken
        },
        relationships: getRelationships("stripe_plan", stripePlan)
      }
    }
  },
  meta: { thunk: true }
});

export const pathSubscriptionChangePlan = (id, stripePlanId) => ({
  type: PATCH_SUBSCRIPTION_CHANGE_PLAN_REQUEST,
  payload: {
    method: "PATCH",
    endpoint: `/api/v1/subscriptions/${id}/change_plan`,
    data: {
      data: {
        id,
        type: "subscriptions",
        attributes: {
          stripePlanId
        }
      }
    }
  },
  meta: { thunk: true }
});

export const pathSubscriptionCancel = id => ({
  type: PATCH_SUBSCRIPTION_CANCEL_REQUEST,
  payload: {
    method: "PATCH",
    endpoint: `/api/v1/subscriptions/${id}/cancel`,
    data: {
      data: {
        id,
        type: "subscriptions"
      }
    }
  },
  meta: { thunk: true }
});
