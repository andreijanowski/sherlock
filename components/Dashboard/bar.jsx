import { bool, string } from "prop-types";
import React from "react";
import { Flex } from "@rebass/grid";
import { Currency, ProgressBar, ProgressTitle, Value } from "./styled";
import Dropdown from "./dropdown";

export const Bar = ({ value, currency, color, withDropdown }) => (
  <Flex flexDirection="column">
    <ProgressTitle>
      <Flex alignItems="flex-end">
        <Value color={color}>{value}</Value>
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
      {withDropdown ? (
        <Dropdown withoutBorder />
      ) : (
        <Value isSmall color={color}>
          today
        </Value>
      )}
    </Flex>
  </Flex>
);

Bar.propTypes = {
  value: string.isRequired,
  currency: string.isRequired,
  color: string.isRequired,
  withDropdown: bool
};

Bar.defaultProps = {
  withDropdown: false
};
