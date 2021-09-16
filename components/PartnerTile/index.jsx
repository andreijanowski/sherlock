import { noop } from "lodash";
import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { shape, arrayOf, oneOfType, func, string, bool } from "prop-types";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

import {
  connectIntegrationPartner,
  disconnectIntegrationPartner
} from "actions/partners";

import {
  H3,
  OrchestroIntegrationSwitch,
  UberIntegrationSwitch
} from "components";
import { Confirm } from "components/modals";

import IntegrationLink from "./IntegrationLink";
import { getIntegrationButtonLabel } from "./utils";
import {
  ButtonContainer,
  Container,
  ContentWrapper,
  IconAdded,
  Image,
  IntegrationButton,
  InfoButton,
  LinkContainer
} from "./styled";

const PartnerTile = ({
  integratePartner,
  partner,
  partnerId,
  showActionIcon,
  t,
  onAddClick,
  removePartner,
  businessId
}) => {
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);

  const isOrkestroIntegration = partner.get("name") === "Orkestro";
  const isUberIntegration = partner.get("name") === "Uber Eats";
  const isIntegratedWithServices = isOrkestroIntegration || isUberIntegration;
  const WHOLESALER = "wholesaler";

  const isIntegrationPending = partner.get("partnerIntegrationRequested");
  const isIntegrated = partner.get("partnerIntegrationActive");
  const isPreferred = partner.get("preferred");

  const integrationButtonLabel = getIntegrationButtonLabel(
    isIntegrated,
    isIntegrationPending,
    t
  );
  const partnerCategory = partner.get("category");
  const isPartnerWholesaler = partnerCategory === WHOLESALER;

  const iconAddedClick = () => {
    onAddClick({ added: isPreferred, partnerId });
  };

  const makeIntergationRequest = useCallback(
    () => integratePartner(businessId, partnerId),
    [integratePartner, partnerId, businessId]
  );

  const makeCancelIntegrationRequest = useCallback(
    () => removePartner(businessId, partnerId),
    [partnerId, removePartner, businessId]
  );

  const onIntegrationButtonClick = useCallback(() => {
    if (isIntegrated || isIntegrationPending) {
      setShowDisconnectModal(true);
    } else {
      makeIntergationRequest();
    }
  }, [isIntegrated, isIntegrationPending, makeIntergationRequest]);

  const closeModal = useCallback(() => {
    setShowDisconnectModal(false);
  }, []);

  const onConfirmDisconnect = useCallback(async () => {
    await makeCancelIntegrationRequest();
    closeModal();
  }, [closeModal, makeCancelIntegrationRequest]);

  return (
    <Container mb={3} width={["100%"]} alignItems="center">
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
              integration: partner.get("name")
            })}
          </H3>
        </Confirm>
      )}
      {showActionIcon && (
        <IconAdded
          added={isPreferred}
          icon={isPreferred ? faMinus : faPlus}
          onClick={iconAddedClick}
        />
      )}
      <Image src={partner.getIn(["logo", "url"])} />
      <ContentWrapper
        alignItems="center"
        justifyContent="space-between"
        p={[3, 4]}
        flex={1}
      >
        <LinkContainer width={["auto", "auto", "35%", "30", "40%"]}>
          <IntegrationLink partner={partner}>
            {partner.get("name")}
          </IntegrationLink>
        </LinkContainer>
        <ButtonContainer width={["100%", "100%", "65%", "70", "60%"]}>
          {!isPartnerWholesaler &&
            (!isIntegratedWithServices && (
              <IntegrationButton
                styleName={
                  isIntegrated || isIntegrationPending ? "orange" : "navyBlue"
                }
                onClick={onIntegrationButtonClick}
              >
                {integrationButtonLabel}
              </IntegrationButton>
            ))}
          {!isPartnerWholesaler && isOrkestroIntegration && (
            <OrchestroIntegrationSwitch t={t} />
          )}
          {!isPartnerWholesaler && isUberIntegration && (
            <UberIntegrationSwitch t={t} />
          )}
          <InfoButton styleName="navyBlue">
            <IntegrationLink partner={partner}>
              {isPartnerWholesaler
                ? t("app:manageIntegrations.orderNow")
                : t("app:manageIntegrations.moreInfo")}
            </IntegrationLink>
          </InfoButton>
        </ButtonContainer>
      </ContentWrapper>
    </Container>
  );
};

PartnerTile.propTypes = {
  integratePartner: func.isRequired,
  partner: oneOfType([arrayOf(), shape()]).isRequired,
  partnerId: string.isRequired,
  businessId: string.isRequired,
  showActionIcon: bool,
  t: func.isRequired,
  removePartner: func.isRequired,
  onAddClick: func
};
PartnerTile.defaultProps = {
  showActionIcon: false,
  onAddClick: noop
};

export default connect(
  state => {
    const businessData = state.getIn(["users", "currentBusiness", "data"]);
    const business = businessData && businessData.get("businesses").first();

    return {
      businessId: business && business.get("id")
    };
  },
  {
    integratePartner: connectIntegrationPartner,
    removePartner: disconnectIntegrationPartner
  }
)(PartnerTile);
