import { SET_INSTANCE_UUID } from "types/app";
import { LOGOUT } from "types/auth";
import { Record } from "immutable";

const initialState = Record({
  instanceUuid: null
})();

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_INSTANCE_UUID: {
      return state.set("instanceUuid", payload.uuid);
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
