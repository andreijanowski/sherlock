import {
  FETCH_BUSINESS_CATERINGS_REQUEST,
  FETCH_BUSINESS_CATERINGS_SUCCESS,
  FETCH_BUSINESS_CATERINGS_FAIL
} from "types/businesses";

import {
  POST_CATERING_SUCCESS,
  PATCH_CATERING_SUCCESS,
  DELETE_CATERING_REQUEST,
  SET_EDIT_CATERING,
  SEND_CATERING_OFFER_SUCCESS
} from "types/caterings";

import { LOGOUT } from "types/auth";

export const fetchCateringsRequestAction = () => ({
  type: FETCH_BUSINESS_CATERINGS_REQUEST
});

export const fetchCateringsSuccessAction = ({ page }) =>
  page === 1
    ? {
        type: FETCH_BUSINESS_CATERINGS_SUCCESS,
        payload: {
          data: {
            caterings: {
              "38773cb9-44ce-4521-8abf-932da26f22ac": {
                id: "38773cb9-44ce-4521-8abf-932da26f22ac"
              },
              "7b4fe06d-22db-499c-a459-b2245c84ee30": {
                id: "7b4fe06d-22db-499c-a459-b2245c84ee30"
              },
              "57499f23-6439-4c91-99d0-6ecc78eb3bc1": {
                id: "57499f23-6439-4c91-99d0-6ecc78eb3bc1"
              },
              "b5a7a8e4-a098-4537-af06-4f3976ba9d90": {
                id: "b5a7a8e4-a098-4537-af06-4f3976ba9d90"
              }
            }
          }
        },
        meta: {
          page: 1
        }
      }
    : {
        type: FETCH_BUSINESS_CATERINGS_SUCCESS,
        payload: {
          data: {
            caterings: {
              "d88079a6-7178-4a70-8be0-5c01ac4e2b29": {
                id: "d88079a6-7178-4a70-8be0-5c01ac4e2b29"
              },
              "9255a57d-997b-4cc6-946d-f909dd47e296": {
                id: "9255a57d-997b-4cc6-946d-f909dd47e296"
              },
              "f6492044-ea28-4ee3-8d8b-6b6aff87ae04": {
                id: "f6492044-ea28-4ee3-8d8b-6b6aff87ae04"
              }
            }
          }
        },
        meta: {
          page: 2
        }
      };

export const fetchCateringsFailAction = ({ page }) => ({
  type: FETCH_BUSINESS_CATERINGS_FAIL,
  meta: { page }
});

export const postCateringSuccessAction = () => ({
  type: POST_CATERING_SUCCESS,
  payload: {
    data: {
      caterings: {
        "142cc33e-5dde-4b0d-acbc-ed21de97c005": {
          id: "142cc33e-5dde-4b0d-acbc-ed21de97c005",
          type: "caterings",
          attributes: {
            userName: "original user name",
            offerSendAt: null
          }
        }
      }
    },
    rawData: {
      data: {
        id: "142cc33e-5dde-4b0d-acbc-ed21de97c005"
      }
    }
  }
});

export const patchCateringSuccessAction = () => ({
  type: PATCH_CATERING_SUCCESS,
  payload: {
    data: {
      caterings: {
        "142cc33e-5dde-4b0d-acbc-ed21de97c005": {
          id: "142cc33e-5dde-4b0d-acbc-ed21de97c005",
          type: "caterings",
          attributes: {
            userName: "edited user name"
          }
        }
      }
    },
    rawData: {
      data: {
        id: "142cc33e-5dde-4b0d-acbc-ed21de97c005"
      }
    }
  }
});

export const sendCateringOfferSuccessAction = ({ time }) => ({
  type: SEND_CATERING_OFFER_SUCCESS,
  meta: {
    id: "142cc33e-5dde-4b0d-acbc-ed21de97c005",
    time
  }
});

export const setEditCateringAction = catering => ({
  type: SET_EDIT_CATERING,
  payload: {
    editedCatering: catering
  }
});

export const deleteCateringRequestAction = id => ({
  type: DELETE_CATERING_REQUEST,
  meta: {
    id
  }
});

export const logoutAction = () => ({
  type: LOGOUT
});
