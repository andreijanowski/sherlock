import React from "react";

import {
  IntegrationHub,
  Dashboard,
  AppManager,
  Restaurant,
  Delivery,
  MenuManagement,
  Bookings,
  EventsManagement,
  Clients,
  Payments,
  Wholesalers,
  StockManagement,
  Payroll,
  FoodWaste,
  InfluencerManagement,
  PresenceManagement,
  Reviews,
  CustomerLoyalty,
  CustomerSupport,
  OperationalReport
} from "components/Icons";
import { PLANS_BUSINESS_EXAMPLE_LINK } from "consts";
import { TableHintCaption, TableHintTitle } from "./TableHint/styled";

export const getTableConfig = t => [
  {
    heading: t("plans:ourFeatures"),
    sections: [
      {
        id: "features",
        rows: [
          {
            icon: IntegrationHub,
            href: "/#features",
            onClick: e => {
              e.preventDefault();
              const target = document.querySelector("#features h2");
              window.scroll({
                left: 0,
                top: window.scrollY + target.getBoundingClientRect().top,
                behavior: "smooth"
              });
            },
            label: t("app:integrationHub"),
            renderHint: () => (
              <>
                <TableHintTitle>
                  {t("plans:hints.integrationHubTitle")}
                </TableHintTitle>
                <TableHintCaption>
                  ({t("plans:hints.integrationHubCaption")})
                </TableHintCaption>
              </>
            ),
            columns: [
              { isAvailable: true },
              { isAvailable: true },
              { isAvailable: true }
            ]
          },
          {
            icon: Dashboard,
            label: t("app:dashboard"),
            columns: [
              { label: t("plans:dashboardAnalytics.basic") },
              { label: t("plans:dashboardAnalytics.essential") },
              {
                label: t("plans:dashboardAnalytics.ultimate"),
                renderHint: () => (
                  <TableHintTitle>
                    {t("plans:hints.dashboardTailorMade")}
                  </TableHintTitle>
                )
              }
            ]
          },
          {
            icon: AppManager,
            label: t("app:appManager"),
            columns: [
              { isAvailable: true },
              { isAvailable: true },
              { isAvailable: true }
            ]
          },
          {
            icon: Restaurant,
            label: t("app:manageProfile.myProfile"),
            href: PLANS_BUSINESS_EXAMPLE_LINK,
            columns: [
              { isAvailable: true },
              { isAvailable: true },
              { isAvailable: true }
            ]
          }
        ]
      }
    ]
  },
  {
    heading: t("plans:ourIntegrations"),
    sections: [
      {
        id: "managementIntegrations",
        link: {
          label: t("app:managementIntegrations")
        },
        rows: [
          {
            icon: Delivery,
            label: t("app:delivery"),
            columns: [
              { isAvailable: true },
              { isAvailable: true },
              { isAvailable: true }
            ]
          },
          {
            icon: MenuManagement,
            label: t("app:menuManagement"),
            columns: [
              { isAvailable: true },
              { isAvailable: true },
              { isAvailable: true }
            ]
          },
          {
            icon: Bookings,
            label: t("app:reservations"),
            columns: [
              { isAvailable: true },
              { isAvailable: true },
              { isAvailable: true }
            ]
          },
          {
            icon: EventsManagement,
            label: t("app:eventsManagement"),
            columns: [
              { isAvailable: true },
              { isAvailable: true },
              { isAvailable: true }
            ]
          },
          {
            icon: Clients,
            label: t("app:clients"),
            columns: [
              { isAvailable: false },
              { isAvailable: true },
              { isAvailable: true }
            ]
          }
        ]
      },
      {
        id: "operationsIntegrations",
        link: {
          label: t("app:operationsIntegrations")
        },
        rows: [
          {
            icon: Payments,
            label: t("app:payments"),
            renderHint: () => (
              <>
                <TableHintTitle>
                  {t("plans:hints.paymentsTitle")}
                </TableHintTitle>
                <TableHintCaption>
                  ({t("plans:hints.paymentsCaption")})
                </TableHintCaption>
              </>
            ),
            columns: [
              { isAvailable: true },
              { isAvailable: true },
              { isAvailable: true }
            ]
          },
          {
            icon: Wholesalers,
            label: t("app:wholesaler"),
            columns: [
              { isAvailable: true },
              { isAvailable: true },
              { isAvailable: true }
            ]
          },
          {
            icon: StockManagement,
            label: t("app:stockManagement"),
            columns: [
              { isAvailable: false },
              { isAvailable: true },
              { isAvailable: true }
            ]
          },
          {
            icon: Payroll,
            label: t("app:payroll"),
            isComingSoon: true,
            columns: [
              { isAvailable: false },
              { isAvailable: false },
              { isAvailable: true }
            ]
          },
          {
            icon: FoodWaste,
            label: t("app:foodWaste"),
            isComingSoon: true,
            columns: [
              { isAvailable: false },
              { isAvailable: false },
              { isAvailable: true }
            ]
          }
        ]
      },
      {
        id: "marketingIntegrations",
        link: {
          label: t("app:marketingIntegrations")
        },
        rows: [
          {
            icon: InfluencerManagement,
            label: t("app:influencerManagement"),
            columns: [
              { isAvailable: true },
              { isAvailable: true },
              { isAvailable: true }
            ]
          },
          {
            icon: PresenceManagement,
            label: t("app:presenceManagement"),
            columns: [
              { isAvailable: false },
              { isAvailable: true },
              { isAvailable: true }
            ]
          },
          {
            icon: Reviews,
            label: t("app:reviews"),
            columns: [
              { isAvailable: false },
              { isAvailable: true },
              { isAvailable: true }
            ]
          },
          {
            icon: CustomerLoyalty,
            label: t("app:loyalty"),
            columns: [
              { isAvailable: false },
              { isAvailable: false },
              { isAvailable: true }
            ]
          }
        ]
      }
    ]
  },
  {
    heading: t("plans:reportAndSupport"),
    sections: [
      {
        id: "features",
        rows: [
          {
            icon: CustomerSupport,
            label: t("plans:customerSupport.title"),
            columns: [
              {
                label: t("plans:customerSupport.options.basic"),
                renderHint: () => (
                  <>
                    <TableHintTitle>
                      {t("plans:hints.customerSupportTitle")}
                    </TableHintTitle>
                    <TableHintCaption>
                      {t("plans:hints.customerSupportTime")}
                      <br />
                      {t("plans:hints.customerSupportDays")}
                    </TableHintCaption>
                  </>
                )
              },
              { label: t("plans:customerSupport.options.essential") },
              { label: t("plans:customerSupport.options.ultimate") }
            ]
          },
          {
            icon: OperationalReport,
            label: t("plans:operationalReport.title"),
            isComingSoon: true,
            columns: [
              { isAvailable: false },
              { label: t("plans:operationalReport.options.essential") },
              { label: t("plans:operationalReport.options.ultimate") }
            ]
          }
        ]
      }
    ]
  }
];
