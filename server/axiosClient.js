const axios = require("axios");
const humps = require("humps");

const axiosOauthClient = axios.create({
  baseURL: `${process.env.PUBLIC_API_URL}`,
  method: "GET",
  headers: {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
    Cookie: `staging_auth=netguru; domain=${
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
  ]
});

module.exports = axiosOauthClient;
