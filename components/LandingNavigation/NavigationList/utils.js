import { LICENSING_TYPEFORM_LINK } from "consts";
import ProductLinkDropdown from "./ProductLinkDropdown";

export const getMenuItems = t => [
  {
    label: t("landing:product"),
    component: ProductLinkDropdown
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
    label: t("landing:solutions"),
    href: "/developers"
  },
  {
    label: t("landing:resources"),
    href: "/developers"
  }
];
