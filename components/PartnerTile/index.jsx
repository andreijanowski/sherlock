import { useState } from "react";
import { connect } from "react-redux";
import { shape, arrayOf, oneOfType, func, string } from "prop-types";

import { connectPartner } from "actions/partners";
import { connectWholesaler } from "actions/wholesalers";

import IntegrationLink from "./IntegrationLink";
import { getIntegrationButtonLabel, getIsIntegrationPending } from "./utils";
import {
  ButtonContainer,
  Container,
  ContentWrapper,
  Image,
  IntegrationButton,
  InfoButton,
  LinkContainer
} from "./styled";

const WHOLESALER = "wholesaler";

const PartnerTile = ({
  integratePartner,
  integrateWholesaler,
  partner,
  partnerId,
  partnerRelationships,
  t
}) => {
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
          <IntegrationButton
            styleName={
              !isIntegrationNotRequested || isPending ? "signUp" : "navyBlue"
            }
            onClick={requestIntegration}
          >
            {integrationButtonLabel}
          </IntegrationButton>
          <InfoButton styleName="navyBlue">
            <IntegrationLink partner={partner}>
              {t("app:manageIntegrations.moreInfo")}
            </IntegrationLink>
          </InfoButton>
        </ButtonContainer>
      </ContentWrapper>
    </Container>
  );
};

PartnerTile.propTypes = {
  integratePartner: func.isRequired,
  integrateWholesaler: func.isRequired,
  partner: oneOfType([arrayOf(), shape()]).isRequired,
  partnerId: string.isRequired,
  partnerRelationships: oneOfType([arrayOf(), shape({})]).isRequired,
  t: func.isRequired
};

PartnerTile.defaultValue = {
  partner: null
};

export default connect(
  null,
  {
    integratePartner: connectPartner,
    integrateWholesaler: connectWholesaler
  }
)(PartnerTile);
