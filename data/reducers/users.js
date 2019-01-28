import {
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAIL,
  FETCH_PROFILE_BUSINESSES_REQUEST,
  FETCH_PROFILE_BUSINESSES_SUCCESS,
  FETCH_PROFILE_BUSINESSES_FAIL,
  FETCH_PROFILE_BUSINESS_REQUEST,
  FETCH_PROFILE_BUSINESS_SUCCESS,
  FETCH_PROFILE_BUSINESS_FAIL
} from "types/users";

import { POST_PICTURE_SUCCESS, DELETE_PICTURE_REQUEST } from "types/pictures";
import { POST_MENU_SUCCESS, DELETE_MENU_REQUEST } from "types/menus";
import { POST_PRODUCT_SUCCESS, DELETE_PRODUCT_REQUEST } from "types/products";

import build from "redux-object";

const initialState = {
  profile: {
    data: null,
    isFetching: false,
    isFailed: false,
    isSucceeded: false
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
  }
};

const reducer = (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case FETCH_PROFILE_REQUEST: {
      const newState = state;
      newState.profile.isFetching = true;
      newState.profile.isFailed = false;
      newState.profile.isSucceeded = false;
      return { ...newState };
    }
    case FETCH_PROFILE_SUCCESS: {
      const newState = state;
      const profile = build(payload.data, "users", payload.rawData.data.id, {
        ignoreLinks: true
      });
      newState.profile.isFetching = false;
      newState.profile.isSucceeded = true;
      newState.profile.data = profile;
      newState.profile.data.avatar.url = `${
        profile.avatar.url
      }?${new Date().getTime()}`;
      return { ...newState };
    }
    case FETCH_PROFILE_FAIL: {
      const newState = state;
      newState.profile.isFetching = false;
      newState.profile.isFailed = true;
      return { ...newState };
    }

    case FETCH_PROFILE_BUSINESSES_REQUEST: {
      const newState = state;
      newState.profileBusinesses.isFetching = true;
      newState.profileBusinesses.isFailed = false;
      newState.profileBusinesses.isSucceeded = false;
      return { ...newState };
    }
    case FETCH_PROFILE_BUSINESSES_SUCCESS: {
      const newState = state;
      const businesses = build(payload.data, "businesses", null, {
        ignoreLinks: true
      });
      newState.profileBusinesses.isFetching = false;
      newState.profileBusinesses.isSucceeded = true;
      newState.profileBusinesses.data = businesses;
      return { ...newState };
    }
    case FETCH_PROFILE_BUSINESSES_FAIL: {
      const newState = state;
      newState.profileBusinesses.isFetching = false;
      newState.profileBusinesses.isFailed = true;
      return { ...newState };
    }

    case FETCH_PROFILE_BUSINESS_REQUEST: {
      const newState = state;
      newState.currentBusiness.isFetching = true;
      newState.currentBusiness.isFailed = false;
      newState.currentBusiness.isSucceeded = false;
      return { ...newState };
    }
    case FETCH_PROFILE_BUSINESS_SUCCESS: {
      const newState = state;
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
      return { ...newState };
    }
    case FETCH_PROFILE_BUSINESS_FAIL: {
      const newState = state;
      newState.currentBusiness.isFetching = false;
      newState.currentBusiness.isFailed = true;
      return { ...newState };
    }

    case POST_PICTURE_SUCCESS: {
      const newState = state;
      const picture = build(payload.data, "pictures", payload.rawData.data.id, {
        ignoreLinks: true
      });
      newState.currentBusiness.data = {
        ...newState.currentBusiness.data,
        pictures: [...newState.currentBusiness.data.pictures, picture]
      };
      return { ...newState };
    }

    case DELETE_PICTURE_REQUEST: {
      const newState = state;
      newState.currentBusiness.data = {
        ...newState.currentBusiness.data,
        pictures: newState.currentBusiness.data.pictures.filter(
          p => p.id !== meta.id
        )
      };
      return { ...newState };
    }

    case POST_MENU_SUCCESS: {
      const newState = state;
      const menu = build(payload.data, "menus", payload.rawData.data.id, {
        ignoreLinks: true
      });
      newState.currentBusiness.data = {
        ...newState.currentBusiness.data,
        menus: [...newState.currentBusiness.data.menus, menu]
      };
      return { ...newState };
    }

    case DELETE_MENU_REQUEST: {
      const newState = state;
      newState.currentBusiness.data = {
        ...newState.currentBusiness.data,
        menus: newState.currentBusiness.data.menus.filter(m => m.id !== meta.id)
      };
      return { ...newState };
    }

    case POST_PRODUCT_SUCCESS: {
      const newState = state;
      const product = build(payload.data, "products", payload.rawData.data.id, {
        ignoreLinks: true
      });
      newState.currentBusiness.data = {
        ...newState.currentBusiness.data,
        products: [...newState.currentBusiness.data.products, product]
      };
      return { ...newState };
    }

    case DELETE_PRODUCT_REQUEST: {
      const newState = state;
      newState.currentBusiness.data = {
        ...newState.currentBusiness.data,
        products: newState.currentBusiness.data.products.filter(
          p => p.id !== meta.id
        )
      };
      return { ...newState };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
