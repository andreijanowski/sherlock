const axios = require("axios");
const humps = require("humps");
const qs = require("qs");

const axiosClient = axios.create({
  baseURL: `${process.env.PUBLIC_API_URL}`,
  method: "GET",
  headers: {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
    Cookie: `staging_auth=${process.env.STAGING_AUTH}; domain=${
      process.env.PUBLIC_API_URL
    }; expires=30-Dec-2039 3:59:59 #GMT`
  },
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

module.exports = axiosClient;
