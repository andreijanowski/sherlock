export const getMenuItems = t => [
  {
    label: t("landing:howItWorks"),
    href: "/#test"
  },
  {
    label: t("landing:product"),
    baseHref: "/product",
    groups: [
      {
        label: t("features"),
        items: [
          {
            label: t("app:dashboard"),
            href: "/dashboard"
          },
          {
            label: t("app:appManager"),
            href: "/app-manager"
          }
        ]
      },
      {
        label: t("landing:integrations"),
        items: [
          {
            label: t("landing:management"),
            href: "/management"
          },
          {
            label: t("landing:operations"),
            href: "/operations"
          },
          {
            label: t("landing:marketing"),
            href: "/marketing"
          }
        ]
      }
    ]
  },
  {
    label: t("landing:developersAndApi"),
    baseHref: "/developers-and-api",
    groups: [
      {
        items: [
          {
            label: t("landing:documentation"),
            href: "/documentation"
          }
        ]
      }
    ]
  },
  {
    label: t("landing:pricing"),
    baseHref: "/pricing",
    groups: [
      {
        items: [
          {
            label: t("landing:subscriptionPlans"),
            href: "/subscriptions"
          },
          {
            label: t("landing:licensing"),
            href: "/licensing"
          }
        ]
      }
    ]
  },
  {
    label: t("landing:company"),
    baseHref: "/company",
    groups: [
      {
        items: [
          {
            label: t("landing:aboutUs"),
            href: "/about-us"
          },
          {
            label: t("landing:newsroom"),
            href: "/newsroom"
          },
          {
            label: t("landing:careers"),
            href: "/careers"
          },
          {
            label: t("landing:partners"),
            href: "/partners"
          }
        ]
      }
    ]
  }
];
