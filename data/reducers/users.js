import {
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAIL,
  FETCH_PROFILE_BUSINESSES_REQUEST,
  FETCH_PROFILE_BUSINESSES_SUCCESS,
  FETCH_PROFILE_BUSINESSES_FAIL,
  FETCH_PROFILE_BUSINESS_REQUEST,
  FETCH_PROFILE_BUSINESS_SUCCESS,
  FETCH_PROFILE_BUSINESS_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  FETCH_PROFILE_CARDS_REQUEST,
  FETCH_PROFILE_CARDS_SUCCESS,
  FETCH_PROFILE_CARDS_FAIL,
  FETCH_PROFILE_SUBSCRIPTIONS_REQUEST,
  FETCH_PROFILE_SUBSCRIPTIONS_SUCCESS,
  FETCH_PROFILE_SUBSCRIPTIONS_FAIL
} from "types/users";
import {
  POST_BUSINESS_REQUEST,
  POST_BUSINESS_SUCCESS,
  PATCH_BUSINESS_SUCCESS
} from "types/businesses";
import { POST_PICTURE_SUCCESS, DELETE_PICTURE_REQUEST } from "types/pictures";
import { POST_MENU_SUCCESS, DELETE_MENU_REQUEST } from "types/menus";
import { POST_PRODUCT_SUCCESS, DELETE_PRODUCT_REQUEST } from "types/products";
import {
  POST_OPEN_PERIOD_SUCCESS,
  PATCH_OPEN_PERIOD_SUCCESS,
  DELETE_OPEN_PERIOD_REQUEST
} from "types/openPeriods";
import {
  POST_ORDER_PERIOD_SUCCESS,
  PATCH_ORDER_PERIOD_SUCCESS,
  DELETE_ORDER_PERIOD_REQUEST
} from "types/orderPeriods";
import { LOGOUT } from "types/auth";

import build from "redux-object";

const initialState = {
  profile: {
    data: null,
    isFetching: false,
    isFailed: false,
    isSucceeded: false,
    isUpdating: false
  },
  profileBusinesses: {
    data: null,
    isFetching: false,
    isFailed: false,
    isSucceeded: false
  },
  currentBusiness: {
    data: null,
    members: null,
    isFetching: false,
    isFailed: false,
    isSucceeded: false
  },
  cards: {
    data: null,
    isFetching: false,
    isFailed: false,
    isSucceeded: false
  },
  subscriptions: {
    data: null,
    isFetching: false,
    isFailed: false,
    isSucceeded: false
  }
};

const reducer = (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case FETCH_PROFILE_REQUEST: {
      const newState = { ...state };
      newState.profile.data = null;
      newState.profile.isFetching = true;
      newState.profile.isFailed = false;
      newState.profile.isSucceeded = false;
      return newState;
    }
    case FETCH_PROFILE_SUCCESS: {
      const newState = { ...state };
      const profile = build(payload.data, "users", payload.rawData.data.id, {
        ignoreLinks: true
      });
      newState.profile.isFetching = false;
      newState.profile.isSucceeded = true;
      newState.profile.data = profile;
      newState.profile.data.avatar.url = profile.avatar.url;
      return newState;
    }
    case FETCH_PROFILE_FAIL: {
      const newState = { ...state };
      newState.profile.isFetching = false;
      newState.profile.isFailed = true;
      return newState;
    }

    case UPDATE_PROFILE_REQUEST: {
      return { ...state, profile: { ...state.profile, isUpdating: true } };
    }

    case UPDATE_PROFILE_SUCCESS: {
      const profileData = build(
        payload.data,
        "users",
        payload.rawData.data.id,
        {
          ignoreLinks: true
        }
      );
      return {
        ...state,
        profile: {
          ...state.profile,
          isUpdating: false,
          data: { ...profileData }
        }
      };
    }

    case FETCH_PROFILE_BUSINESSES_REQUEST: {
      const newState = { ...state };
      newState.profileBusinesses.data = null;
      newState.profileBusinesses.isFetching = true;
      newState.profileBusinesses.isFailed = false;
      newState.profileBusinesses.isSucceeded = false;
      return newState;
    }
    case FETCH_PROFILE_BUSINESSES_SUCCESS: {
      const newState = { ...state };
      const businesses =
        build(payload.data, "businesses", null, {
          ignoreLinks: true
        }) || [];
      newState.profileBusinesses.isFetching = false;
      newState.profileBusinesses.isSucceeded = true;
      newState.profileBusinesses.data = businesses;
      return newState;
    }
    case FETCH_PROFILE_BUSINESSES_FAIL: {
      const newState = { ...state };
      newState.profileBusinesses.isFetching = false;
      newState.profileBusinesses.isFailed = true;
      return newState;
    }

    case FETCH_PROFILE_BUSINESS_REQUEST: {
      const newState = { ...state };
      newState.currentBusiness.data = null;
      newState.currentBusiness.isFetching = true;
      newState.currentBusiness.isFailed = false;
      newState.currentBusiness.isSucceeded = false;
      return newState;
    }
    case FETCH_PROFILE_BUSINESS_SUCCESS: {
      const newState = { ...state };
      const business = build(
        payload.data,
        "businesses",
        payload.rawData.data.id,
        {
          ignoreLinks: true
        }
      );
      newState.currentBusiness.isFetching = false;
      newState.currentBusiness.isSucceeded = true;
      newState.currentBusiness.data = business;
      return newState;
    }
    case FETCH_PROFILE_BUSINESS_FAIL: {
      const newState = { ...state };
      newState.currentBusiness.isFetching = false;
      newState.currentBusiness.isFailed = true;
      return newState;
    }

    case POST_PICTURE_SUCCESS: {
      if (payload.rawData.data.attributes.parentResource === "business") {
        const newState = { ...state };
        const picture = build(
          payload.data,
          "pictures",
          payload.rawData.data.id,
          {
            ignoreLinks: true
          }
        );
        newState.currentBusiness.data = {
          ...newState.currentBusiness.data,
          pictures: [...newState.currentBusiness.data.pictures, picture]
        };
        return newState;
      }
      return state;
    }

    case DELETE_PICTURE_REQUEST: {
      const newState = { ...state };
      newState.currentBusiness.data = {
        ...newState.currentBusiness.data,
        pictures: newState.currentBusiness.data.pictures.filter(
          p => p.id !== meta.id
        )
      };
      return newState;
    }

    case POST_MENU_SUCCESS: {
      const newState = { ...state };
      const menu = build(payload.data, "menus", payload.rawData.data.id, {
        ignoreLinks: true
      });
      newState.currentBusiness.data = {
        ...newState.currentBusiness.data,
        menus: [...newState.currentBusiness.data.menus, menu]
      };
      return newState;
    }

    case DELETE_MENU_REQUEST: {
      const newState = { ...state };
      newState.currentBusiness.data = {
        ...newState.currentBusiness.data,
        menus: newState.currentBusiness.data.menus.filter(m => m.id !== meta.id)
      };
      return newState;
    }

    case POST_PRODUCT_SUCCESS: {
      const newState = { ...state };
      const product = build(payload.data, "products", payload.rawData.data.id, {
        ignoreLinks: true
      });
      newState.currentBusiness.data = {
        ...newState.currentBusiness.data,
        products: [...newState.currentBusiness.data.products, product]
      };
      return newState;
    }

    case DELETE_PRODUCT_REQUEST: {
      const newState = { ...state };
      newState.currentBusiness.data = {
        ...newState.currentBusiness.data,
        products: newState.currentBusiness.data.products.filter(
          p => p.id !== meta.id
        )
      };
      return newState;
    }

    case POST_BUSINESS_REQUEST: {
      const newState = { ...state };
      newState.currentBusiness = initialState.currentBusiness;
      return newState;
    }

    case POST_BUSINESS_SUCCESS: {
      const newState = { ...state };
      const business =
        build(payload.data, "businesses", payload.rawData.data.id, {
          ignoreLinks: true
        }) || [];
      newState.profileBusinesses.data = newState.profileBusinesses.data.concat(
        business
      );
      return newState;
    }

    case PATCH_BUSINESS_SUCCESS: {
      const newState = { ...state };
      const business =
        build(payload.data, "businesses", payload.rawData.data.id, {
          ignoreLinks: true
        }) || [];
      meta.updatedValues.forEach(v => {
        if (v === "logo") {
          newState.currentBusiness.data = {
            ...newState.currentBusiness.data,
            [v]: {
              url: business[v].url
            }
          };
        }
        if (v === "visibleInLefood") {
          newState.currentBusiness.data = {
            ...newState.currentBusiness.data,
            visibleInLefood: business.visibleInLefood
          };
        }
        if (v === "state") {
          newState.currentBusiness.data = {
            ...newState.currentBusiness.data,
            state: business.state
          };
        }
        if (v === "averageDeliveryTime") {
          newState.currentBusiness.data = {
            ...newState.currentBusiness.data,
            averageDeliveryTime: business.averageDeliveryTime
          };
        }
        if (v === "minAmountForDeliveryCents") {
          newState.currentBusiness.data = {
            ...newState.currentBusiness.data,
            minAmountForDeliveryCents: business.minAmountForDeliveryCents
          };
        }
        if (v === "allowPickup") {
          newState.currentBusiness = {
            ...state.currentBusiness,
            data: {
              ...state.currentBusiness.data,
              allowPickup: business.allowPickup
            }
          };
        }
      });
      return newState;
    }

    case POST_OPEN_PERIOD_SUCCESS: {
      const newState = { ...state };
      const openPeriod =
        build(payload.data, "openPeriods", payload.rawData.data.id, {
          ignoreLinks: true
        }) || [];
      newState.currentBusiness.data = {
        ...newState.currentBusiness.data,
        openPeriods: [...newState.currentBusiness.data.openPeriods, openPeriod]
      };
      return newState;
    }

    case PATCH_OPEN_PERIOD_SUCCESS: {
      const newState = { ...state };
      const openPeriod =
        build(payload.data, "openPeriods", payload.rawData.data.id, {
          ignoreLinks: true
        }) || [];
      const editedOpenPeriodIndex = newState.currentBusiness.data.openPeriods.findIndex(
        p => p.id === payload.rawData.data.id
      );
      newState.currentBusiness.data.openPeriods[
        editedOpenPeriodIndex
      ] = openPeriod;
      return newState;
    }

    case DELETE_OPEN_PERIOD_REQUEST: {
      const newState = { ...state };
      newState.currentBusiness.data = {
        ...newState.currentBusiness.data,
        openPeriods: newState.currentBusiness.data.openPeriods.filter(
          p => p.id !== meta.id
        )
      };
      return newState;
    }

    case POST_ORDER_PERIOD_SUCCESS: {
      const newState = { ...state };
      const orderPeriod =
        build(payload.data, "orderPeriods", payload.rawData.data.id, {
          ignoreLinks: true
        }) || [];
      newState.currentBusiness.data = {
        ...newState.currentBusiness.data,
        orderPeriods: [
          ...newState.currentBusiness.data.orderPeriods,
          orderPeriod
        ]
      };
      return newState;
    }

    case PATCH_ORDER_PERIOD_SUCCESS: {
      const newState = { ...state };
      const orderPeriod =
        build(payload.data, "orderPeriods", payload.rawData.data.id, {
          ignoreLinks: true
        }) || [];
      const editedOrderPeriodIndex = newState.currentBusiness.data.orderPeriods.findIndex(
        p => p.id === payload.rawData.data.id
      );
      newState.currentBusiness.data.orderPeriods[
        editedOrderPeriodIndex
      ] = orderPeriod;
      return newState;
    }

    case DELETE_ORDER_PERIOD_REQUEST: {
      const newState = { ...state };
      newState.currentBusiness.data = {
        ...newState.currentBusiness.data,
        orderPeriods: newState.currentBusiness.data.orderPeriods.filter(
          p => p.id !== meta.id
        )
      };
      return newState;
    }

    case FETCH_PROFILE_CARDS_REQUEST: {
      const newState = { ...state };
      newState.cards.data = null;
      newState.cards.isFetching = true;
      newState.cards.isFailed = false;
      newState.cards.isSucceeded = false;
      return newState;
    }
    case FETCH_PROFILE_CARDS_SUCCESS: {
      const newState = { ...state };
      const cards =
        build(payload.data, "cards", null, {
          ignoreLinks: true
        }) || [];
      newState.cards.isFetching = false;
      newState.cards.isSucceeded = true;
      newState.cards.data = cards;
      return newState;
    }
    case FETCH_PROFILE_CARDS_FAIL: {
      const newState = { ...state };
      newState.cards.isFetching = false;
      newState.cards.isFailed = true;
      return newState;
    }

    case FETCH_PROFILE_SUBSCRIPTIONS_REQUEST: {
      const newState = { ...state };
      newState.subscriptions.data = null;
      newState.subscriptions.isFetching = true;
      newState.subscriptions.isFailed = false;
      newState.subscriptions.isSucceeded = false;
      return newState;
    }
    case FETCH_PROFILE_SUBSCRIPTIONS_SUCCESS: {
      const newState = { ...state };
      const subscriptions =
        build(payload.data, "subscriptions", null, {
          ignoreLinks: true
        }) || [];
      newState.subscriptions.isFetching = false;
      newState.subscriptions.isSucceeded = true;
      newState.subscriptions.data = subscriptions;
      return newState;
    }
    case FETCH_PROFILE_SUBSCRIPTIONS_FAIL: {
      const newState = { ...state };
      newState.subscriptions.isFetching = false;
      newState.subscriptions.isFailed = true;
      return newState;
    }

    case LOGOUT: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};

export default reducer;
