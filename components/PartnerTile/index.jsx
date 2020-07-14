import { useState } from "react";
import { connect } from "react-redux";
import { shape, arrayOf, oneOfType, func, string } from "prop-types";

import { connectPartner } from "actions/partners";

import IntegrationLink from "./IntegrationLink";
import { getIntegrationButtonLabel, getIsIntegrationPending } from "./utils";
import {
  Container,
  ContentWrapper,
  Image,
  IntegrationButton,
  InfoButton
} from "./styled";

const PartnerTile = ({
  integratePartner,
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

  const requestIntegration = () => {
    if (isIntegrationNotRequested) setIsPending(true);

    integratePartner(partnerId);
  };

  return (
    <Container
      mb={3}
      width={["100%", null, null, null, null]}
      alignItems="center"
    >
      <Image src={partner.getIn(["logo", "url"])} />
      <ContentWrapper
        alignItems="center"
        justifyContent="space-between"
        p={[3, 4]}
        flex={1}
      >
        <IntegrationLink partner={partner}>
          {partner.get("name")}
        </IntegrationLink>
        <div>
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
        </div>
      </ContentWrapper>
    </Container>
  );
};

PartnerTile.propTypes = {
  integratePartner: func.isRequired,
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
  { integratePartner: connectPartner }
)(PartnerTile);
