import { bool, func, shape, string } from "prop-types";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Flex } from "@rebass/grid";

import Dropdown from "./dropdown";
import Loader from "./loader";
import ProgressBar from "./progressBar";
import { Tile } from "./styled";

const SAMPLE_DATA = [
  { color: "salmon", title: "deliveryRevenue" },
  { color: "blue", title: "takeawayRevenue" },
  { color: "royalblue", title: "onSiteRevenue" },
  { color: "turquoise", title: "otherRevenue" }
];
const HUNDRET_PERCENT = 100;

const ProgressBarTile = ({
  fetchAction,
  businessId,
  dashboard,
  t,
  isFetching
}) => {
  const [dropdownValue, setDropdonwValue] = useState("sumLastMonth");
  useEffect(() => {
    fetchAction(businessId);
  }, [fetchAction, businessId]);

  const barData =
    dashboard &&
    dashboard.get(`revenueBreakdown`) &&
    dashboard.get(`revenueBreakdown`).toJS();

  const countRevenuePercentage = (title, data, value) =>
    Math.round(
      data &&
        data[title] &&
        (data[title][value] / data.revenue[value]) * HUNDRET_PERCENT
    );

  return (
    <Tile height="280" isSmall>
      {isFetching ? (
        <Loader />
      ) : (
        <>
          <Flex justifyContent="space-between" alignItems="center">
            <h4>{t("revenueBreakdown")}</h4>
            <Dropdown
              t={t}
              isRevenue
              value={dropdownValue}
              onChange={setDropdonwValue}
            />
          </Flex>
          {SAMPLE_DATA.map(({ color, title }) => (
            <ProgressBar
              color={color}
              withPercentage
              title={t(`${title}`)}
              width={
                !Number.isNaN(
                  countRevenuePercentage(title, barData, dropdownValue)
                )
                  ? countRevenuePercentage(title, barData, dropdownValue)
                  : 0
              }
            />
          ))}
        </>
      )}
    </Tile>
  );
};

ProgressBarTile.propTypes = {
  fetchAction: func.isRequired,
  businessId: string.isRequired,
  dashboard: shape().isRequired,
  t: func.isRequired,
  isFetching: bool.isRequired
};

export default connect(state => {
  const dashboard = state.getIn(["dashboard", "data"]);
  const isFetching = state.getIn(["dashboard", "isFetching"]);
  const dashboardData = dashboard && dashboard.get("dashboard");

  return {
    dashboard: dashboardData,
    isFetching
  };
})(ProgressBarTile);
