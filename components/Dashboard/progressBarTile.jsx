import { bool, func, shape, string } from "prop-types";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Flex } from "@rebass/grid";

import Dropdown from "./dropdown";
import Loader from "./loader";
import ProgressBar from "./progressBar";
import { Tile } from "./styled";
import { getComparedDataKeys, getPercentageStats } from "./utils";

const SAMPLE_DATA = [
  { color: "salmon", title: "deliveryRevenue" },
  { color: "blue", title: "takeawayRevenue" },
  { color: "royalblue", title: "onSiteRevenue" },
  { color: "turquoise", title: "otherRevenue" }
];

const ProgressBarTile = ({
  fetchAction,
  businessId,
  dashboard,
  t,
  isFetching
}) => {
  const [dropdownValue, setDropdonwValue] = useState("month");

  useEffect(() => {
    if (businessId) {
      fetchAction(businessId);
    }
  }, [fetchAction, businessId]);

  const comparedKeys = getComparedDataKeys(dropdownValue);

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
              isCentered
              value={dropdownValue}
              onChange={setDropdonwValue}
            />
          </Flex>
          {SAMPLE_DATA.map(({ color, title }) => {
            const currentValue =
              dashboard &&
              dashboard.getIn([
                "revenueBreakdown",
                title,
                comparedKeys.current
              ]);
            const previousValue =
              dashboard &&
              dashboard.getIn([
                "revenueBreakdown",
                title,
                comparedKeys.previous
              ]);

            const { percentage } = getPercentageStats(
              currentValue,
              previousValue
            );

            return (
              <ProgressBar
                color={color}
                withPercentage
                title={t(title)}
                width={percentage}
              />
            );
          })}
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
