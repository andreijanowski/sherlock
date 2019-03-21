const { languages, languagesPattern } = require("./languages");
/* eslint-disable prefer-destructuring */
const API_URL = process.env.PUBLIC_API_URL;
const GOOGLE_MAPS_API_KEY = process.env.PUBLIC_GOOGLE_MAPS_API_KEY;
const NETGURU_DEV_PASSWORD = process.env.NETGURU_DEV_PASSWORD;
const PUBLIC_FACEBOOK_APP_FIELDS = process.env.PUBLIC_FACEBOOK_APP_FIELDS;
const PUBLIC_FACEBOOK_APP_ID = process.env.PUBLIC_FACEBOOK_APP_ID;
const PUSHER_APP_KEY = process.env.PUBLIC_PUSHER_APP_KEY;
const PUSHER_APP_CLUSTER = process.env.PUBLIC_PUSHER_APP_CLUSTER;

const contentTypes = {
  JSON: "application/json",
  JSONAPI: "application/vnd.api+json",
  MULTIPART: "multipart/form-data"
};

const formValidation = { MINIMUM_PASSWORD_LENGTH: 8 };

module.exports = {
  contentTypes,
  languages,
  languagesPattern,
  API_URL,
  GOOGLE_MAPS_API_KEY,
  NETGURU_DEV_PASSWORD,
  formValidation,
  PUBLIC_FACEBOOK_APP_FIELDS,
  PUBLIC_FACEBOOK_APP_ID,
  PUSHER_APP_KEY,
  PUSHER_APP_CLUSTER
};
