import { func, string, bool } from "prop-types";
import { useState } from "react";
import Switch from "react-switch";
import { Flex } from "@rebass/grid";
import { theme } from "utils/theme";
import { Modal, Button } from "components";
import { connect } from "react-redux";

import {
  connectPartnerWithUberEats,
  disconnectPartnerFromUberEats
} from "actions/integrations";

import { Option, SwitchWrapper, ModalHeader } from "./styled";
import { UberIntegrationForm } from "./UberIntegrationForm";

const UberIntegrationSwitch = ({
  t,
  isFetching,
  isConnectedToUber,
  businessId,
  connectToUber,
  disconnectFromUber
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  const handleSwitch = () =>
    isConnectedToUber ? disconnectFromUber(businessId) : setIsOpen(true);
  return (
    <Flex alignItems="center" mx={3}>
      {isOpen && (
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
      <Option dark={isConnectedToUber} mr={3}>
        {isConnectedToUber
          ? t("integrations:disconnect")
          : t("integrations:disconnected")}
      </Option>
      <SwitchWrapper>
        <Switch
          checked={isConnectedToUber}
          onChange={() => handleSwitch()}
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
    const buissnes = state.getIn([
      "users",
      "currentBusiness",
      "data",
      "businesses"
    ]);
    const isConnected = state.getIn(["integrations", "isConnectedToOrkestro"]);
    const isUberConnected = state.getIn([
      "uberIntegrations",
      "isConnectedToUberEats"
    ]);
    const fetching = state.getIn(["uberIntegrations", "isFetching"]);
    const success = state.getIn(["integrations", "isSucceeded"]);
    const id = buissnes && buissnes.first().get("id");
    return {
      businessId: id,
      isConnectedToOrkestro: isConnected,
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
