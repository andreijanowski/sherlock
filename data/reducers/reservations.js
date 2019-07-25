/* eslint-disable no-param-reassign */
import {
  POST_RESERVATION_SUCCESS,
  PATCH_RESERVATION_SUCCESS,
  DELETE_RESERVATION_REQUEST
} from "types/reservations";
import {
  FETCH_BUSINESS_RESERVATIONS_REQUEST,
  FETCH_BUSINESS_RESERVATIONS_SUCCESS,
  FETCH_BUSINESS_RESERVATIONS_FAIL
} from "types/businesses";
import { LOGOUT } from "types/auth";

import { Record, Map, fromJS } from "immutable";

const initialState = Record({
  // data: Map({
  //   // TODO: remove mock data and fetch real data from api
  //   reservations: {
  //     "38773cb9-44ce-4521-8abf-932da26f22ac": {
  //       id: "38773cb9-44ce-4521-8abf-932da26f22ac",
  //       attributes: {
  //         name: "John",
  //         email: "john@example.com",
  //         date: moment({ day: 10 }).toISOString(),
  //         from: 52200,
  //         to: 52800,
  //         partySize: 5,
  //         phone: "987654312",
  //         phoneCountryCode: "PL",
  //         phoneCountryPrefix: "+48"
  //       }
  //     },
  //     "7b4fe06d-22db-499c-a459-b2245c84ee30": {
  //       id: "7b4fe06d-22db-499c-a459-b2245c84ee30",
  //       attributes: {
  //         name: "John",
  //         email: "john@example.com",
  //         date: moment({ day: 12 }).toISOString(),
  //         from: 52200,
  //         to: 52800,
  //         partySize: 5,
  //         phone: "987654312",
  //         phoneCountryCode: "PL",
  //         phoneCountryPrefix: "+48"
  //       }
  //     },
  //     "57499f23-6439-4c91-99d0-6ecc78eb3bc1": {
  //       id: "57499f23-6439-4c91-99d0-6ecc78eb3bc1",
  //       attributes: {
  //         name: "John",
  //         email: "john@example.com",
  //         date: moment({ day: 15 }).toISOString(),
  //         from: 52200,
  //         to: 52800,
  //         partySize: 5,
  //         phone: "987654312",
  //         phoneCountryCode: "PL",
  //         phoneCountryPrefix: "+48"
  //       }
  //     },
  //     "b5a7a8e4-a098-4537-af06-4f3976ba9d90": {
  //       id: "b5a7a8e4-a098-4537-af06-4f3976ba9d90",
  //       attributes: {
  //         name: "John",
  //         email: "john@example.com",
  //         date: moment({ day: 20 }).toISOString(),
  //         from: 52200,
  //         to: 52800,
  //         partySize: 5,
  //         phone: "987654312",
  //         phoneCountryCode: "PL",
  //         phoneCountryPrefix: "+48"
  //       }
  //     }
  //   }
  // }),
  data: Map(),
  isFetching: false,
  isFailed: false,
  isSucceeded: false
})();

const reducer = (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case FETCH_BUSINESS_RESERVATIONS_REQUEST: {
      return state.merge(
        Record({
          isFetching: true,
          isFailed: false,
          isSucceeded: false
        })()
      );
    }
    case FETCH_BUSINESS_RESERVATIONS_SUCCESS: {
      let newState = state.merge(
        Record({
          isFetching: false,
          isSucceeded: true
        })()
      );
      if (meta.page === 1) {
        newState = newState.setIn(["data"], fromJS(payload.data));
      } else {
        newState = newState.mergeIn(
          ["data", "reservations"],
          fromJS(payload.data.reservations)
        );
      }
      return newState;
    }
    case FETCH_BUSINESS_RESERVATIONS_FAIL: {
      let newState = state.merge(
        Record({
          isFetching: false,
          isFailed: true
        })()
      );
      if (meta.page === 1) {
        newState = newState.merge(
          Record({
            data: Map()
          })()
        );
      }
      return newState;
    }

    case POST_RESERVATION_SUCCESS: {
      if (state.getIn(["data"]) && state.getIn(["data"]).size) {
        return state.mergeIn(
          ["data", "reservations"],
          fromJS(payload.data.reservations)
        );
      }
      return state.setIn(["data"], fromJS(payload.data));
    }

    case PATCH_RESERVATION_SUCCESS: {
      if (state.getIn(["data"]) && state.getIn(["data"]).size) {
        return state.mergeDeepIn(
          ["data", "reservations"],
          fromJS(payload.data.reservations)
        );
      }
      return state.setIn(["data"], fromJS(payload.data));
    }

    case DELETE_RESERVATION_REQUEST: {
      return state.deleteIn(["data", "reservations", meta.id]);
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
