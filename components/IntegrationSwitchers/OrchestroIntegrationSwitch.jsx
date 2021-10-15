import React, { useCallback, useState } from "react";
import { bool, func, string } from "prop-types";
import { connect } from "react-redux";

import {
  connectPartnerWithOrkestro,
  disconnectPartnerFromOrkestro
} from "actions/integrations";
import { H3 } from "components";
import { Confirm } from "components/modals";
import IntegrationSwitch from "./IntegrationSwitch";

const OrchestroIntegrationSwitch = ({
  t,
  integrateWithOrkestro,
  disconnectFromOrkestro,
  businessId,
  isConnectedToOrkestro,
  isFetching,
  isSucceeded
}) => {
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);

  const closeModal = useCallback(() => {
    setShowDisconnectModal(false);
  }, []);

  const onConfirmDisconnect = useCallback(async () => {
    await disconnectFromOrkestro(businessId);
    closeModal();
  }, [businessId, closeModal, disconnectFromOrkestro]);

  const handleOrkestroIntegrationChange = e => {
    if (e) {
      integrateWithOrkestro(businessId);
    } else {
      setShowDisconnectModal(true);
    }
  };

  return (
    <>
      {showDisconnectModal && (
        <Confirm
          open
          restyled
          inverseColors
          btnOkText={t("integrations:disconnect")}
          btnCancelText={t("forms:cancel")}
          onConfirm={onConfirmDisconnect}
          onClose={closeModal}
        >
          <H3>
            {t("integrations:disconnectPrompt", { integration: "Orkestro" })}
          </H3>
        </Confirm>
      )}
      <IntegrationSwitch
        isFetching={isFetching || !isSucceeded}
        t={t}
        onChange={handleOrkestroIntegrationChange}
        isIntegrationConnected={isConnectedToOrkestro}
      />
    </>
  );
};
OrchestroIntegrationSwitch.propTypes = {
  integrateWithOrkestro: func.isRequired,
  disconnectFromOrkestro: func.isRequired,
  businessId: string.isRequired,
  isConnectedToOrkestro: bool.isRequired,
  isFetching: bool.isRequired,
  isSucceeded: bool.isRequired,
  t: func.isRequired
};

OrchestroIntegrationSwitch.defaultValue = {
  businessId: string,
  isConnectedToOrkestro: false,
  isFetching: false,
  isSucceeded: true
};

export default connect(
  state => {
    const buissnes = state.getIn([
      "users",
      "currentBusiness",
      "data",
      "businesses"
    ]);
    const isConnected = state.getIn(["integrations", "isConnectedToOrkestro"]);
    const fetching = state.getIn(["integrations", "isFetching"]);
    const success = state.getIn(["integrations", "isSucceeded"]);
    const id = buissnes && buissnes.first().get("id");
    return {
      businessId: id,
      isConnectedToOrkestro: isConnected,
      isFetching: fetching,
      isSucceeded: success
    };
  },
  {
    integrateWithOrkestro: connectPartnerWithOrkestro,
    disconnectFromOrkestro: disconnectPartnerFromOrkestro
  }
)(OrchestroIntegrationSwitch);
