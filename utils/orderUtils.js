const HUBRISE_ORIGIN = "hubrise";

const DEFAULT_LOGO_URL = "/static/img/logoFoodetectiveSquared.png";
const UBER_EATS_LOGO = "/static/img/uberEatsLogo.svg";
const DELIVEROO_LOGO = "/static/img/deliverooLogo.svg";
const FOODPANDA_LOGO = "/static/img/foodpandaLogo.svg";
const JUST_EAT_LOGO = "/static/img/justEatTakeawayLogo.svg";

const LOGOS = {
  "uber-eats": UBER_EATS_LOGO,
  "Uber Eats Bridge": UBER_EATS_LOGO,
  "Deliveroo Bridge": DELIVEROO_LOGO,
  "foodpanda Bridge": FOODPANDA_LOGO,
  "Just Eat Flyt Bridge": JUST_EAT_LOGO,
  "Just Eat Takeaway Bridge": JUST_EAT_LOGO
};

export const getOrderSource = order => {
  if (!order) {
    return null;
  }
  const origin = order.getIn(["attributes", "origin"]);
  const hubriseSource = order.getIn(["attributes", "hubriseSource"]);

  if (origin === HUBRISE_ORIGIN) {
    return hubriseSource;
  }

  return origin;
};

export const getOrderSourceLogo = order => {
  const source = getOrderSource(order);
  if (!source) {
    return DEFAULT_LOGO_URL;
  }

  return LOGOS[source] || DEFAULT_LOGO_URL;
};

export const getRejectOrderPayload = ({
  rejectReason,
  unavailableElements,
  orderDetails,
  otherRejectionReason
}) => {
  const unavailableElementsIds = unavailableElements
    .map((unavailable, index) =>
      unavailable
        ? orderDetails.getIn(["relationships", "elements", "data", index, "id"])
        : null
    )
    .filter(e => !!e)
    .toString();

  return {
    rejectReason,
    unavailableElements:
      rejectReason === "dishes_unavailable"
        ? unavailableElementsIds || undefined
        : undefined,
    otherRejectionReason:
      rejectReason === "other" ? otherRejectionReason : undefined
  };
};
