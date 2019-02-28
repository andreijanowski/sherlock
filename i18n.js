const i18n = require("i18next");
const XHR = require("i18next-xhr-backend");
const LanguageDetector = require("i18next-browser-languagedetector");

const options = {
  fallbackLng: "en",
  load: "languageOnly",

  ns: ["common"],
  defaultNS: "common",

  debug: false,
  saveMissing: true,

  interpolation: {
    escapeValue: false,
    formatSeparator: ",",
    format: (value, format) => {
      if (format === "uppercase") return value.toUpperCase();
      return value;
    }
  },
  detection: {
    order: [
      "path",
      "cookie",
      "navigator",
      "querystring",
      "localStorage",
      "htmlTag",
      "subdomain"
    ],

    lookupQuerystring: "lng",
    lookupCookie: "i18next",
    lookupLocalStorage: "i18nextLng",
    lookupFromPathIndex: 0,
    lookupFromSubdomainIndex: 0,

    caches: ["cookie"],
    excludeCacheFor: ["cimode"]
  }
};

if (process.browser) {
  i18n.use(XHR).use(LanguageDetector);
}

if (!i18n.isInitialized) i18n.init(options);

i18n.getInitialProps = (req, namespaces) => {
  // eslint-disable-next-line no-param-reassign
  if (!namespaces) namespaces = i18n.options.defaultNS;
  // eslint-disable-next-line no-param-reassign
  if (typeof namespaces === "string") namespaces = [namespaces];

  req.i18n.toJSON = () => null;

  const initialI18nStore = {};
  req.i18n.languages.forEach(l => {
    initialI18nStore[l] = {};
    namespaces.forEach(ns => {
      initialI18nStore[l][ns] =
        (req.i18n.services.resourceStore.data[l] || {})[ns] || {};
    });
  });

  return {
    i18n: req.i18n,
    initialI18nStore,
    initialLanguage: req.i18n.language
  };
};

module.exports = i18n;
