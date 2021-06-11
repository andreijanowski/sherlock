export const getInitialValues = business => {
  if (business) {
    return {
      deliveryUrl: business.get("deliveryUrl"),
      onlineBookingUrl: business.get("onlineBookingUrl"),
      takeawayUrl: business.get("takeawayUrl")
    };
  }
  return undefined;
};
