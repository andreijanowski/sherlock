export const ORKESTRO_NAME = "Orkestro";
export const UBER_EATS_NAME = "Uber Eats";

export const getInternalIntegrationStates = partner => ({
  isIntegrated: partner.get("partnerIntegrationActive"),
  isIntegrationPending: partner.get("partnerIntegrationRequested")
});

export const getServiceIntegrationMeta = partner => {
  const name = partner.get("name");
  const isOrkestroIntegration = name === ORKESTRO_NAME;
  const isUberIntegration = name === UBER_EATS_NAME;
  const isIntegratedWithServices = isOrkestroIntegration || isUberIntegration;
  return {
    isOrkestroIntegration,
    isUberIntegration,
    isIntegratedWithServices
  };
};

export const getServiceIntegrationStates = (
  partner,
  isOrkestroConnected,
  isUberConnected
) => {
  const {
    isOrkestroIntegration,
    isUberIntegration
  } = getServiceIntegrationMeta(partner);
  return {
    isIntegrated:
      (isOrkestroIntegration && isOrkestroConnected) ||
      (isUberIntegration && isUberConnected)
  };
};

export const getIntegrationStates = (
  partner,
  isOrkestroConnected,
  isUberConnected
) => {
  const { isIntegratedWithServices } = getServiceIntegrationMeta(partner);
  return isIntegratedWithServices
    ? getServiceIntegrationStates(partner, isOrkestroConnected, isUberConnected)
    : getInternalIntegrationStates(partner);
};

export const isServiceIntegrationConnected = (
  partner,
  isOrkestroConnected,
  isUberConnected
) =>
  getServiceIntegrationStates(partner, isOrkestroConnected, isUberConnected)
    .isIntegrated;

export const isInternalIntegrationConnectedOrPending = partner => {
  const { isIntegrated, isIntegrationPending } = getInternalIntegrationStates(
    partner
  );

  return isIntegrationPending || isIntegrated;
};

export const isIntegrationConnectedOrPending = (
  partner,
  isOrkestroConnected,
  isUberConnected
) => {
  const { isIntegratedWithServices } = getServiceIntegrationMeta(partner);
  return isIntegratedWithServices
    ? isServiceIntegrationConnected(
        partner,
        isOrkestroConnected,
        isUberConnected
      )
    : isInternalIntegrationConnectedOrPending(partner);
};

export const getIntegrationColoredStatus = (
  partner,
  isOrkestroConnected,
  isUberConnected
) => {
  const { isIntegrated, isIntegrationPending } = getIntegrationStates(
    partner,
    isOrkestroConnected,
    isUberConnected
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
