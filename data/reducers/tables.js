/* eslint-disable no-param-reassign */
import { LOGOUT } from "types/auth";

import { Record, Map } from "immutable";

const initialState = Record({
  data: Map({
    // TODO: remove mock data and fetch real data from api
    tables: {
      "38773cb9-44ce-4521-8abf-932da26f22ac": {
        id: "38773cb9-44ce-4521-8abf-932da26f22ac",
        attributes: {
          number: 1,
          numberOfSeats: 1
        }
      },
      "7b4fe06d-22db-499c-a459-b2245c84ee30": {
        id: "7b4fe06d-22db-499c-a459-b2245c84ee30",
        attributes: {
          number: 2,
          numberOfSeats: 2
        }
      },
      "57499f23-6439-4c91-99d0-6ecc78eb3bc1": {
        id: "57499f23-6439-4c91-99d0-6ecc78eb3bc1",
        attributes: {
          number: 3,
          numberOfSeats: 3
        }
      },
      "b5a7a8e4-a098-4537-af06-4f3976ba9d90": {
        id: "b5a7a8e4-a098-4537-af06-4f3976ba9d90",
        attributes: {
          number: 4,
          numberOfSeats: 4
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
