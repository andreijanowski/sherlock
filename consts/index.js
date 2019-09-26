const { languages, languagesPattern } = require("./languages");
/* eslint-disable prefer-destructuring */
const API_URL = "https://550.thefooddetective.integration.devguru.co/"; // process.env.PUBLIC_API_URL;
const GOOGLE_MAPS_API_KEY = process.env.PUBLIC_GOOGLE_MAPS_API_KEY;
const NETGURU_DEV_PASSWORD = process.env.NETGURU_DEV_PASSWORD;
const PUBLIC_FACEBOOK_APP_FIELDS = process.env.PUBLIC_FACEBOOK_APP_FIELDS;
const PUBLIC_FACEBOOK_APP_ID = process.env.PUBLIC_FACEBOOK_APP_ID;
const PUSHER_APP_KEY = process.env.PUBLIC_PUSHER_APP_KEY;
const PUSHER_APP_CLUSTER = process.env.PUBLIC_PUSHER_APP_CLUSTER;
const STRIPE_CLIENT_ID = process.env.STRIPE_CLIENT_ID;
const STRIPE_API_KEY = process.env.PUBLIC_STRIPE_API_KEY;
const GOOGLE_TAG_MANAGER_ID = process.env.PUBLIC_GOOGLE_TAG_MANAGER_ID;
const FACEBOOK_PIXEL_ID = process.env.PUBLIC_FACEBOOK_PIXEL_ID;
const GOOGLE_ANALYTICS_ID = process.env.PUBLIC_GOOGLE_ANALYTICS_ID;
const FOODETECTIVE_URL = process.env.PUBLIC_FOODETECTIVE_URL;

const contentTypes = {
  JSON: "application/json",
  JSONAPI: "application/vnd.api+json",
  MULTIPART: "multipart/form-data"
};
const privacyPolicyLink = `${FOODETECTIVE_URL}/sherlock-privacy-policy`;
const termsAndConditionsLink = `${FOODETECTIVE_URL}/sherlock-terms-of-use`;
const formValidation = { MINIMUM_PASSWORD_LENGTH: 8 };

module.exports = {
  contentTypes,
  languages,
  languagesPattern,
  privacyPolicyLink,
  termsAndConditionsLink,
  API_URL,
  GOOGLE_MAPS_API_KEY,
  NETGURU_DEV_PASSWORD,
  formValidation,
  PUBLIC_FACEBOOK_APP_FIELDS,
  PUBLIC_FACEBOOK_APP_ID,
  PUSHER_APP_KEY,
  PUSHER_APP_CLUSTER,
  STRIPE_CLIENT_ID,
  STRIPE_API_KEY,
  GOOGLE_TAG_MANAGER_ID,
  FACEBOOK_PIXEL_ID,
  GOOGLE_ANALYTICS_ID,
  FOODETECTIVE_URL
};
