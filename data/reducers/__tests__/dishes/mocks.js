/* eslint-disable no-param-reassign */
import {
  POST_DISH_SUCCESS,
  PATCH_DISH_SUCCESS,
  DELETE_DISH_REQUEST
} from "types/dishes";
import {
  FETCH_BUSINESS_DISHES_REQUEST,
  FETCH_BUSINESS_DISHES_SUCCESS,
  FETCH_BUSINESS_DISHES_FAIL
} from "types/businesses";
import { POST_PICTURE_SUCCESS, DELETE_PICTURE_REQUEST } from "types/pictures";
import { LOGOUT } from "types/auth";

export const fetchDishesRequestAction = () => ({
  type: FETCH_BUSINESS_DISHES_REQUEST
});

export const fetchDishesSuccessAction = ({ page }) =>
  page === 1
    ? {
        type: FETCH_BUSINESS_DISHES_SUCCESS,
        payload: {
          data: {
            dishes: {
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
        type: FETCH_BUSINESS_DISHES_SUCCESS,
        payload: {
          data: {
            dishes: {
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

export const fetchDishesFailAction = ({ page }) => ({
  type: FETCH_BUSINESS_DISHES_FAIL,
  meta: { page }
});

export const postDishSuccessAction = () => ({
  type: POST_DISH_SUCCESS,
  payload: {
    data: {
      dishes: {
        "142cc33e-5dde-4b0d-acbc-ed21de97c005": {
          id: "142cc33e-5dde-4b0d-acbc-ed21de97c005",
          type: "dishes",
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

export const patchDishSuccessAction = () => ({
  type: PATCH_DISH_SUCCESS,
  payload: {
    data: {
      dishes: {
        "142cc33e-5dde-4b0d-acbc-ed21de97c005": {
          id: "142cc33e-5dde-4b0d-acbc-ed21de97c005",
          type: "dishes",
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

export const deleteDishRequestAction = id => ({
  type: DELETE_DISH_REQUEST,
  meta: {
    id
  }
});

export const logoutAction = () => ({
  type: LOGOUT
});

export const postPictureSuccessAction = id => ({
  type: POST_PICTURE_SUCCESS,
  payload: {
    data: {
      pictures: {
        "77953c74-6109-4105-87b5-d963c25f8d15": {
          id: "77953c74-6109-4105-87b5-d963c25f8d15"
        }
      }
    },
    rawData: {
      data: {
        id: "77953c74-6109-4105-87b5-d963c25f8d15",
        attributes: {
          parentResource: "dish"
        }
      }
    }
  },
  meta: {
    id
  }
});

export const deletePictureRequestAction = ({ id, resourceId }) => ({
  type: DELETE_PICTURE_REQUEST,
  meta: {
    id,
    resourceId,
    parentResource: "dish"
  }
});
