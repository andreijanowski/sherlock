import { ACCEPT_COOKIES, SET_CURRENT_BUSINESS } from "types/app";

const reducer = (
  state = {
    cookiesAccepted: false,
    currentBusinessId: undefined
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
    default: {
      return state;
    }
  }
};

export default reducer;
