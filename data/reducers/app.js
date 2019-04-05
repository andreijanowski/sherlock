import { ACCEPT_COOKIES } from "types/app";

const reducer = (
  state = {
    cookiesAccepted: false
  },
  { type }
) => {
  switch (type) {
    case ACCEPT_COOKIES: {
      return { cookiesAccepted: true };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
