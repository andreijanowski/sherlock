import { bool, func, string, shape } from "prop-types";
import React from "react";
import { Flex } from "@rebass/grid";
import { Currency, ProgressBar, ProgressTitle, Value } from "./styled";
import Dropdown from "./dropdown";

export const Bar = ({
  barData,
  value,
  currency,
  color,
  withDropdown,
  onChange
}) => {
  const barValue = barData && barData[value] ? barData[value] : 0;
  return (
    <Flex flexDirection="column">
      <ProgressTitle>
        <Flex alignItems="flex-end">
          <Value color={color}> {barValue}</Value>
          <Currency color={color}>{currency}</Currency>
        </Flex>
      </ProgressTitle>
      <Flex
        mb={14}
        width={1}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <ProgressBar color={color} width={60} />
        {withDropdown && value.length > 0 ? (
          <Dropdown value={value} onChange={onChange} withoutBorder />
        ) : (
          <Value isSmall color={color}>
            Today
          </Value>
        )}
      </Flex>
    </Flex>
  );
};

Bar.propTypes = {
  value: string.isRequired,
  currency: string.isRequired,
  color: string.isRequired,
  withDropdown: bool,
  onChange: func,
  barData: shape().isRequired
};

Bar.defaultProps = {
  withDropdown: false,
  onChange: () => {}
};
