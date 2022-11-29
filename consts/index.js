const { languages, languagesPattern } = require("./languages");
/* eslint-disable prefer-destructuring */

const API_URL = process.env.PUBLIC_API_URL;
const APP_URL = process.env.APP_URL;
const FOODETECTIVE_URL = process.env.PUBLIC_FOODETECTIVE_URL;

const dev = process.env.NODE_ENV !== "production";

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

const PLANS_BUSINESS_EXAMPLE_LINK = process.env.PLANS_BUSINESS_EXAMPLE_LINK;

const SUBSCRIPTION_ENTREPRISE_URL =
  "https://share.hsforms.com/1UW67s4YOTTKvC2NIum5X0w3cpmu";

const SUBSCRIPTION_PERIOD = {
  MONTHLY: "monthly",
  YEARLY: "yearly"
};

const SUBSCRIPTION_PLANS = {
  BASIC: "basic",
  ESSENTIAL: "essential",
  ULTIMATE: "ultimate"
};

const SUBSCRIPTION_CURRENCY = {
  EUR: "eur",
  GBP: "gbp",
  CHF: "chf",
  USD: "usd"
};

const TYPEFORM_IDS = {
  COMMUNITY_MANAGEMENT: "xDcBPKaR",
  MARKETING: "JcFCFNIl",
  PHOTOGRAPHY: "O3li1o1M"
};

const WHOLESALERS_CATEGORY = {
  PREFERRED: "preferred"
};

const WHOLESALER = "wholesaler";
const AVAILABLE = "available";

const contentTypes = {
  JSON: "application/json",
  JSONAPI: "application/vnd.api+json",
  MULTIPART: "multipart/form-data"
};

const privacyPolicyLink = `${FOODETECTIVE_URL}/foodetective-for-business-privacy-policy`;
const termsAndConditionsLink = `${FOODETECTIVE_URL}/foodetective-for-business-terms-of-use`;
const mediaKitLink =
  "https://drive.google.com/drive/folders/1iZyNJbszSyRPG3ZWwNKVGws9UdSrdv-z";
const becomePartnerLink = `https://foodetective.typeform.com/to/tzqu8b`;

const apiGuideLink = `https://developer.foodetective.co/`;

const rollbarConfig = {
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: process.env.NODE_ENV || "development"
  }
};

const LINKEDIN_ADS_ID = process.env.LINKEDIN_ADS_ID;

const UBER_EATS_RESTAURANT_URL = "https://restaurant.uber.com/";

const PRODUCTION_URL = "business.foodetective.co";

const LP_STAGING_URL = "https://staging.foodtekk.com";
const LP_PROD_URL = "https://foodetective.co";

const FOODETECTIVE_MAIL = "support@foodetective.co";

const FOODETECTIVE_ADDRESS =
  "Rue de la Terrassière 23, 1207 Genève, Switzerland";

const INTEGRATIONS_VIDEO_URL = "https://youtu.be/XW2Hffcne60";

const GET_THE_APP_VIDEO_URL = "https://www.youtube.com/watch?v=dpPBfv1IteI";

const GET_THE_APP_IOS_LINK =
  "https://apps.apple.com/ch/app/foodetective-for-business/id1530951022?l=en";

const GET_THE_APP_ANDROID_LINK =
  "https://play.google.com/store/apps/details?id=com.sherlock.production";

const PARTNERS_URL =
  "https://foodetective.typeform.com/to/tzqu8b?typeform-source=business.foodetective.co";

const CAREERS_FOODETECTIVE_EMAIL = "hello@foodetective.co";

const USER_GUIDES_URL = {
  fr:
    "https://docs.google.com/document/d/18ytc8_ToYltMyFM-Yiax2lXMU7DgvvBvC5SeTtBTstc/edit",
  en:
    "https://docs.google.com/document/d/1DvgZpRWiBHzoHAwvhI9u1UFOl2ce8TZf2W7FHhsyKKY/edit"
};

const PARTOO_SDK_URL =
  process.env.PARTOO_SDK_URL ||
  "https://static.sandbox.partoo.co/javascript/build/partoo.js";

const LICENSING_TYPEFORM_LINK = "https://foodetective.typeform.com/to/xnVTlV0K";

const ONLINE_MEETING_LINK =
  "https://calendly.com/maxence-foodetective/meeting-with-maxence-foodetective";

const MANAGEMENT_ADV_VIDEO = "https://www.youtube.com/embed/RYwtvUhSSGo";

const INVEST_TYPEFORM_LINK = "https://foodetective.typeform.com/to/dFI4yOpP";

const HOW_IT_WORKS_VIDEO_URL = "https://www.youtube.com/embed/HDZjyO5btxc";

const GOOGLE_ADS_IDS = {
  MAIN: process.env.GOOGLE_ADS_ID,
  DEMO_BUTTON_EVENT: process.env.GOOGLE_ADS_DEMO_BUTTON_EVENT_ID,
  PAGE_VIEW_EVENT: process.env.GOOGLE_ADS_PAGE_VIEW_EVENT_ID
};

const NEWSLETTER_GOOGLE_SHEET_ID = process.env.NEWSLETTER_GOOGLE_SHEET_ID;
const GOOGLE_SHEET_SERVICE_ACCOUNT_EMAIL =
  process.env.GOOGLE_SHEET_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_SHEET_SERVICE_ACCOUNT_KEY =
  process.env.GOOGLE_SHEET_SERVICE_ACCOUNT_KEY;

const PUBLIC_ALGOLIA_CLIENT_KEY = !dev ? "bf853662d2e5fcefa6f63a5a59be6352" : "569fb18902ca15de527353225a6ba63a";
const ALGOLIA_APP_ID = !dev ? "ZIJ9XATQMM" : "USKQIQBYHF";

  const ALGOLIA_ENVIRONMENT = !dev ? "production" : "staging";

const ALGOLIA_ENVIRONMENT = process.env.ALGOLIA_ENVIRONMENT;

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
  LINKEDIN_ADS_ID,
  apiGuideLink,
  UBER_EATS_RESTAURANT_URL,
  FOODETECTIVE_MAIL,
  SUBSCRIPTION_CURRENCY,
  PLANS_BUSINESS_EXAMPLE_LINK,
  FOODETECTIVE_ADDRESS,
  DEFAULT_PLAN_NAME: SUBSCRIPTION_PLANS.ESSENTIAL,
  INTEGRATIONS_VIDEO_URL,
  GET_THE_APP_VIDEO_URL,
  GET_THE_APP_IOS_LINK,
  GET_THE_APP_ANDROID_LINK,
  PARTNERS_URL,
  CAREERS_FOODETECTIVE_EMAIL,
  USER_GUIDES_URL,
  PARTOO_SDK_URL,
  LICENSING_TYPEFORM_LINK,
  ONLINE_MEETING_LINK,
  MANAGEMENT_ADV_VIDEO,
  INVEST_TYPEFORM_LINK,
  HOW_IT_WORKS_VIDEO_URL,
  GOOGLE_ADS_IDS,
  NEWSLETTER_GOOGLE_SHEET_ID,
  GOOGLE_SHEET_SERVICE_ACCOUNT_EMAIL,
  GOOGLE_SHEET_SERVICE_ACCOUNT_KEY,
  WHOLESALER,
  AVAILABLE,
  PRODUCTION_URL,
  LP_STAGING_URL,
  LP_PROD_URL,
  PUBLIC_ALGOLIA_CLIENT_KEY,
  ALGOLIA_APP_ID,
  ALGOLIA_ENVIRONMENT
};
