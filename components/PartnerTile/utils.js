export const getIntegrationButtonLabel = (isIntegrated, isPending, t) => {
  if (isIntegrated) return t("app:manageIntegrations.integrated");
  if (isPending && !isIntegrated) return t("app:manageIntegrations.pending");

  return t("app:manageIntegrations.requestIntegration");
};
