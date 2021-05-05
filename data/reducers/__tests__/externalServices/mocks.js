import {
  FETCH_EXTERNAL_SERVICES_REQUEST,
  FETCH_EXTERNAL_SERVICES_FAIL,
  FETCH_EXTERNAL_SERVICES_SUCCESS,
  PATCH_EXTERNAL_SERVICE_LINK_SUCCESS,
  DELETE_EXTERNAL_SERVICE_LINK_SUCCESS,
  CONNECT_EXTERNAL_SERVICES_SUCCESS,
} from "types/externalServices";

import {
  FETCH_BUSINESS_SERVICE_LINKS_REQUEST,
  FETCH_BUSINESS_SERVICE_LINKS_FAIL,
  FETCH_BUSINESS_SERVICE_LINKS_SUCCESS,
} from "types/businesses";

export const fetchExternalServicesRequestAction = () => ({
  type: FETCH_EXTERNAL_SERVICES_REQUEST,
});
export const fetchExternalServicesFailAction = () => ({
  type: FETCH_EXTERNAL_SERVICES_FAIL,
});
export const fetchExternalServicesSuccessAction = () => ({
  type: FETCH_EXTERNAL_SERVICES_SUCCESS,
  payload: {
    data: {
      externalServices: {
        "45773cb9-44ce-4521-8abf-932da26f22ac": {
          id: "45773cb9-44ce-4521-8abf-932da26f22ac",
        },
        "794fe06d-22db-499c-a459-b2245c84ee30": {
          id: "794fe06d-22db-499c-a459-b2245c84ee30",
        },
      },
    },
    rawData: {
      data: [
        {
          id: "45773cb9-44ce-4521-8abf-932da26f22ac",
        },
        {
          id: "794fe06d-22db-499c-a459-b2245c84ee30",
        },
      ],
    },
  },
});

export const fetchBusinessLinkRequestAction = () => ({
  type: FETCH_BUSINESS_SERVICE_LINKS_REQUEST,
});
export const fetchBusinessLinkFailAction = () => ({
  type: FETCH_BUSINESS_SERVICE_LINKS_FAIL,
});
export const fetchBusinessLinkSuccessAction = () => ({
  type: FETCH_BUSINESS_SERVICE_LINKS_SUCCESS,
  payload: {
    data: {
      externalServiceLinks: {
        "38773cb9-44ce-4521-8abf-932da26f22ac": {
          id: "38773cb9-44ce-4521-8abf-932da26f22ac",
        },
        "7b4fe06d-22db-499c-a459-b2245c84ee30": {
          id: "7b4fe06d-22db-499c-a459-b2245c84ee30",
        },
      },
    },
    rawData: {
      data: [
        {
          id: "38773cb9-44ce-4521-8abf-932da26f22ac",
        },
        {
          id: "7b4fe06d-22db-499c-a459-b2245c84ee30",
        },
      ],
    },
  },
});

const getServiceLinkSuccessPayload = ({ id, data }) => ({
  data: {
    externalServiceLinks: {
      [id]: {
        id,
        ...data,
      },
    },
  },
  rawData: {
    data: [
      {
        id,
        data,
      },
    ],
  },
});

export const connectExternalServiceLinkSuccessAction = (data) => ({
  type: CONNECT_EXTERNAL_SERVICES_SUCCESS,
  payload: getServiceLinkSuccessPayload(data),
});

export const patchExternalServiceLinkSuccessAction = (data) => ({
  type: PATCH_EXTERNAL_SERVICE_LINK_SUCCESS,
  payload: getServiceLinkSuccessPayload(data),
});

export const deleteExternalServiceLinkSuccessAction = (id) => ({
  type: DELETE_EXTERNAL_SERVICE_LINK_SUCCESS,
  meta: { id },
});
