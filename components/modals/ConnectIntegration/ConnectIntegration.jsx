import React from "react";
import { func, shape } from "prop-types";
import { Modal } from "components";
import ConnectIntegrationForm from "./ConnectIntegrationForm";

const ConnectIntegration = ({ partner, onSubmit, onClose }) => (
  <Modal open onClose={onClose}>
    <ConnectIntegrationForm
      partner={partner}
      onSubmit={onSubmit}
      onClose={onClose}
    />
  </Modal>
);

ConnectIntegration.propTypes = {
  partner: shape().isRequired,
  onSubmit: func.isRequired,
  onClose: func.isRequired
};

export default ConnectIntegration;
