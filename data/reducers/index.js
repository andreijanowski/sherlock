import { reducer as notifications } from "react-notification-system-redux";
import { reducer as burgerMenu } from "redux-burger-menu/immutable";
import app from "./app";
import auth from "./auth";
import users from "./users";
import groups from "./groups";
import members from "./members";
import deliveries from "./deliveries";
import dishes from "./dishes";
import orders from "./orders";
import caterings from "./caterings";
import stripe from "./stripe";

export default {
  notifications,
  burgerMenu,
  app,
  auth,
  users,
  groups,
  members,
  deliveries,
  dishes,
  orders,
  caterings,
  stripe
};
