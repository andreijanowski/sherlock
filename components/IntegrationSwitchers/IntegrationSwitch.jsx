import React from "react";
import { bool, func, string } from "prop-types";
import Switch from "react-switch";
import { Flex } from "@rebass/grid";

import { theme } from "utils/theme";
import { getThemeHexColor } from "utils/colors";
import { Option, SwitchWrapper } from "./styled";

const IntegrationSwitch = ({
  t,
  isFetching,
  isIntegrationConnected,
  onChange
}) => (
  <Flex width={1} alignItems="center">
    <SwitchWrapper mr={3}>
      <Switch
        disabled={isFetching}
        checked={isIntegrationConnected}
        onChange={onChange}
        uncheckedIcon={false}
        checkedIcon={false}
        handleDiameter={21}
        height={31}
        width={80}
        offHandleColor={getThemeHexColor(theme.colors.mischka)}
        onHandleColor={getThemeHexColor(theme.colors.navyBlue)}
        offColor={getThemeHexColor(theme.colors.background)}
        onColor={getThemeHexColor(theme.colors.background)}
        boxShadow={`0 1px 3px rgba(${theme.colors.blue}, 0.48)`}
        activeBoxShadow={`0 0 0 3px rgba(${theme.colors.blue}, 0.48)`}
      />
    </SwitchWrapper>
    <Option dark={isIntegrationConnected}>
      {isIntegrationConnected
        ? t("integrations:disconnect")
        : t("integrations:connect")}
    </Option>
  </Flex>
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
