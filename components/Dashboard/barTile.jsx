import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Flex } from "@rebass/grid";
import { Bar } from "components/Dashboard/bar";
import { bool, func, string, shape } from "prop-types";
import Loader from "./loader";
import Arrow from "./arrow";
import { Percentage, Tile, TileHeader } from "./styled";

const BarTile = ({
  businessId,
  color,
  fetchAction,
  title,
  dashboard,
  isFetching,
  isDisabled,
  t
}) => {
  useEffect(() => {
    fetchAction(businessId);
  }, [businessId, fetchAction]);

  const MAX_PERCENTAGE = 1000000;
  const HUNDRET_PERCENT = 100;

  const [dropDownValue, setDropdownValue] = useState("yesterday");

  const barData =
    dashboard && dashboard.get(`${title}`) && dashboard.get(`${title}`).toJS();

  const percentage =
    barData &&
    barData.today &&
    (barData.today / barData[dropDownValue]) * HUNDRET_PERCENT - 100;

  const isDown = percentage < 0;

  return (
    <Tile isDisabled={isDisabled} width={1} height="200" isSmall>
      {isFetching ? (
        <Loader />
      ) : (
        <>
          <Flex mb={10} justifyContent="space-between">
            <TileHeader>{t(`${title}`)}</TileHeader>
            <Flex justifyContent="space-between">
              {(!Number.isNaN(percentage) && percentage < MAX_PERCENTAGE) ||
                (percentage === 0 && (
                  <>
                    <Arrow isDown={isDown} />
                    <Percentage isDown={isDown} ml={1}>
                      {Math.round(percentage)} %
                    </Percentage>
                  </>
                ))}
            </Flex>
          </Flex>
          <Bar barData={barData} value="today" currency="CHF" color={color} />
          <Bar
            barData={barData}
            value={dropDownValue}
            currency="CHF"
            color="silver"
            withDropdown
            onChange={setDropdownValue}
            t={t}
          />
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
  isDisabled: bool
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
