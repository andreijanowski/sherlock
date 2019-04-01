export const selectCardIcon = brand => {
  switch (brand) {
    case "American Express": {
      return ["fab", "cc-amex"];
    }
    case "Diners Club": {
      return ["fab", "cc-diners-club"];
    }
    case "Discover": {
      return ["fab", "cc-discover"];
    }
    case "JCB": {
      return ["fab", "cc-jcb"];
    }
    case "MasterCard": {
      return ["fab", "cc-mastercard"];
    }
    case "Visa": {
      return ["fab", "cc-visa"];
    }
    default: {
      return ["fa", "credit-card"];
    }
  }
};
