import {
  PARTNERS_URL,
  CAREERS_FOODETECTIVE_EMAIL,
  LICENSING_TYPEFORM_LINK
} from "consts";
import ProductLinkDropdown from "./ProductLinkDropdown";

export const getMenuItems = t => [
  {
    label: t("landing:howItWorks"),
    href: "/how-it-works"
  },
  {
    label: t("landing:product"),
    component: ProductLinkDropdown
  },
  {
    label: t("landing:customers"),
    href: "/customers"
  },
  {
    label: t("landing:developersAndApi"),
    href: "/developers"
  },
  {
    label: t("landing:pricing"),
    items: [
      {
        label: t("landing:subscriptionPlans"),
        href: "/pricing/subscriptions"
      },
      {
        label: t("landing:licensing"),
        href: LICENSING_TYPEFORM_LINK
      }
    ]
  },
  {
    label: t("landing:company"),
    items: [
      {
        label: t("landing:aboutUs"),
        href: "/company/about-us",
        isDisabled: true
      },
      {
        label: t("landing:newsroom"),
        href: "/newsroom"
      },
      {
        label: t("landing:careers"),
        href: `mailto:${CAREERS_FOODETECTIVE_EMAIL}?subject=${t(
          "careersSubject"
        )}`
      },
      {
        label: t("landing:partners"),
        href: PARTNERS_URL
      }
    ]
  }
];
