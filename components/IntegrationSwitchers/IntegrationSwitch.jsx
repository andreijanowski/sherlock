import React from "react";
import { bool, func, string } from "prop-types";
import Switch from "react-switch";

import { theme } from "utils/theme";
import { getThemeHexColor } from "utils/colors";
import clsx from "clsx";

const IntegrationSwitch = ({
  t,
  isFetching,
  isIntegrationConnected,
  onChange
}) => (
  <div className="flex items-center">
    <div
      className={clsx(
        "mr-3 h-[29px] rounded-11 p-[3px]",
        isIntegrationConnected
          ? "bg-gradient-to-r from-primary-dark to-primary"
          : "bg-gray-800"
      )}
    >
      <Switch
        disabled={isFetching}
        checked={isIntegrationConnected}
        onChange={onChange}
        uncheckedIcon={false}
        checkedIcon={false}
        handleDiameter={16}
        height={23}
        width={55}
        offHandleColor={getThemeHexColor(theme.colors.mischka)}
        onHandleColor={getThemeHexColor(theme.colors.landingDarkBlue)}
        offColor={getThemeHexColor(theme.colors.white)}
        onColor={getThemeHexColor(theme.colors.white)}
        boxShadow={`0 1px 3px rgba(${theme.colors.blue}, 0.48)`}
        activeBoxShadow={`0 0 0 3px rgba(${theme.colors.blue}, 0.48)`}
      />
    </div>
    <p
      className={clsx(
        "text-xs font-bold",
        isIntegrationConnected && "text-primary-dark"
      )}
    >
      {isIntegrationConnected
        ? t("integrations:connected")
        : t("integrations:disconnected")}
    </p>
  </div>
);
IntegrationSwitch.propTypes = {
  isFetching: bool.isRequired,
  isIntegrationConnected: bool.isRequired,
  t: func.isRequired,
  onChange: func.isRequired
};

IntegrationSwitch.defaultValue = {
  businessId: string,
  isIntegrationConnected: false,
  isFetching: false
};

export default IntegrationSwitch;
