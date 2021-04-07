import { List, Record } from "immutable";
import { get } from "lodash";
import {
  PARTNERS_PREFERRED_ADD_FAIL,
  PARTNERS_PREFERRED_ADD_REQUEST,
  PARTNERS_PREFERRED_ADD_SUCCESS,
  PARTNERS_PREFERRED_DELETE_REQUEST,
  PARTNERS_PREFERRED_DELETE_SUCCESS,
  PARTNERS_PREFERRED_FETCH_SUCCESS
} from "types/partners";

const initialState = Record({
  items: List(),
  pages: 0,
  pending: false,
  total: 0
})();

const reducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case PARTNERS_PREFERRED_ADD_FAIL: {
      return state.set("pending", false);
    }
    case PARTNERS_PREFERRED_ADD_REQUEST:
    case PARTNERS_PREFERRED_DELETE_REQUEST: {
      return state.set("pending", true);
    }
    case PARTNERS_PREFERRED_ADD_SUCCESS: {
      const { rawData } = action.payload;
      const businessId = get(rawData, "data.id", "");
      const partnerIncluded = state.get("items").includes(businessId);

      if (partnerIncluded) {
        return state;
      }

      return state
        .set("pending", false)
        .update("items", items => items.push(rawData.data));
    }

    case PARTNERS_PREFERRED_DELETE_SUCCESS: {
      const dataJSON = get(action, "payload.config.data", "");
      const parsed = JSON.parse(dataJSON);
      const businessId = get(parsed, "data.relationships.partner.data.id", "");

      return state
        .set("pending", false)
        .update("items", items => items.filter(item => item.id !== businessId));
    }

    case PARTNERS_PREFERRED_FETCH_SUCCESS: {
      const {
        rawData: {
          data,
          meta: { totalCount, totalPages }
        }
      } = action.payload;

      return state.merge(
        Record({
          items: List(data),
          pages: totalPages,
          total: totalCount
        })()
      );
    }

    default:
      return state;
  }
};

export default reducer;
