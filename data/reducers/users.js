import { FETCH_PROFILE_SUCCESS } from "types/users";
import build from "redux-object";

const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_PROFILE_SUCCESS: {
      const profile = build(payload.data, "users", payload.rawData.data.id, {
        ignoreLinks: true
      });

      return {
        ...state,
        profile: {
          ...profile,
          avatar: {
            url: `${profile.avatar.url}?${new Date().getTime()}`
          }
        }
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
