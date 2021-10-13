import React, { useCallback, useState } from "react";
import { bool, func, string, shape } from "prop-types";
import { connect } from "react-redux";

import { H3 } from "components";
import { Confirm } from "components/modals";
import { selectCurrentBusinessId } from "selectors/business";
import { isInternalIntegrationConnectedOrPending } from "utils/integrations";
import {
  connectIntegrationPartner,
  disconnectIntegrationPartner
} from "actions/partners";
import IntegrationSwitch from "./IntegrationSwitch";

const InternalIntegrationSwitch = ({
  t,
  businessId,
  isFetching,
  partner,
  partnerId,
  integratePartner,
  removePartner
}) => {
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);

  const name = partner.get("name");
  const isIntegrationPending = partner.get("partnerIntegrationRequested");
  const isIntegrated = partner.get("partnerIntegrationActive");

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
      setShowDisconnectModal(true);
    } else {
      makeIntegrationRequest();
    }
  }, [isIntegrated, isIntegrationPending, makeIntegrationRequest]);

  const closeModal = useCallback(() => {
    setShowDisconnectModal(false);
  }, []);

  const onConfirmDisconnect = useCallback(async () => {
    await makeCancelIntegrationRequest();
    closeModal();
  }, [closeModal, makeCancelIntegrationRequest]);

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
            {t("integrations:disconnectPrompt", {
              integration: name
            })}
          </H3>
        </Confirm>
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
