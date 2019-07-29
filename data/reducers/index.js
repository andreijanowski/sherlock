import { reducer as notifications } from "react-notification-system-redux";
import { reducer as burgerMenu } from "redux-burger-menu/immutable";
import users from "./users";
import groups from "./groups";
import members from "./members";
import deliveries from "./deliveries";
import dishes from "./dishes";
import orders from "./orders";
import caterings from "./caterings";
import privatisations from "./privatisations";
import bookings from "./bookings";
import tables from "./tables";

export default {
  notifications,
  burgerMenu,
  users,
  groups,
  members,
  deliveries,
  dishes,
  orders,
  caterings,
  privatisations,
  bookings,
  tables
};
