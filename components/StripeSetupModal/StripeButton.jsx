import React from "react";
import { node, string } from "prop-types";
import { STRIPE_CLIENT_ID } from "consts";
import { connect } from "react-redux";
import uuid from "uuid/v1";
import { StripeButtonStyled, StripeLogo } from "./styled";

const StripeButton = ({ children, businessId }) => (
  <StripeButtonStyled
    as="a"
    styleName="blueDegrade"
    onClick={() => {
      const state = uuid();
      window.localStorage.setItem(
        "stripeConnectData",
        JSON.stringify({ businessId, state })
      );
      window.location.href = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${STRIPE_CLIENT_ID}&scope=read_write&state=${state}`;
    }}
  >
    <StripeLogo />
    <span>{children}</span>
  </StripeButtonStyled>
);

StripeButton.propTypes = {
  children: node.isRequired,
  businessId: string.isRequired
};

export default connect(state => {
  const businessData = state.getIn(["users", "currentBusiness", "data"]);
  const business =
    businessData &&
    businessData.get("businesses") &&
    businessData.get("businesses").first();
  return { businessId: business && business.get("id") };
})(StripeButton);
