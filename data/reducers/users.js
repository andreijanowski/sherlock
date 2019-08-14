/* eslint-disable no-param-reassign */
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
import {
  POST_MENU_SUCCESS,
  PATCH_MENU_SUCCESS,
  DELETE_MENU_REQUEST
} from "types/menus";
import {
  POST_PRODUCT_SUCCESS,
  PATCH_PRODUCT_SUCCESS,
  DELETE_PRODUCT_REQUEST
} from "types/products";
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
import { Record, fromJS } from "immutable";

const fieldsThatShouldBeUpdatedImmediatly = [
  "visibleInLefood",
  "state",
  "averageDeliveryTime",
  "minAmountForDeliveryCents",
  "stripeCurrency",
  "allowPickup",
  "logo",
  "name",
  "timeSlots",
  "timeOfStay",
  "minTimeBeforeReservation",
  "maxReservationSize"
];

const initialState = Record({
  profile: Record({
    data: null,
    isFetching: false,
    isFailed: false,
    isSucceeded: false,
    isUpdating: false
  })(),
  profileBusinesses: Record({
    data: null,
    isFetching: false,
    isFailed: false,
    isSucceeded: false
  })(),
  currentBusiness: Record({
    data: null,
    members: null,
    isFetching: false,
    isFailed: false,
    isSucceeded: false
  })(),
  cards: Record({
    data: null,
    isFetching: false,
    isFailed: false,
    isSucceeded: false
  })(),
  subscriptions: Record({
    data: null,
    isFetching: false,
    isFailed: false,
    isSucceeded: false
  })()
})();

const reducer = (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case FETCH_PROFILE_REQUEST: {
      return state.mergeIn(
        ["profile"],
        Record({
          data: null,
          isFetching: true,
          isFailed: false,
          isSucceeded: false
        })()
      );
    }
    case FETCH_PROFILE_SUCCESS: {
      return state.mergeIn(
        ["profile"],
        Record({
          data: fromJS(payload.data),
          isFetching: false,
          isSucceeded: true
        })()
      );
    }
    case FETCH_PROFILE_FAIL: {
      return state.mergeIn(
        ["profile"],
        Record({
          isFetching: false,
          isFailed: true
        })()
      );
    }

    case UPDATE_PROFILE_REQUEST: {
      return state.mergeIn(
        ["profile"],
        Record({
          isUpdating: true
        })()
      );
    }

    case UPDATE_PROFILE_SUCCESS: {
      return state.mergeIn(
        ["profile"],
        Record({
          isUpdating: false,
          data: fromJS(payload.data)
        })()
      );
    }

    case FETCH_PROFILE_BUSINESSES_REQUEST: {
      return state.mergeIn(
        ["profileBusinesses"],
        Record({
          isFetching: true,
          isFailed: false,
          isSucceeded: false
        })()
      );
    }
    case FETCH_PROFILE_BUSINESSES_SUCCESS: {
      let newState = state.mergeIn(
        ["profileBusinesses"],
        Record({
          isFetching: false,
          isSucceeded: true
        })()
      );
      if (meta.page === 1) {
        newState = newState.setIn(
          ["profileBusinesses", "data"],
          fromJS(payload.data)
        );
      } else {
        newState = newState.mergeIn(
          ["profileBusinesses", "data", "businesses"],
          fromJS(payload.data.businesses)
        );
      }
      return newState;
    }
    case FETCH_PROFILE_BUSINESSES_FAIL: {
      state.mergeIn(
        ["profileBusinesses"],
        Record({
          isFetching: false,
          isFailed: true
        })
      );
      if (meta.page === 1) {
        state.setIn(["profileBusinesses", "data"], null);
      }
      return state;
    }

    case FETCH_PROFILE_BUSINESS_REQUEST: {
      if (meta.isNewBusinessFetching) {
        return state.mergeIn(
          ["currentBusiness"],
          Record({
            data: null,
            isFetching: true,
            isFailed: false,
            isSucceeded: false
          })()
        );
      }
      return state.mergeIn(
        ["currentBusiness"],
        Record({
          isFetching: true,
          isFailed: false,
          isSucceeded: false
        })()
      );
    }
    case FETCH_PROFILE_BUSINESS_SUCCESS: {
      return state.mergeIn(
        ["currentBusiness"],
        Record({
          data: fromJS(payload.data),
          isFetching: false,
          isSucceeded: true
        })()
      );
    }
    case FETCH_PROFILE_BUSINESS_FAIL: {
      return state.mergeIn(
        ["currentBusiness"],
        Record({
          isFetching: false,
          isFailed: true
        })()
      );
    }

    case POST_PICTURE_SUCCESS: {
      if (payload.rawData.data.attributes.parentResource === "business") {
        return state.setIn(
          ["currentBusiness", "data", "pictures", payload.rawData.data.id],
          fromJS(payload.data.pictures[payload.rawData.data.id])
        );
      }
      return state;
    }

    case DELETE_PICTURE_REQUEST: {
      if (meta.parentResource === "business") {
        return state.deleteIn(["currentBusiness", "data", "pictures", meta.id]);
      }
      return state;
    }

    case POST_MENU_SUCCESS: {
      return state.setIn(
        ["currentBusiness", "data", "menus", payload.rawData.data.id],
        fromJS(payload.data.menus[payload.rawData.data.id])
      );
    }

    case PATCH_MENU_SUCCESS: {
      return state.mergeIn(
        ["currentBusiness", "data", "menus", payload.rawData.data.id],
        fromJS(payload.data.menus[payload.rawData.data.id])
      );
    }

    case DELETE_MENU_REQUEST: {
      return state.deleteIn(["currentBusiness", "data", "menus", meta.id]);
    }

    case POST_PRODUCT_SUCCESS: {
      return state.setIn(
        ["currentBusiness", "data", "products", payload.rawData.data.id],
        fromJS(payload.data.products[payload.rawData.data.id])
      );
    }
    case PATCH_PRODUCT_SUCCESS: {
      return state.mergeIn(
        ["currentBusiness", "data", "products", payload.rawData.data.id],
        fromJS(payload.data.products[payload.rawData.data.id])
      );
    }

    case DELETE_PRODUCT_REQUEST: {
      return state.deleteIn(["currentBusiness", "data", "products", meta.id]);
    }

    case POST_BUSINESS_REQUEST: {
      return state.setIn(
        ["currentBusiness"],
        initialState.get("currentBusiness")
      );
    }

    case POST_BUSINESS_SUCCESS: {
      return state.mergeIn(
        ["profileBusinesses", "data", "businesses"],
        fromJS(payload.data.businesses)
      );
    }

    case PATCH_BUSINESS_SUCCESS: {
      let newState = null;
      meta.updatedValues.forEach(v => {
        if (fieldsThatShouldBeUpdatedImmediatly.includes(v)) {
          const currentBusinessPathArray = [
            "currentBusiness",
            "data",
            "businesses",
            payload.rawData.data.id,
            "attributes",
            v
          ];
          const profileBusinessesPathArray = [
            "profileBusinesses",
            "data",
            "businesses",
            payload.rawData.data.id,
            "attributes",
            v
          ];
          if (newState) {
            if (v === "name" || v === "logo") {
              newState = newState.setIn(
                profileBusinessesPathArray,
                payload.data.businesses[payload.rawData.data.id].attributes[v]
              );
            }
            newState = newState.setIn(
              currentBusinessPathArray,
              payload.data.businesses[payload.rawData.data.id].attributes[v]
            );
          } else if (v === "name" || v === "logo") {
            newState = state
              .setIn(
                profileBusinessesPathArray,
                payload.data.businesses[payload.rawData.data.id].attributes[v]
              )
              .setIn(
                currentBusinessPathArray,
                payload.data.businesses[payload.rawData.data.id].attributes[v]
              );
          } else {
            newState = state.setIn(
              currentBusinessPathArray,
              payload.data.businesses[payload.rawData.data.id].attributes[v]
            );
          }
        }
      });
      return newState || state;
    }

    case POST_OPEN_PERIOD_SUCCESS: {
      return state.setIn(
        ["currentBusiness", "data", "openPeriods", payload.rawData.data.id],
        fromJS(payload.data.openPeriods[payload.rawData.data.id])
      );
    }

    case PATCH_OPEN_PERIOD_SUCCESS: {
      return state.mergeIn(
        [
          "currentBusiness",
          "data",
          "openPeriods",
          payload.rawData.data.id,
          "attributes"
        ],
        fromJS(payload.data.openPeriods[payload.rawData.data.id].attributes)
      );
    }

    case DELETE_OPEN_PERIOD_REQUEST: {
      return state.deleteIn([
        "currentBusiness",
        "data",
        "openPeriods",
        meta.id
      ]);
    }

    case POST_ORDER_PERIOD_SUCCESS: {
      return state.setIn(
        ["currentBusiness", "data", "orderPeriods", payload.rawData.data.id],
        fromJS(payload.data.orderPeriods[payload.rawData.data.id])
      );
    }

    case PATCH_ORDER_PERIOD_SUCCESS: {
      return state.mergeIn(
        [
          "currentBusiness",
          "data",
          "orderPeriods",
          payload.rawData.data.id,
          "attributes"
        ],
        fromJS(payload.data.orderPeriods[payload.rawData.data.id].attributes)
      );
    }

    case DELETE_ORDER_PERIOD_REQUEST: {
      return state.deleteIn([
        "currentBusiness",
        "data",
        "orderPeriods",
        meta.id
      ]);
    }

    case FETCH_PROFILE_CARDS_REQUEST: {
      return state.mergeIn(
        ["cards"],
        Record({
          isFetching: true,
          isFailed: false,
          isSucceeded: false
        })()
      );
    }
    case FETCH_PROFILE_CARDS_SUCCESS: {
      let newState = state.mergeIn(
        ["cards"],
        Record({
          isFetching: false,
          isSucceeded: true
        })()
      );
      if (meta.page === 1) {
        newState = newState.setIn(["cards", "data"], fromJS(payload.data));
      } else {
        newState = newState.mergeIn(
          ["cards", "data", "cards"],
          fromJS(payload.data.cards)
        );
      }
      return newState;
    }
    case FETCH_PROFILE_CARDS_FAIL: {
      state.mergeIn(
        ["cards"],
        Record({
          isFetching: false,
          isFailed: true
        })()
      );
      if (meta.page === 1) {
        state.setIn(["cards", "data"], null);
      }
      return state;
    }

    case FETCH_PROFILE_SUBSCRIPTIONS_REQUEST: {
      return state.mergeIn(
        ["subscriptions"],
        Record({
          data: null,
          isFetching: true,
          isFailed: false,
          isSucceeded: false
        })()
      );
    }
    case FETCH_PROFILE_SUBSCRIPTIONS_SUCCESS: {
      return state.mergeIn(
        ["subscriptions"],
        Record({
          data: fromJS(payload.data),
          isFetching: false,
          isSucceeded: true
        })()
      );
    }
    case FETCH_PROFILE_SUBSCRIPTIONS_FAIL: {
      return state.mergeIn(
        ["subscriptions"],
        Record({
          isFetching: false,
          isFailed: true
        })()
      );
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
