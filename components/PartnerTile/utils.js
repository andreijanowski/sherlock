export const getIntegrationButtonLabel = (
  isIntegrationNotRequested,
  isPending,
  isIntegrated,
  t
) => {
  if (isPending) return t("app:manageIntegrations.pending");
  if (isIntegrationNotRequested)
    return t("app:manageIntegrations.requestIntegration");
  if (isIntegrated) return t("app:manageIntegrations.integrated");

  return t("app:manageIntegrations.requestIntegration");
};

export const getIsIntegrationPending = (partnerRelationships, currentUserId) =>
  partnerRelationships.some(
    partnerRelationship => partnerRelationship.id === currentUserId
  );
