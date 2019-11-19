const NextI18Next = require("next-i18next").default;

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: "en",
  otherLanguages: ["it", "de", "es", "fr"]
});

module.exports = NextI18NextInstance;
