import UserLayout from "sections/settings/Layout";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import { func } from "prop-types";
import BillingSettings from "sections/settings/billing";

const namespaces = ["connectWithStripe", "app"];

const Billing = ({ t }) => (
  <UserLayout {...{ t, currentPage: "billing" }}>
    <BillingSettings {...{ t }} />
  </UserLayout>
);

Billing.propTypes = {
  t: func.isRequired
};

export default requireAuth(true)(withI18next(namespaces)(Billing));
