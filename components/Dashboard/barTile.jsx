import React, { useEffect } from "react";
import { Flex } from "@rebass/grid";
import { Bar } from "components/Dashboard/bar";
import { bool, func, string } from "prop-types";
import Arrow from "./arrow";
import { getRandomInt } from "./utils";
import { Percentage, Tile, TileHeader } from "./styled";

const BarTile = ({ businessId, color, isDown, fetchAction }) => {
  useEffect(() => {
    fetchAction();
  }, [businessId, fetchAction]);

  return (
    <Tile width={1} height="200" isSmall>
      <Flex mb={10} justifyContent="space-between">
        <TileHeader>Data 2</TileHeader>
        <Flex justifyContent="space-between">
          <Arrow isDown={isDown} />
          <Percentage isDown={isDown} ml={1}>
            2%
          </Percentage>
        </Flex>
      </Flex>
      <Bar value={getRandomInt(1000, 2000)} currency="CHF" color={color} />
      <Bar
        value={getRandomInt(1000, 2000)}
        currency="CHF"
        color="silver"
        withDropdown
      />
    </Tile>
  );
};

BarTile.propTypes = {
  color: string.isRequired,
  isDown: bool,
  businessId: string.isRequired,
  fetchAction: func.isRequired
};
BarTile.defaultProps = { isDown: false };

export default BarTile;
