import {
  apiGuideLink,
  NEWS_ROOM_URL,
  PARTNERS_URL,
  CAREERS_FOODETECTIVE_EMAIL
} from "consts";

export const getMenuItems = t => [
  {
    label: t("landing:howItWorks"),
    href: "/"
  },
  {
    label: t("landing:product"),
    groups: [
      {
        label: t("landing:features"),
        items: [
          {
            label: t("app:dashboard"),
            href: "/product/dashboard"
          },
          {
            label: t("app:appManager"),
            href: "/product/app-manager"
          }
        ]
      },
      {
        label: t("landing:integrations"),
        items: [
          {
            label: t("landing:management"),
            href: "/?partners=delivery#integrations"
          },
          {
            label: t("landing:operations"),
            href: "/?partners=procurement#integrations"
          },
          {
            label: t("landing:marketing"),
            href: "/?partners=content#integrations"
          }
        ]
      }
    ]
  },
  {
    label: t("landing:developersAndApi"),
    groups: [
      {
        items: [
          {
            label: t("landing:documentation"),
            href: apiGuideLink
          }
        ]
      }
    ]
  },
  {
    label: t("landing:pricing"),
    groups: [
      {
        items: [
          {
            label: t("landing:subscriptionPlans"),
            href: "/pricing/subscriptions"
          },
          {
            label: t("landing:licensing"),
            href: "/pricing/licensing"
          }
        ]
      }
    ]
  },
  {
    label: t("landing:company"),
    groups: [
      {
        items: [
          {
            label: t("landing:aboutUs"),
            href: "/company/about-us"
          },
          {
            label: t("landing:newsroom"),
            href: NEWS_ROOM_URL
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
    ]
  }
];
