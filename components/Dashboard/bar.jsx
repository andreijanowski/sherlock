import { bool, func, string, shape } from "prop-types";
import { Flex } from "@rebass/grid";
import { normalizePrice } from "utils/normalizers";
import Dropdown from "./dropdown";
import { Currency, ProgressBar, ProgressTitle, Value } from "./styled";

export const Bar = ({
  barData,
  value,
  currency,
  color,
  withDropdown,
  onChange,
  t
}) => {
  const barValue = barData && barData[value];

  return (
    <Flex flexDirection="column">
      <ProgressTitle>
        <Flex alignItems="flex-end">
          <Value color={color}> {normalizePrice(barValue)}</Value>
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
          <Dropdown t={t} value={value} onChange={onChange} withoutBorder />
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
  barData: shape().isRequired,
  t: func.isRequired
};

Bar.defaultProps = {
  withDropdown: false,
  onChange: () => {}
};
