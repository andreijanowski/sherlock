import React from "react";
import { arrayOf, bool, func, oneOfType, shape, string } from "prop-types";
import { connect } from "react-redux";

import {
  isIntegrationConnectedOrPending,
  getIntegrationColoredStatus,
  getServiceIntegrationMeta
} from "../../../utils/integrations";
import { createPartnerClickEvent } from "actions/partners";
import PartnerTileButtons from "../PartnerTileButtons";
import TileInfo from "./TileInfo";
import clsx from "clsx";

const IntegrationTile = ({
  partner,
  partnerId,
  t,
  isOrkestroConnected,
  handleTrackClickEvent
}) => {
  const title = partner.get("name");
  const logoUrl = partner.getIn(["logo", "url"]);
  const { isOrkestroIntegration, isIntegratedWithServices } =
    getServiceIntegrationMeta(partner);

  const isConnectedOrPending = isIntegrationConnectedOrPending(
    partner,
    isOrkestroConnected
  );

  const status = getIntegrationColoredStatus(partner, isOrkestroConnected);
  const statusType = !!(status?.label.split(".").slice(-1)[0] === "success");

  const trackClickEvent = eventType => {
    handleTrackClickEvent(partnerId, { event_type: eventType });
  };

  return (
    <div
      className={clsx(
        "relative flex min-h-45 min-w-full flex-col justify-between rounded-4 border border-gray-300 bg-white p-7 shadow-card",
        isConnectedOrPending && !statusType && "border-2 border-primary"
      )}
    >
      <TileInfo
        data={{
          title,
          logoUrl,
          t,
          isIntegratedWithServices,
          isOrkestroIntegration,
          partner,
          partnerId,
          status
        }}
      />
      <PartnerTileButtons
        t={t}
        partner={partner}
        isIntegration
        trackClickEvent={trackClickEvent}
      />
    </div>
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
