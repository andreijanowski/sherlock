export const ORKESTRO_NAME = "Orkestro";
export const UBER_EATS_NAME = "Uber Eats";

export const getInternalIntegrationStates = partner => ({
  isIntegrated: partner.get("partnerIntegrationActive"),
  isIntegrationPending: partner.get("partnerIntegrationRequested")
});

export const getServiceIntegrationMeta = partner => {
  const name = partner.get("name");
  const isOrkestroIntegration = name === ORKESTRO_NAME;
  const isIntegratedWithServices = isOrkestroIntegration;
  return {
    isOrkestroIntegration,
    isIntegratedWithServices
  };
};

export const getServiceIntegrationStates = (partner, isOrkestroConnected) => {
  const { isOrkestroIntegration } = getServiceIntegrationMeta(partner);
  return {
    isIntegrated: isOrkestroIntegration && isOrkestroConnected
  };
};

export const getIntegrationStates = (partner, isOrkestroConnected) => {
  const { isIntegratedWithServices } = getServiceIntegrationMeta(partner);
  return isIntegratedWithServices
    ? getServiceIntegrationStates(partner, isOrkestroConnected)
    : getInternalIntegrationStates(partner);
};

export const isServiceIntegrationConnected = (partner, isOrkestroConnected) =>
  getServiceIntegrationStates(partner, isOrkestroConnected).isIntegrated;

export const isInternalIntegrationConnectedOrPending = partner => {
  const { isIntegrated, isIntegrationPending } =
    getInternalIntegrationStates(partner);

  return isIntegrationPending || isIntegrated;
};

export const isIntegrationConnectedOrPending = (
  partner,
  isOrkestroConnected
) => {
  const { isIntegratedWithServices } = getServiceIntegrationMeta(partner);
  return isIntegratedWithServices
    ? isServiceIntegrationConnected(partner, isOrkestroConnected)
    : isInternalIntegrationConnectedOrPending(partner);
};

export const getIntegrationColoredStatus = (partner, isOrkestroConnected) => {
  const { isIntegrated, isIntegrationPending } = getIntegrationStates(
    partner,
    isOrkestroConnected
  );

  if (isIntegrated) {
    return {
      label: "app:manageIntegrations.integrated",
      color: "103, 205, 192"
    };
  }
  if (isIntegrationPending) {
    return { label: "app:manageIntegrations.pending", color: "243, 119, 15" };
  }
  return null;
};

export const getIntegrationLinkProps = partner => ({
  as: "a",
  href: partner.get("websiteUrl"),
  target: "_blank",
  rel: "noopener noreferrer"
});

export const isPartnerRequiresConnection = partner =>
  partner.get("displayCredentialsPrompt");
