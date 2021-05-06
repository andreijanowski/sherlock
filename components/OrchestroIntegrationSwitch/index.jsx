import React, { useCallback, useState } from "react";
import { func, string, bool } from "prop-types";
import Switch from "react-switch";
import { Flex } from "@rebass/grid";
import { connect } from "react-redux";

import { theme } from "utils/theme";
import {
  connectPartnerWithOrkestro,
  disconnectPartnerFromOrkestro
} from "actions/integrations";
import { H3 } from "components";
import { Confirm } from "components/modals";
import { Option, SwitchWrapper } from "./styled";

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
    <Flex alignItems="center" mx={3}>
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
      <Option dark={isConnectedToOrkestro} mr={3}>
        {isConnectedToOrkestro
          ? t("integrations:disconnect")
          : t("integrations:disconnected")}
      </Option>
      <SwitchWrapper>
        <Switch
          disabled={isFetching || !isSucceeded}
          checked={isConnectedToOrkestro}
          onChange={handleOrkestroIntegrationChange}
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
      <Option dark={!isConnectedToOrkestro} ml={3}>
        {isConnectedToOrkestro
          ? t("integrations:connected")
          : t("integrations:connect")}
      </Option>
    </Flex>
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
