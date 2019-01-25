/* eslint-disable import/prefer-default-export */
import cc from "currency-codes";

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

export const currencies = cc.codes().map(c => ({
  value: c,
  label: c
}));

export const getInitialValues = business => {
  if (business) {
    const {
      breakfastService,
      lunchService,
      dinnerService,
      brunchService,
      cafeService,
      snackService,
      currency,
      pricePerPerson,
      hasCatering,
      deliveryUrl,
      onlineBookingUrl,
      takeawayUrl,
      canPayWithCards,
      canPayWithCash,
      canPayWithMobile,
      secretCode
    } = business;

    return {
      breakfastService,
      lunchService,
      dinnerService,
      brunchService,
      cafeService,
      snackService,
      currency: currencies.find(c => c.value === currency),
      pricePerPerson,
      hasCatering,
      deliveryUrl,
      onlineBookingUrl,
      takeawayUrl,
      canPayWithCards,
      canPayWithCash,
      canPayWithMobile,
      secretCode
    };
  }
  return undefined;
};
