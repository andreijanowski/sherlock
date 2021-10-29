import currencies from "utils/currencies";

export const timeOfTheDay = [
  "breakfastService",
  "lunchService",
  "dinnerService",
  "brunchService",
  "cafeService",
  "snackService"
];

export const paymentMethods = [
  "canPayWithCards",
  "canPayWithCash",
  "canPayWithMobile"
];

export const getInitialValues = business => {
  if (business) {
    return {
      breakfastService: business.get("breakfastService"),
      lunchService: business.get("lunchService"),
      dinnerService: business.get("dinnerService"),
      brunchService: business.get("brunchService"),
      cafeService: business.get("cafeService"),
      snackService: business.get("snackService"),
      currency:
        currencies.find(c => c.value === business.get("currency")) || {},
      pricePerPerson: business.get("pricePerPerson"),
      hasCatering: business.get("hasCatering"),
      hasReservations: business.get("hasReservations"),
      hasPrivateEvents: business.get("hasPrivateEvents"),
      availableInLefood: business.get("availableInLefood"),
      canPayWithCards: business.get("canPayWithCards"),
      canPayWithCash: business.get("canPayWithCash"),
      canPayWithMobile: business.get("canPayWithMobile"),
      secretCode: business.get("secretCode"),
      deliveryChargeRef: business.get("deliveryChargeRef"),
      stripePaymentRef: business.get("stripePaymentRef"),
      deliveryServiceTypeRef: business.get("deliveryServiceTypeRef"),
      takeawayServiceTypeRef: business.get("takeawayServiceTypeRef")
    };
  }
  return undefined;
};
