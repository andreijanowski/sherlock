import {
  Adv,
  AppManager,
  Bookings,
  Clients,
  CustomerLoyalty,
  Dashboard,
  Delivery,
  EventsManagement,
  FoodWaste,
  InfluencerManagement,
  IntegrationHub,
  Intelligence,
  MenuManagement,
  Payments,
  Payroll,
  PresenceManagement,
  Restaurant,
  Reviews,
  StockManagement,
  Wholesalers
} from "components/Icons";

export const WORK_STATUS = {
  IN_PROGRESS: "In progress",
  COMING_SOON: "Coming soon"
};

export const menuItems = [
  {
    title: "Analytics",
    items: [
      {
        title: "Intelligence",
        description: "Intelligent Notifications",
        icon: Intelligence,
        href: "/product/analytics#intelligence",
        status: WORK_STATUS.IN_PROGRESS
      },
      {
        title: "Dashboard",
        icon: Dashboard,
        description: "Tailor Made Analytics",
        href: "/product/analytics#dashboard"
      },
      {
        title: "Business Profile",
        icon: Restaurant,
        description: "Online Presence",
        href: "/product/analytics#profile"
      },
      {
        title: "Integrations",
        icon: IntegrationHub,
        description: "One Click Integration",
        href: "/product/analytics#integrations"
      },
      {
        title: "App Manager",
        icon: AppManager,
        description: "Real Time App View",
        href: "/product/analytics#appManager"
      }
    ]
  },
  {
    title: "Management",
    items: [
      {
        title: "Orders",
        description: "Orders Management",
        icon: Delivery,
        href: "/product/management#orders"
      },
      {
        title: "Menu",
        icon: MenuManagement,
        description: "Menu Management",
        href: "/product/management#menu"
      },
      {
        title: "Reservation",
        icon: Bookings,
        description: "Booking Management",
        href: "/product/management#reservation"
      },
      {
        title: "Events",
        icon: EventsManagement,
        description: "Event Management",
        href: "/product/management#events"
      },
      {
        title: "Customers",
        icon: Clients,
        description: "Clients Data",
        href: "/product/management#customers"
      }
    ]
  },
  {
    title: "Operations",
    items: [
      {
        title: "Payments",
        description: "Payment Management",
        icon: Payments,
        href: "/product/operations#payments"
      },
      {
        title: "Procurement",
        icon: Wholesalers,
        description: "Connecting Suppliers",
        href: "/product/operations#procurement"
      },
      {
        title: "Stock Management",
        icon: StockManagement,
        description: "Intelligent Stock",
        href: "/product/operations#stockManagement"
      },
      {
        title: "HR & Payroll",
        icon: Payroll,
        description: "Employee Management",
        status: WORK_STATUS.COMING_SOON
      },
      {
        title: "Foodwaste",
        icon: FoodWaste,
        description: "Reducing Waste",
        status: WORK_STATUS.COMING_SOON
      }
    ]
  },
  {
    title: "Marketing",
    items: [
      {
        title: "Content",
        description: "Tailor Made Content",
        icon: InfluencerManagement,
        href: "/product/marketing#contentManagement"
      },
      {
        title: "Review",
        icon: Reviews,
        description: "Review Management",
        href: "/product/marketing#reviewManagement"
      },
      {
        title: "Presence",
        icon: PresenceManagement,
        description: "Presence Management",
        href: "/product/marketing#presenceManagement"
      },
      {
        title: "Advertising",
        icon: Adv,
        description: "Tailor Made Ads",
        href: "/product/marketing#contentManagement"
      },
      {
        title: "Customer Loyalty",
        icon: CustomerLoyalty,
        description: "Loyalty Programs",
        status: WORK_STATUS.COMING_SOON
      }
    ]
  }
];
