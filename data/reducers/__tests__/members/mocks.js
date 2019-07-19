/* eslint-disable no-param-reassign */
import {
  FETCH_BUSINESS_MEMBERS_REQUEST,
  FETCH_BUSINESS_MEMBERS_SUCCESS,
  FETCH_BUSINESS_MEMBERS_FAIL
} from "types/businesses";

export const fetchMembersRequestAction = () => ({
  type: FETCH_BUSINESS_MEMBERS_REQUEST
});

export const fetchMembersSuccessAction = ({ page }) =>
  page === 1
    ? {
        type: FETCH_BUSINESS_MEMBERS_SUCCESS,
        payload: {
          data: {
            members: {
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
        type: FETCH_BUSINESS_MEMBERS_SUCCESS,
        payload: {
          data: {
            members: {
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

export const fetchMembersFailAction = ({ page }) => ({
  type: FETCH_BUSINESS_MEMBERS_FAIL,
  meta: { page }
});
