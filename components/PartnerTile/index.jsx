import { noop } from "lodash";
import { useState } from "react";
import { connect } from "react-redux";
import { shape, arrayOf, oneOfType, func, string, bool } from "prop-types";

import { connectPartner } from "actions/partners";
import { connectWholesaler } from "actions/wholesalers";

import { OrchestroIntegrationSwitch } from "components";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import IntegrationLink from "./IntegrationLink";
import { getIntegrationButtonLabel, getIsIntegrationPending } from "./utils";
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
import UberIntegrationSwitch from "../OrchestroIntegrationSwitch/UberIntegrationSwitch";

const PartnerTile = ({
  added,
  integratePartner,
  integrateWholesaler,
  partner,
  partnerId,
  partnerRelationships,
  showActionIcon,
  t,
  onAddClick
}) => {
  const isOrkestroIntegration = partner.get("name") === "Orkestro";
  const isUberIntegration = partner.get("name") === "Uber Eats";
  const isIntegratedWithServices = isOrkestroIntegration || isUberIntegration;
  const WHOLESALER = "wholesaler";

  const currentUserId = window.localStorage.getItem("currentUserId");
  const isIntegrationPending = getIsIntegrationPending(
    partnerRelationships,
    currentUserId
  );

  const isIntegrationNotRequested = partner.get("active");
  const isIntegrated = !partner.get("active");

  const [isPending, setIsPending] = useState(isIntegrationPending);
  const integrationButtonLabel = getIntegrationButtonLabel(
    isIntegrationNotRequested,
    isPending,
    isIntegrated,
    t
  );
  const partnerCategory = partner.get("category");
  const isPartnerWholesaler = partnerCategory === WHOLESALER;

  const iconAddedClick = () => {
    onAddClick({ added, partnerId });
  };

  const requestIntegration = () => {
    if (isIntegrationNotRequested) setIsPending(true);
    if (isPartnerWholesaler) {
      integrateWholesaler(partnerId);
    } else {
      integratePartner(partnerId);
    }
  };

  return (
    <Container mb={3} width={["100%"]} alignItems="center">
      {showActionIcon && (
        <IconAdded icon={added ? faMinus : faPlus} onClick={iconAddedClick} />
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
                  !isIntegrationNotRequested || isPending
                    ? "orange"
                    : "navyBlue"
                }
                onClick={requestIntegration}
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
  added: bool,
  integratePartner: func.isRequired,
  integrateWholesaler: func.isRequired,
  partner: oneOfType([arrayOf(), shape()]).isRequired,
  partnerId: string.isRequired,
  partnerRelationships: oneOfType([arrayOf(), shape({})]).isRequired,
  showActionIcon: bool,
  t: func.isRequired,
  onAddClick: func
};
PartnerTile.defaultProps = {
  added: false,
  showActionIcon: false,
  onAddClick: noop
};

export default connect(
  null,
  {
    integratePartner: connectPartner,
    integrateWholesaler: connectWholesaler
  }
)(PartnerTile);
