export const PROJECT_NAME = {
  CLIENT: "lefood",
  BUSINESS: "sherlock"
};

export const getOptions = t => [
  { value: PROJECT_NAME.CLIENT, label: t("landing:appSwitcher.lefood") },
  { value: PROJECT_NAME.BUSINESS, label: t("landing:appSwitcher.sherlock") }
];
