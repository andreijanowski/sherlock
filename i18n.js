const NextI18Next = require("next-i18next").default;

const defaultLanguage = "en";

const NextI18NextInstance = new NextI18Next({
  fallbackLng: defaultLanguage,
  defaultLanguage,
  otherLanguages: ["it", "de", "es", "fr"]
});

module.exports = NextI18NextInstance;
