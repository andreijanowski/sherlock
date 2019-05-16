import {
  ACCEPT_COOKIES,
  SET_CURRENT_BUSINESS,
  SET_CURRENT_USER_ID
} from "types/app";
import { Record } from "immutable";

const initialState = Record({
  cookiesAccepted: false,
  currentBusinessId: undefined,
  currentUserId: undefined
})();

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACCEPT_COOKIES: {
      return state.set("cookiesAccepted", true);
    }
    case SET_CURRENT_BUSINESS: {
      return state.set("currentBusinessId", payload.id);
    }
    case SET_CURRENT_USER_ID: {
      return state.set("currentUserId", payload.id);
    }
    default: {
      return state;
    }
  }
};

export default reducer;
