import React from "react";
import { Flex, Box } from "@rebass/grid";
import { bool, func, shape, number } from "prop-types";

import {
  ItemNumber,
  Percentage,
  SalesItemContainer,
  TimesOrdered
} from "./styled";
import Arrow from "./arrow";
import { getSalesItemData } from "./utils";

const SalesItem = ({ t, isWorst, item, index }) => {
  const { name, orderedTimes, isDown, percentage } = getSalesItemData(item);
  return (
    <SalesItemContainer as="li">
      <Flex alignItems="center">
        <ItemNumber isWorst={isWorst}>{`${index + 1}.`}</ItemNumber>
        <Box flex="auto" mx={2} flexWrap="wrap">
          {name}
        </Box>
      </Flex>
      <Flex alignItems="flex-end" flexDirection="column">
        <Percentage isDown={isDown}>
          <Arrow isDown={isDown} /> {percentage} %
        </Percentage>
        <TimesOrdered>
          {t("orderedTimes", { count: orderedTimes })}
        </TimesOrdered>
      </Flex>
    </SalesItemContainer>
  );
};

SalesItem.propTypes = {
  isWorst: bool.isRequired,
  t: func.isRequired,
  item: shape.isRequired,
  index: number.isRequired
};

export default SalesItem;
