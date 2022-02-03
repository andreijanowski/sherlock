export const checkIsBusinessStripeLoading = businessAttributes =>
  !businessAttributes || businessAttributes.get("stripeUserId") === undefined;

export const BUSINESS_SETTINGS_KEYS = {
  ORDERS_NOTIFICATIONS: "orderBusinessWebNotificationsEnabled",
  RESERVATIONS_NOTIFICATIONS: "reservationBusinessWebNotificationsEnabled"
};
