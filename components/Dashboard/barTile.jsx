import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Flex, Box } from "@rebass/grid";
import { Bar } from "components/Dashboard/bar";
import { bool, func, string, shape } from "prop-types";
import Loader from "./loader";
import Arrow from "./arrow";
import Dropdown from "./dropdown";
import { Percentage, Tile, TileHeader } from "./styled";
import { getComparedDataKeys, getPercentageStats } from "./utils";

const BarTile = ({
  businessId,
  color,
  fetchAction,
  title,
  dashboard,
  isFetching,
  isDisabled,
  t,
  currency
}) => {
  useEffect(() => {
    if (businessId) {
      fetchAction(businessId);
    }
  }, [businessId, fetchAction]);

  const [dropdownValue, setDropdownValue] = useState("day");

  const comparedKeys = getComparedDataKeys(dropdownValue);

  const currentValue =
    dashboard && dashboard.getIn([title, comparedKeys.current]);
  const previousValue =
    dashboard && dashboard.getIn([title, comparedKeys.previous]);

  const { isDown, percentage } = getPercentageStats(
    currentValue,
    previousValue
  );

  return (
    <Tile isDisabled={isDisabled} width={1} height="215">
      {isFetching ? (
        <Loader />
      ) : (
        <>
          <Box mb={16}>
            <TileHeader>{t(title)}</TileHeader>
          </Box>
          <Flex justifyContent="space-between" mb={10}>
            <Dropdown t={t} value={dropdownValue} onChange={setDropdownValue} />
            <Flex justifyContent="space-between" mr={2}>
              <Arrow isDown={isDown} />
              <Percentage isDown={isDown} ml={1}>
                {Math.round(percentage)} %
              </Percentage>
            </Flex>
          </Flex>
          <Bar value={currentValue} currency={currency} color={color} />
          <Bar value={previousValue} currency={currency} color="silver" />
        </>
      )}
    </Tile>
  );
};

BarTile.propTypes = {
  color: string.isRequired,
  businessId: string.isRequired,
  fetchAction: func.isRequired,
  title: string.isRequired,
  dashboard: shape().isRequired,
  isFetching: bool.isRequired,
  t: func.isRequired,
  isDisabled: bool,
  currency: string.isRequired
};

BarTile.defaultProps = {
  isDisabled: false
};

export default connect(state => {
  const dashboard = state.getIn(["dashboard", "data"]);
  const isFetching = state.getIn(["dashboard", "isFetching"]);
  const dashboardData = dashboard && dashboard.get("dashboard");

  return {
    dashboard: dashboardData,
    isFetching
  };
})(BarTile);
