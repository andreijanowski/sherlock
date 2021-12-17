import { string } from "prop-types";
import { Flex } from "@rebass/grid";
import { normalizePrice } from "utils/normalizers";
import {
  BarContainer,
  Currency,
  ProgressBar,
  ProgressTitle,
  Value
} from "./styled";

export const Bar = ({ value, currency, color }) => (
  <BarContainer flexDirection="column">
    <ProgressTitle>
      <Flex alignItems="flex-end">
        <Value color={color}>{normalizePrice(value)}</Value>
        <Currency color={color}>{currency}</Currency>
      </Flex>
    </ProgressTitle>
    <Flex
      width={1}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <ProgressBar color={color} />
    </Flex>
  </BarContainer>
);

Bar.propTypes = {
  value: string.isRequired,
  currency: string.isRequired,
  color: string.isRequired
};
