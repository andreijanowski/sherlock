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
    isFetching: false,
    isFailed: false,
    isSucceeded: false
  }
};

const reducer = (state = initialState, { type, payload }) => {
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
      newState.profileBusinesses.isFetching = false;
      newState.profileBusinesses.isSucceeded = true;
      newState.profileBusinesses.data = payload.rawData.data;
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

    default: {
      return state;
    }
  }
};

export default reducer;
