import React from "react";
import ConnectWithStripe from "components/Stripe/ConnectWithStripe";
import { func } from "prop-types";
import { Container } from "./styled";

const BillingSettings = ({ t }) => (
  <Container>
    <ConnectWithStripe {...{ t }} />
  </Container>
);

BillingSettings.propTypes = {
  t: func.isRequired
};

export default BillingSettings;
