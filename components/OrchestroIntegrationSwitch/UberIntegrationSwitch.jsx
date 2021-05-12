import React, { useCallback, useState } from "react";
import { func, string, bool } from "prop-types";
import Switch from "react-switch";
import { Flex } from "@rebass/grid";
import { connect } from "react-redux";

import { theme } from "utils/theme";
import { Modal, Button, H3 } from "components";
import {
  connectPartnerWithUberEats,
  disconnectPartnerFromUberEats
} from "actions/integrations";
import { Confirm } from "components/modals";

import { Option, SwitchWrapper, ModalHeader } from "./styled";
import { UberIntegrationForm } from "./UberIntegrationForm";

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
    <Flex alignItems="center" mx={3}>
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
      <Option dark={isConnectedToUber} mr={3}>
        {isConnectedToUber
          ? t("integrations:disconnect")
          : t("integrations:disconnected")}
      </Option>
      <SwitchWrapper>
        <Switch
          disabled={isFetching}
          checked={isConnectedToUber}
          onChange={handleSwitch}
          uncheckedIcon={false}
          checkedIcon={false}
          handleDiameter={21}
          height={31}
          width={80}
          offHandleColor="#a5a8af"
          onHandleColor="#000000"
          offColor="#f8f9ff"
          onColor="#f8f9ff"
          boxShadow={`0 1px 3px rgba(${theme.colors.blue}, 0.48)`}
          activeBoxShadow={`0 0 0 3px rgba(${theme.colors.blue}, 0.48)`}
        />
      </SwitchWrapper>
      <Option dark={!isConnectedToUber} ml={3}>
        {isConnectedToUber
          ? t("integrations:connected")
          : t("integrations:connect")}
      </Option>
    </Flex>
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
