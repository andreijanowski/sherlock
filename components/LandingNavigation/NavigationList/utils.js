import {
  PARTNERS_URL,
  CAREERS_FOODETECTIVE_EMAIL,
  LICENSING_TYPEFORM_LINK
} from "consts";
import ProductLinkDropdown from "./ProductLinkDropdown";

export const getMobileMenuItems = t => [
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
    sections: [
      {
        id: 1,
        items: [
          {
            label: t("landing:subscriptionPlans"),
            href: "/pricing/subscriptions",
            icon: "/static/icons/crown.svg"
          },
          {
            label: t("landing:licensing"),
            href: LICENSING_TYPEFORM_LINK,
            icon: "/static/icons/exclude.svg"
          }
        ]
      }
    ]
  },
  {
    label: t("landing:solutions"),
    sections: [
      {
        id: 0,
        title: "Restaurants",
        items: [
          {
            label: t("landing:landings.customers.independent.title"),
            href: "/customers#independent",
            icon: "/static/icons/home.svg"
          },
          {
            label: t("landing:landings.customers.chains.title"),
            href: "/customers#chains",
            icon: "/static/icons/links.svg"
          },
          {
            label: t("landing:landings.customers.kitchens.title"),
            href: "/customers#kitchens",
            icon: "/static/icons/union.svg"
          }
        ]
      },
      {
        id: 1,
        title: "Other establishments",
        items: [
          {
            label: t("landing:landings.customers.kiosks.title"),
            href: "/customers#kiosks",
            icon: "/static/icons/home.svg"
          },
          {
            label: t("landing:landings.customers.wholesalers.title"),
            href: "/customers#wholesalers",
            icon: "/static/icons/union.svg"
          }
        ]
      }
    ]
  },
  {
    label: t("landing:resources"),
    sections: [
      {
        id: 0,
        title: "Learn about us",
        items: [
          {
            label: t("landing:aboutUs"),
            href: "/company/about-us",
            icon: "/static/icons/book.svg",
            isDisabled: true
          },
          {
            label: t("landing:newsroom"),
            href: "/newsroom",
            icon: "/static/icons/monitor.svg"
          },
          {
            label: t("landing:howItWorks"),
            href: "/how-it-works",
            icon: "/static/icons/settings.svg"
          }
        ]
      },
      {
        id: 1,
        title: "Work With us",
        items: [
          {
            label: t("landing:careers"),
            href: `mailto:${CAREERS_FOODETECTIVE_EMAIL}?subject=${t(
              "careersSubject"
            )}`,
            icon: "/static/icons/shopping.svg"
          },
          {
            label: t("landing:partners"),
            href: PARTNERS_URL,
            icon: "/static/icons/honour.svg"
          }
        ]
      }
    ]
  }
];
