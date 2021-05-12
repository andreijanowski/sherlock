import {
  AppManager,
  Bookings,
  Catering,
  Clients,
  CommunityManagement,
  Dashboard,
  Detectives,
  Delivery,
  IntegrationHub,
  Marketing,
  Payments,
  Photography,
  PrivateEvents,
  Restaurant,
  Reviews,
  StockManagement,
  Wholesalers
} from "components/Icons";
import { SUBSCRIPTION_PERIOD, SUBSCRIPTION_PLANS } from "consts";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const heads = ({ isMonth = true, t }) => {
  const interval = isMonth
    ? SUBSCRIPTION_PERIOD.MONTH
    : SUBSCRIPTION_PERIOD.YEAR;
  const priceEssential = t(`plans:essential.price.${interval}`);
  const pricePremium = t(`plans:premium.price.${interval}`);

  return [
    {
      button: t("plans:basic.buttonText2"),
      color: "#4F4F4F",
      label: SUBSCRIPTION_PLANS.FREEMIUM,
      price: t(`plans:basic.price.${interval}`)
    },
    {
      button: t("plans:essential.buttonText2"),
      color: "#333",
      label: SUBSCRIPTION_PLANS.ESSENTIAL,
      price: `€${priceEssential}`
    },
    {
      button: t("plans:premium.buttonText2"),
      color: "#4C68FF",
      label: SUBSCRIPTION_PLANS.PREMIUM,
      price: `€${pricePremium}`
    },
    {
      button: t("plans:special.buttonText2"),
      color: "#0D124A",
      description: (
        <>
          <p>{t("plans:special.description1")}</p>
          <p>{t("plans:special.description2")}</p>
        </>
      ),
      label: SUBSCRIPTION_PLANS.ENTREPRISE,
      price: t("plans:special.priceDescription2")
    }
  ];
};

const ICON_DASH = <FontAwesomeIcon color="#c1c1c1" icon={faMinus} />;

export const planParts = ({ t }) => [
  {
    heading: t("plans:optionsHd.1"),
    items: [
      {
        icon: <Restaurant />,
        label: t("plans:options.myProfile")
      },
      {
        free: "€1",
        icon: <Bookings />,
        label: t("plans:options.bookings")
      },
      {
        essential: "5%",
        free: "10%",
        icon: <Delivery />,
        label: t("plans:options.deliveryTakeAway"),
        premium: t("plans:basic.price.month")
      },
      {
        essential: "5%",
        free: "10%",
        icon: <Catering />,
        label: t("plans:options.catering"),
        premium: t("plans:basic.price.month")
      },
      {
        essential: "5%",
        free: "10%",
        icon: <PrivateEvents />,
        label: t("plans:options.privateEvents"),
        premium: t("plans:basic.price.month")
      },
      {
        essential: "1.4%",
        free: "1.4%",
        icon: <Payments />,
        label: t("plans:options.payments"),
        premium: "1.4%"
      }
    ]
  },
  {
    heading: t("plans:optionsHd.2"),
    items: [
      {
        icon: <IntegrationHub />,
        label: t("plans:options.integrationHub")
      },
      {
        icon: <Wholesalers />,
        label: t("plans:options.wholesalers")
      },
      {
        label: t("plans:options.deliveryManagement")
      },
      {
        free: ICON_DASH,
        icon: <AppManager />,
        label: t("plans:options.appManager")
      },
      {
        free: ICON_DASH,
        icon: <Dashboard />,
        label: t("plans:options.dashboard")
      },
      {
        free: ICON_DASH,
        icon: <Reviews />,
        label: t("plans:options.reviews")
      },
      {
        essential: ICON_DASH,
        free: ICON_DASH,
        label: t("plans:options.analytics")
      },
      {
        essential: ICON_DASH,
        free: ICON_DASH,
        icon: <StockManagement />,
        label: t("plans:options.stockManagement")
      },
      {
        essential: ICON_DASH,
        free: ICON_DASH,
        icon: <Clients />,
        label: t("plans:options.clientDirectory")
      }
    ]
  },
  {
    heading: t("plans:optionsHd.3"),
    items: [
      {
        icon: <Photography />,
        label: `${t("plans:options.photography")} *`
      },
      {
        icon: <Marketing />,
        label: `${t("plans:options.adsMarketing")} *`
      },
      {
        icon: <CommunityManagement />,
        label: `${t("plans:options.communityManagement")} *`
      },
      {
        free: ICON_DASH,
        icon: <Detectives />,
        label: t("plans:options.detectives")
      }
    ]
  }
];
