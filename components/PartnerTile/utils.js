export const getIntegrationButtonLabel = (isIntegrated, isPending, t) => {
  if (isIntegrated) return t("app:manageIntegrations.integrated");
  if (isPending && !isIntegrated) return t("app:manageIntegrations.pending");

  return t("app:manageIntegrations.requestIntegration");
};

export const getIntegrationButtonColor = (isIntegrated, isPending) => {
  if (isIntegrated) return "green";
  if (isPending) return "orange";
  return "navyBlue";
};
