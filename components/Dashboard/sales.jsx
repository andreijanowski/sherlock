import React, { useRef } from "react";
import { Flex } from "@rebass/grid";
import { bool, shape, string } from "prop-types";

import { scrollToNextItem } from "./utils";
import { ChevronDown } from "../Icons";

import {
  SalesItem,
  ItemNumber,
  Tile,
  TileHeader,
  Spacer,
  SalesList,
  Percentage,
  TimesOrdered,
  ChevronWrapper
} from "./styled";
import Dropdown from "./dropdown";
import Arrow from "./arrow";

const Sales = ({ isWorst, title, salesList }) => {
  const myRef = useRef(null);
  return (
    <Tile height="645" width={1}>
      <Flex alignItems="center" justifyContent="space-between">
        <TileHeader>{title}</TileHeader>
        <Dropdown withToday />
      </Flex>
      <Spacer />
      <SalesList ref={myRef}>
        {salesList.map((sale, index) => (
          <SalesItem>
            <Flex alignItems="center">
              <ItemNumber isWorst={isWorst}>{index + 1}. </ItemNumber>
              <Flex ml={2} flexWrap="wrap" width="10%">
                {sale.name}
              </Flex>
            </Flex>
            <Flex alignItems="flex-end" flexDirection="column">
              <Percentage isDown={sale.isDown}>
                <Arrow isDown={sale.isDown} /> {sale.percentage}
              </Percentage>
              <TimesOrdered>Ordered {sale.ordered} times</TimesOrdered>
            </Flex>
          </SalesItem>
        ))}
        <ChevronWrapper
          onClick={() => scrollToNextItem(myRef)}
          alignItems="center"
          justifyContent="center"
          width={1}
        >
          <ChevronDown />
        </ChevronWrapper>
      </SalesList>
    </Tile>
  );
};

Sales.propTypes = {
  isWorst: bool,
  title: string.isRequired,
  salesList: shape({
    percentage: string.isRequired,
    ordered: string.isRequired,
    name: string.isRequired
  }).isRequired
};

Sales.defaultProps = {
  isWorst: false
};

export default Sales;
