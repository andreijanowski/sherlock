import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Flex } from "@rebass/grid";
import { Bar } from "components/Dashboard/bar";
import { bool, func, string, shape } from "prop-types";
import { PulseLoader } from "react-spinners";
import Arrow from "./arrow";
import { Percentage, Tile, TileHeader } from "./styled";

const BarTile = ({
  businessId,
  color,
  isDown,
  fetchAction,
  title,
  dashboard,
  isFetching
}) => {
  useEffect(() => {
    fetchAction(businessId);
  }, [businessId, fetchAction]);

  const [dropDownValue, setDropdownValue] = useState("yesterday");

  const barData =
    dashboard && dashboard.get(`${title}`) && dashboard.get(`${title}`).toJS();

  const percentage = barData ? (4730 / barData[dropDownValue]) * 100 - 100 : 0;

  console.log(percentage);

  return (
    <Tile width={1} height="200" isSmall>
      {isFetching ? (
        <Flex justifyContent="center">
          <PulseLoader />
        </Flex>
      ) : (
        <>
          <Flex mb={10} justifyContent="space-between">
            <TileHeader>{title}</TileHeader>
            <Flex justifyContent="space-between">
              <Arrow isDown={isDown} />
              <Percentage isDown={isDown} ml={1}>
                2%
              </Percentage>
            </Flex>
          </Flex>
          <Bar values={barData} value="today" currency="CHF" color={color} />
          <Bar
            barData={barData}
            value={dropDownValue}
            currency="CHF"
            color="silver"
            withDropdown
            onChange={setDropdownValue}
          />
        </>
      )}
    </Tile>
  );
};

BarTile.propTypes = {
  color: string.isRequired,
  isDown: bool,
  businessId: string.isRequired,
  fetchAction: func.isRequired,
  title: string.isRequired,
  dashboard: shape().isRequired,
  isFetching: bool.isRequired
};
BarTile.defaultProps = { isDown: false };

export default connect(state => {
  const dashboard = state.getIn(["dashboard", "data"]);
  const isFetching = state.getIn(["dashboard", "isFetching"]);
  const dashboardData = dashboard && dashboard.get("dashboard");

  return {
    dashboard: dashboardData,
    isFetching
  };
})(BarTile);
