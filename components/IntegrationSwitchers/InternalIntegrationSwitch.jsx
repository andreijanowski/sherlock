import React, { useCallback, useState } from "react";
import { bool, func, string, shape } from "prop-types";
import { connect } from "react-redux";

import { H3 } from "components";
import { Confirm } from "components/modals";
import { selectCurrentBusinessId } from "selectors/business";
import {
  isInternalIntegrationConnectedOrPending,
  isPartnerRequiresConnection
} from "utils/integrations";
import {
  connectIntegrationPartner,
  disconnectIntegrationPartner
} from "actions/partners";
import ConnectIntegration from "components/modals/ConnectIntegration";
import IntegrationSwitch from "./IntegrationSwitch";

const MODALS = {
  DISCONNECT: "disconnect",
  CONNECT: "connect"
};

const InternalIntegrationSwitch = ({
  t,
  businessId,
  isFetching,
  partner,
  partnerId,
  integratePartner,
  removePartner
}) => {
  const [modal, setModal] = useState(null);

  const name = partner.get("name");
  const isIntegrationPending = partner.get("partnerIntegrationRequested");
  const isIntegrated = partner.get("partnerIntegrationActive");
  const partnerRequiresConnection = isPartnerRequiresConnection(partner);

  const isConnectedOrPending = isInternalIntegrationConnectedOrPending(partner);

  const makeIntegrationRequest = useCallback(
    () => integratePartner(businessId, partnerId),
    [businessId, integratePartner, partnerId]
  );

  const makeCancelIntegrationRequest = useCallback(
    () => removePartner(businessId, partnerId),
    [businessId, partnerId, removePartner]
  );

  const onIntegrationButtonClick = useCallback(() => {
    if (isIntegrated || isIntegrationPending) {
      setModal(MODALS.DISCONNECT);
    } else if (partnerRequiresConnection) {
      setModal(MODALS.CONNECT);
    } else {
      makeIntegrationRequest();
    }
  }, [
    isIntegrated,
    isIntegrationPending,
    partnerRequiresConnection,
    makeIntegrationRequest
  ]);

  const closeModal = useCallback(() => {
    setModal(null);
  }, []);

  const onConfirmDisconnect = useCallback(async () => {
    await makeCancelIntegrationRequest();
    closeModal();
  }, [closeModal, makeCancelIntegrationRequest]);

  const onPOSConnectSubmit = useCallback(
    async data => {
      // todo make request to pos connection
      console.log(data);
      // await makeCancelIntegrationRequest();
      closeModal();
    },
    [closeModal]
  );

  return (
    <>
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
            {t("integrations:disconnectPrompt", {
              integration: name
            })}
          </H3>
        </Confirm>
      )}
      {modal === MODALS.CONNECT && (
        <ConnectIntegration
          partner={partner}
          onSubmit={onPOSConnectSubmit}
          onClose={closeModal}
        />
      )}
      <IntegrationSwitch
        isFetching={isFetching}
        t={t}
        onChange={onIntegrationButtonClick}
        isIntegrationConnected={isConnectedOrPending}
      />
    </>
  );
};
InternalIntegrationSwitch.propTypes = {
  partner: shape().isRequired,
  partnerId: string.isRequired,
  businessId: string.isRequired,
  isFetching: bool.isRequired,
  t: func.isRequired,
  integratePartner: func.isRequired,
  removePartner: func.isRequired
};

export default connect(
  state => {
    const isFetching = state.getIn(["integrations", "isFetching"]);
    return {
      businessId: selectCurrentBusinessId(state),
      isFetching
    };
  },
  {
    integratePartner: connectIntegrationPartner,
    removePartner: disconnectIntegrationPartner
  }
)(InternalIntegrationSwitch);
