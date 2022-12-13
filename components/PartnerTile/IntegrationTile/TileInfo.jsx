import React from "react";
import { string } from "prop-types";

import {
  InternalIntegrationSwitch,
  OrchestroIntegrationSwitch
} from "../../../components";
import imagePlaceholder from "../../../static/img/avatarPlaceholder.png";
import { Badge } from "../../../components/badge";

const TileInfo = ({ data }) => {
  const {
    title,
    logoUrl,
    t,
    isIntegratedWithServices,
    isOrkestroIntegration,
    partner,
    partnerId,
    status
  } = data;
  const statusType = status?.label.split(".").slice(-1)[0];

  return (
    <div className="flex">
      <div className="h-13 w-13 rounded-2 bg-white p-2 drop-shadow-custom">
        <img src={logoUrl ?? imagePlaceholder.src} alt="logo" />
      </div>
      <div className="ml-3 h-13 w-13 flex-grow">
        <h2 className="mb-1 text-ellipsis font-bold text-base text-primary-dark line-clamp-2">
          {title}
        </h2>
        {statusType && statusType !== "integrated" ? (
          <>
            <Badge
              title={t(statusType)}
              type={statusType}
              rounded
              append={"ep:loading"}
            />
          </>
        ) : (
          <>
            {!isIntegratedWithServices && (
              <InternalIntegrationSwitch
                t={t}
                partner={partner}
                partnerId={partnerId}
              />
            )}
            {isOrkestroIntegration && <OrchestroIntegrationSwitch t={t} />}
          </>
        )}
      </div>
    </div>
  );
};

TileInfo.defaultProps = {
  title: "",
  logoUrl: ""
};

TileInfo.propTypes = {
  title: string.isRequired,
  logoUrl: string.isRequired
};

export default TileInfo;
