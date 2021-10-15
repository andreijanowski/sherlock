import React, { useCallback, useState } from "react";
import { bool, func, string } from "prop-types";
import { connect } from "react-redux";

import { Button, H3, Modal } from "components";
import {
  connectPartnerWithUberEats,
  disconnectPartnerFromUberEats
} from "actions/integrations";
import { Confirm } from "components/modals";
import { ModalHeader } from "./styled";
import { UberIntegrationForm } from "./UberIntegrationForm";
import IntegrationSwitch from "./IntegrationSwitch";

const MODALS = {
  CONNECT: "CONNECT",
  DISCONNECT: "DISCONNECT"
};

const UberIntegrationSwitch = ({
  t,
  isFetching,
  isConnectedToUber,
  businessId,
  connectToUber,
  disconnectFromUber
}) => {
  const [modal, setModal] = useState(null);
  const closeModal = useCallback(() => setModal(null), []);

  const onConfirmDisconnect = useCallback(async () => {
    await disconnectFromUber(businessId);
    closeModal();
  }, [businessId, closeModal, disconnectFromUber]);

  const handleSwitch = () => {
    setModal(isConnectedToUber ? MODALS.DISCONNECT : MODALS.CONNECT);
  };
  return (
    <>
      {modal === MODALS.CONNECT && (
        <Modal {...{ open: true, onClose: closeModal }}>
          <ModalHeader>Uber Eats Integration</ModalHeader>
          {isConnectedToUber ? (
            <div>
              <p>You have been successfully connected with Uber Eats</p>
              <Button onClick={() => closeModal()}>Close</Button>
            </div>
          ) : (
            <UberIntegrationForm
              isFetching={isFetching}
              connectToUber={connectToUber}
              t={t}
              businessId={businessId}
            />
          )}
        </Modal>
      )}
      {modal === MODALS.DISCONNECT && (
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
            {t("integrations:disconnectPrompt", { integration: "Uber Eats" })}
          </H3>
        </Confirm>
      )}
      <IntegrationSwitch
        isFetching={isFetching}
        t={t}
        onChange={handleSwitch}
        isIntegrationConnected={isConnectedToUber}
      />
    </>
  );
};
UberIntegrationSwitch.propTypes = {
  businessId: string.isRequired,
  isConnectedToUber: bool.isRequired,
  isFetching: bool.isRequired,
  isSucceeded: bool.isRequired,
  t: func.isRequired,
  connectToUber: func.isRequired,
  disconnectFromUber: func.isRequired
};

UberIntegrationSwitch.defaultValue = {
  businessId: string,
  isUberConnected: false,
  isFetching: false,
  isSucceeded: true
};

export default connect(
  state => {
    const business = state.getIn([
      "users",
      "currentBusiness",
      "data",
      "businesses"
    ]);
    const isUberConnected = state.getIn([
      "uberIntegrations",
      "isConnectedToUberEats"
    ]);
    const fetching = state.getIn(["uberIntegrations", "isFetching"]);
    const success = state.getIn(["integrations", "isSucceeded"]);
    const id = business && business.first().get("id");
    return {
      businessId: id,
      isConnectedToUber: isUberConnected,
      isFetching: fetching,
      isSucceeded: success
    };
  },
  {
    connectToUber: connectPartnerWithUberEats,
    disconnectFromUber: disconnectPartnerFromUberEats
  }
)(UberIntegrationSwitch);
