const { languages, languagesPattern } = require("./languages");
/* eslint-disable prefer-destructuring */
const API_URL = process.env.PUBLIC_API_URL;
const NETGURU_DEV_PASSWORD = process.env.NETGURU_DEV_PASSWORD;

const contentTypes = {
  JSON: "application/json",
  JSONAPI: "application/vnd.api+json",
  MULTIPART: "multipart/form-data"
};

module.exports = {
  contentTypes,
  languages,
  languagesPattern,
  API_URL,
  NETGURU_DEV_PASSWORD
};
