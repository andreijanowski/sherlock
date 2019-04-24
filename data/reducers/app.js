import {
  ACCEPT_COOKIES,
  SET_CURRENT_BUSINESS,
  SET_CURRENT_USER_ID
} from "types/app";

const reducer = (
  state = {
    cookiesAccepted: false,
    currentBusinessId: undefined,
    currentUserId: undefined
  },
  { type, payload }
) => {
  switch (type) {
    case ACCEPT_COOKIES: {
      return { ...state, cookiesAccepted: true };
    }
    case SET_CURRENT_BUSINESS: {
      return { ...state, currentBusinessId: payload.id };
    }
    case SET_CURRENT_USER_ID: {
      return { ...state, currentUserId: payload.id };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
