import React from "react";
import { func, shape } from "prop-types";
import { withTranslation } from "i18n";
import { connect } from "react-redux";
import { compose } from "redux";

import StripeUserModal from "./StripeUserModal";

const namespaces = ["lefood"];

const StripeSetupModal = ({ t, business, onClose }) => {
  if (!business || business.get("stripeUserId")) {
    return null;
  }

  return <StripeUserModal {...{ t, onClose }} />;
};

StripeSetupModal.propTypes = {
  t: func.isRequired,
  business: shape().isRequired,
  onClose: func.isRequired
};

export default compose(
  withTranslation(namespaces),
  connect(state => {
    const businessData = state.getIn(["users", "currentBusiness", "data"]);
    const business =
      businessData &&
      businessData.get("businesses") &&
      businessData.get("businesses").first();

    return {
      business: business && business.get("attributes")
    };
  })
)(StripeSetupModal);
