import React from "react";
import { arrayOf, bool, func, oneOfType, shape, string } from "prop-types";
import { Box, Flex } from "@rebass/grid";
import { connect } from "react-redux";

import {
  InternalIntegrationSwitch,
  OrchestroIntegrationSwitch
} from "components";
import {
  isIntegrationConnectedOrPending,
  getIntegrationColoredStatus,
  getIntegrationStates,
  getServiceIntegrationMeta
} from "utils/integrations";
import { createPartnerClickEvent } from "actions/partners";
import PartnerTileButtons from "../PartnerTileButtons";
import {
  Container,
  Image,
  ImageContainer,
  IntegrationFullyConnectedCheckmark,
  IntegrationStatus,
  Name
} from "./styled";

const IntegrationTile = ({
  partner,
  partnerId,
  t,
  isOrkestroConnected,
  handleTrackClickEvent
}) => {
  const name = partner.get("name");
  const { isOrkestroIntegration, isIntegratedWithServices } =
    getServiceIntegrationMeta(partner);

  const { isIntegrated } = getIntegrationStates(partner, isOrkestroConnected);

  const isConnectedOrPending = isIntegrationConnectedOrPending(
    partner,
    isOrkestroConnected
  );

  const status = getIntegrationColoredStatus(partner, isOrkestroConnected);

  const trackClickEvent = eventType => {
    handleTrackClickEvent(partnerId, { event_type: eventType });
  };

  return (
    <Container isConnectedOrPending={isConnectedOrPending}>
      <Flex mb={3}>
        <Box as={ImageContainer} mr={2}>
          <Image src={partner.getIn(["logo", "url"])} />
        </Box>
        <Name>{name}</Name>
      </Flex>
      {status && (
        <IntegrationStatus color={status.color}>
          {t(status.label)}
        </IntegrationStatus>
      )}
      {isIntegrated && <IntegrationFullyConnectedCheckmark />}
      <Box width={1} mb="24px" flex="auto">
        {!isIntegratedWithServices && (
          <InternalIntegrationSwitch
            t={t}
            partner={partner}
            partnerId={partnerId}
          />
        )}
        {isOrkestroIntegration && <OrchestroIntegrationSwitch t={t} />}
      </Box>
      <PartnerTileButtons
        t={t}
        partner={partner}
        isIntegration
        linkLabel={t("app:manageIntegrations.goToWeb")}
        trackClickEvent={trackClickEvent}
      />
    </Container>
  );
};

IntegrationTile.propTypes = {
  partner: oneOfType([arrayOf(), shape()]).isRequired,
  partnerId: string.isRequired,
  t: func.isRequired,
  isOrkestroConnected: bool.isRequired,
  handleTrackClickEvent: func.isRequired
};

export default connect(
  state => {
    const isOrkestroConnected = state.getIn([
      "integrations",
      "isConnectedToOrkestro"
    ]);
    return {
      isOrkestroConnected
    };
  },
  {
    handleTrackClickEvent: createPartnerClickEvent
  }
)(IntegrationTile);
