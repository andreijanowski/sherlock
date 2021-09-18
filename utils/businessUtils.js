export const checkIsBusinessStripeLoading = businessAttributes =>
  !businessAttributes || businessAttributes.get("stripeUserId") === undefined;
