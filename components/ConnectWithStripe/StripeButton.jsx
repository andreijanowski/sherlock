import React from "react";
import { node, func, string } from "prop-types";
import { STRIPE_CLIENT_ID } from "consts";
import { connect } from "react-redux";
import { setStripeData } from "actions/auth";
import uuid from "uuid/v1";
import { StripeButtonStyled, StripeLogo } from "./styled";

const StripeButton = ({ children, setStripeConnectData, businessId }) => (
  <StripeButtonStyled
    as="a"
    onClick={() => {
      const state = uuid();
      setStripeConnectData({ businessId, state });
      window.location.href = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${STRIPE_CLIENT_ID}&scope=read_write&state=${state}`;
    }}
  >
    <StripeLogo />
    <span>{children}</span>
  </StripeButtonStyled>
);

StripeButton.propTypes = {
  children: node.isRequired,
  setStripeConnectData: func.isRequired,
  businessId: string.isRequired
};

export default connect(
  state => ({
    businessId:
      state.users.currentBusiness.data && state.users.currentBusiness.data.id
  }),
  { setStripeConnectData: setStripeData }
)(StripeButton);
