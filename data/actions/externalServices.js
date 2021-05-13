import {
  FETCH_EXTERNAL_SERVICES_REQUEST,
  CONNECT_EXTERNAL_SERVICES_REQUEST,
  PATCH_EXTERNAL_SERVICE_LINK_REQUEST,
  DELETE_EXTERNAL_SERVICE_LINK_REQUEST
} from "types/externalServices";
import { getRelationships } from "./utils";

export const fetchExternalServices = () => ({
  type: FETCH_EXTERNAL_SERVICES_REQUEST,
  payload: {
    method: "GET",
    endpoint: `/api/v1/external_services`,
    params: {
      per_page: 200
    }
  },
  meta: { thunk: true }
});

export const connectExternalService = ({ url, businessId, serviceId }) => ({
  type: CONNECT_EXTERNAL_SERVICES_REQUEST,
  payload: {
    method: "POST",
    endpoint: `/api/v1/external_service_links`,
    data: {
      data: {
        type: "external_service_links",
        attributes: { service_url: url },
        relationships: {
          ...getRelationships("business", businessId),
          ...getRelationships("external_service", serviceId)
        }
      }
    }
  },
  meta: { thunk: true }
});

export const patchServiceLink = (id, values) => ({
  type: PATCH_EXTERNAL_SERVICE_LINK_REQUEST,
  payload: {
    method: "PATCH",
    endpoint: `/api/v1/external_service_links/${id}`,
    data: {
      data: {
        id,
        type: "external_service_links",
        attributes: values
      }
    }
  },
  meta: { thunk: true }
});

export const deleteServiceLink = id => ({
  type: DELETE_EXTERNAL_SERVICE_LINK_REQUEST,
  payload: {
    method: "DELETE",
    endpoint: `/api/v1/external_service_links/${id}`
  },
  meta: { thunk: true, id }
});
