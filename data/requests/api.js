import axios from "axios";
import humps from "humps";
import { API_URL, NETGURU_DEV_PASSWORD } from "consts";
import qs from "qs";

const headers = {
  Accept: "application/vnd.api+json",
  "Content-Type": "application/vnd.api+json"
};

const instance = axios.create({
  baseURL: API_URL,
  method: "GET",
  headers,
  transformResponse: [
    ...axios.defaults.transformResponse,
    data => humps.camelizeKeys(data)
  ],
  transformRequest: [
    data => humps.decamelizeKeys(data),
    ...axios.defaults.transformRequest
  ],
  paramsSerializer: params => qs.stringify(params, { arrayFormat: "brackets" })
});

const request = async (config, isServer) => {
  let authHeader = {
    NETGURU: NETGURU_DEV_PASSWORD
  };

  if (isServer) {
    authHeader = {
      Cookie: `staging_auth=netguru; domain=${API_URL}; expires=30-Dec-2039 3:59:59 #GMT`
    };
  }

  return instance.request({
    ...config,
    headers: { ...config.headers, ...authHeader }
  });
};
export default request;
