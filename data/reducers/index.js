import { reducer as notifications } from "react-notification-system-redux";
import { reducer as burgerMenu } from "redux-burger-menu/immutable";
import app from "./app";
import users from "./users";
import groups from "./groups";
import members from "./members";
import deliveries from "./deliveries";
import dishes from "./dishes";
import orders from "./orders";
import caterings from "./caterings";
import categories from "./categories";
import privatisations from "./privatisations";
import integrations from "./integrations";
import uberIntegrations from "./uberIntegrations";
import reservations from "./reservations";
import tables from "./tables";
import bookings from "./bookings";
import widgets from "./widgets";
import partners from "./partners";
import externalServices from "./externalServices";
import detectives from "./detectives";
import plans from "./plans";
import payments from "./payments";
import dashboard from "./dashboard";

export default {
  app,
  notifications,
  burgerMenu,
  dashboard,
  users,
  groups,
  members,
  deliveries,
  dishes,
  orders,
  caterings,
  categories,
  privatisations,
  integrations,
  uberIntegrations,
  reservations,
  tables,
  bookings,
  widgets,
  partners,
  externalServices,
  detectives,
  plans,
  payments
};
