const { languages, languagesPattern } = require("./languages");
/* eslint-disable prefer-destructuring */

const API_URL = process.env.PUBLIC_API_URL;
const APP_URL = process.env.APP_URL;
const FOODETECTIVE_URL = process.env.PUBLIC_FOODETECTIVE_URL;

const NETGURU_DEV_PASSWORD = process.env.NETGURU_DEV_PASSWORD;
const OAUTH_CALLBACK_URL = process.env.OAUTH_CALLBACK_URL;
const OAUTH_PUBLIC_CLIENT_ID = process.env.OAUTH_PUBLIC_CLIENT_ID;

const PUSHER_APP_KEY = process.env.PUBLIC_PUSHER_APP_KEY;
const PUSHER_APP_CLUSTER = process.env.PUBLIC_PUSHER_APP_CLUSTER;

const STRIPE_CLIENT_ID = process.env.STRIPE_CLIENT_ID;
const STRIPE_API_KEY = process.env.PUBLIC_STRIPE_API_KEY;

const FACEBOOK_PIXEL_ID = process.env.PUBLIC_FACEBOOK_PIXEL_ID;

const GOOGLE_ANALYTICS_ID = process.env.PUBLIC_GOOGLE_ANALYTICS_ID;
const GOOGLE_MAPS_API_KEY = process.env.PUBLIC_GOOGLE_MAPS_API_KEY;
const GOOGLE_TAG_MANAGER_ID = process.env.PUBLIC_GOOGLE_TAG_MANAGER_ID;

const SUBSCRIPTION_ENTREPRISE_URL =
  "https://share.hsforms.com/1UW67s4YOTTKvC2NIum5X0w3cpmu";

const SUBSCRIPTION_PERIOD = {
  MONTH: "month",
  YEAR: "year"
};
const BASIC_PLAN_NAME = "basic";

const SUBSCRIPTION_PLANS = {
  ENTREPRISE: "Entreprise",
  ESSENTIAL: "Essential",
  FREEMIUM: "Freemium",
  PREMIUM: "Premium"
};

const SUBSCRIPTION_PLANS_SLUGS = {
  [SUBSCRIPTION_PERIOD.MONTH]: {
    [SUBSCRIPTION_PLANS.ESSENTIAL.toLocaleLowerCase()]: "sherlock-essential-monthly-eur",
    [SUBSCRIPTION_PLANS.PREMIUM.toLocaleLowerCase()]: "sherlock-premium-monthly-new-eur"
  },
  [SUBSCRIPTION_PERIOD.YEAR]: {
    [SUBSCRIPTION_PLANS.ESSENTIAL.toLocaleLowerCase()]: "sherlock-essential-yearly-eur",
    [SUBSCRIPTION_PLANS.PREMIUM.toLocaleLowerCase()]: "sherlock-premium-yearly-new-eur"
  }
};

const TYPEFORM_IDS = {
  COMMUNITY_MANAGEMENT: process.env.COMMUNITY_MANAGEMENT_TYPEFORM_ID,
  MARKETING: process.env.MARKETING_TYPEFORM_ID,
  PHOTOGRAPHY: process.env.PHOTOGRAPHY_TYPEFORM_ID
};

const WHOLESALERS_CATEGORY = {
  PREFERRED: "preferred"
};

const contentTypes = {
  JSON: "application/json",
  JSONAPI: "application/vnd.api+json",
  MULTIPART: "multipart/form-data"
};

const privacyPolicyLink = `${FOODETECTIVE_URL}/foodetective-for-business-privacy-policy`;
const termsAndConditionsLink = `${FOODETECTIVE_URL}/foodetective-for-business-terms-of-use`;
const mediaKitLink =
  "https://drive.google.com/drive/folders/1AlH-mWME83bzmg-job1N-ZqQjwxb0Ga0";
const becomePartnerLink = `https://foodetective.typeform.com/to/tzqu8b`;

const rollbarConfig = {
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: process.env.NODE_ENV || "development"
  }
};

module.exports = {
  contentTypes,
  languages,
  languagesPattern,
  privacyPolicyLink,
  termsAndConditionsLink,
  mediaKitLink,
  becomePartnerLink,
  API_URL,
  APP_URL,
  FOODETECTIVE_URL,
  NETGURU_DEV_PASSWORD,
  OAUTH_CALLBACK_URL,
  OAUTH_PUBLIC_CLIENT_ID,
  PUSHER_APP_KEY,
  PUSHER_APP_CLUSTER,
  STRIPE_CLIENT_ID,
  STRIPE_API_KEY,
  FACEBOOK_PIXEL_ID,
  GOOGLE_ANALYTICS_ID,
  GOOGLE_MAPS_API_KEY,
  GOOGLE_TAG_MANAGER_ID,
  SUBSCRIPTION_ENTREPRISE_URL,
  SUBSCRIPTION_PERIOD,
  SUBSCRIPTION_PLANS,
  TYPEFORM_IDS,
  WHOLESALERS_CATEGORY,
  rollbarConfig,
  SUBSCRIPTION_PLANS_SLUGS,
  BASIC_PLAN_NAME
};
