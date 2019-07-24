/* eslint-disable no-param-reassign */
import moment from "moment";

import { LOGOUT } from "types/auth";

import { Record, Map } from "immutable";

const initialState = Record({
  data: Map({
    // TODO: remove mock data and fetch real data from api
    bookings: {
      "38773cb9-44ce-4521-8abf-932da26f22ac": {
        id: "38773cb9-44ce-4521-8abf-932da26f22ac",
        attributes: {
          name: "John",
          email: "john@example.com",
          date: moment({ day: 10 }).toISOString(),
          from: 52200,
          to: 52800,
          partySize: 5,
          phone: "987654312",
          phoneCountryCode: "PL",
          phoneCountryPrefix: "+48"
        }
      },
      "7b4fe06d-22db-499c-a459-b2245c84ee30": {
        id: "7b4fe06d-22db-499c-a459-b2245c84ee30",
        attributes: {
          name: "John",
          email: "john@example.com",
          date: moment({ day: 12 }).toISOString(),
          from: 52200,
          to: 52800,
          partySize: 5,
          phone: "987654312",
          phoneCountryCode: "PL",
          phoneCountryPrefix: "+48"
        }
      },
      "57499f23-6439-4c91-99d0-6ecc78eb3bc1": {
        id: "57499f23-6439-4c91-99d0-6ecc78eb3bc1",
        attributes: {
          name: "John",
          email: "john@example.com",
          date: moment({ day: 15 }).toISOString(),
          from: 52200,
          to: 52800,
          partySize: 5,
          phone: "987654312",
          phoneCountryCode: "PL",
          phoneCountryPrefix: "+48"
        }
      },
      "b5a7a8e4-a098-4537-af06-4f3976ba9d90": {
        id: "b5a7a8e4-a098-4537-af06-4f3976ba9d90",
        attributes: {
          name: "John",
          email: "john@example.com",
          date: moment({ day: 20 }).toISOString(),
          from: 52200,
          to: 52800,
          partySize: 5,
          phone: "987654312",
          phoneCountryCode: "PL",
          phoneCountryPrefix: "+48"
        }
      }
    }
  }),
  isFetching: false,
  isFailed: false,
  isSucceeded: false
})();

const reducer = (state = initialState, { type }) => {
  switch (type) {
    case LOGOUT: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};

export default reducer;
