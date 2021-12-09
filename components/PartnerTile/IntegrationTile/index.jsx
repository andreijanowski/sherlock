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
import {
  Container,
  Image,
  ImageContainer,
  IntegrationFullyConnectedCheckmark,
  IntegrationStatus,
  Name
} from "./styled";
import PartnerTileButtons from "../PartnerTileButtons";

const IntegrationTile = ({ partner, partnerId, t, isOrkestroConnected }) => {
  const name = partner.get("name");
  const {
    isOrkestroIntegration,
    isIntegratedWithServices
  } = getServiceIntegrationMeta(partner);

  const { isIntegrated } = getIntegrationStates(partner, isOrkestroConnected);

  const isConnectedOrPending = isIntegrationConnectedOrPending(
    partner,
    isOrkestroConnected
  );

  const status = getIntegrationColoredStatus(partner, isOrkestroConnected);

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
      />
    </Container>
  );
};

IntegrationTile.propTypes = {
  partner: oneOfType([arrayOf(), shape()]).isRequired,
  partnerId: string.isRequired,
  t: func.isRequired,
  isOrkestroConnected: bool.isRequired
};

export default connect(state => {
  const isOrkestroConnected = state.getIn([
    "integrations",
    "isConnectedToOrkestro"
  ]);
  return {
    isOrkestroConnected
  };
})(IntegrationTile);
