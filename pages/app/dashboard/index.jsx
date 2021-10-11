import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "i18n";
import { func, string } from "prop-types";
import { Flex } from "@rebass/grid";

import AppLayout from "layout/App";
import requireAuth from "lib/requireAuth";
import { PaymentChart } from "components/Dashboard//pieChart";
import ProgressBarTile from "components/Dashboard/progressBarTile";
import BarTile from "components/Dashboard/barTile";
import Sales from "components/Dashboard/sales";
import LineChart from "components/Dashboard/lineChart";
import Stream from "components/Dashboard/stream";
import EvaluationChart from "components/Dashboard/evaluationChart";
import { Tile, TileHeader, TileWrapper } from "components/Dashboard/styled";
import {
  fetchAvgTicketSize,
  fetchTodaysEarnings,
  fetchRevenueBreakdown
} from "actions/businesses";

const namespaces = ["dashboard", "app"];

const salesList = [
  { name: "Jungle Chicken", isDown: true, percentage: "4%", ordered: "33" },
  { name: "Tropical Beef", percentage: "2%", ordered: "15" },
  { name: "Zesty Prawns", percentage: "5%", ordered: "21" },
  { name: "Jungle Chicken", isDown: true, percentage: "4%", ordered: "33" },
  { name: "Tropical Beef", percentage: "2%", ordered: "15" },
  { name: "Zesty Prawns", percentage: "5%", ordered: "21" },
  { name: "Jungle Chicken", isDown: true, percentage: "4%", ordered: "33" },
  { name: "Tropical Beef", percentage: "2%", ordered: "15" },
  { name: "Zesty Prawns", percentage: "5%", ordered: "21" }
];

const Dashboard = ({
  t,
  lng,
  businessId,
  fetchTickets,
  fetchEarnings,
  fetchRevenue,
  currency
}) => (
  <AppLayout
    {...{
      mainIcon: "analytics",
      header: "Dashbord"
    }}
    t={t}
    lng={lng}
  >
    <TileWrapper width={1}>
      <Tile width={1}>
        <TileHeader isBig>{t("businessOverview")}</TileHeader>
        <Flex
          justifyContent="space-between"
          flexDirection={["column", "column", "row"]}
        >
          <Flex width={[1, 1, 1, 31 / 64]} flexDirection="column">
            <BarTile
              businessId={businessId}
              isDown={salesList.isDown}
              color="turquoise"
              fetchAction={fetchTickets}
              title="ticket"
              t={t}
              currency={currency}
            />
            <BarTile
              fetchAction={fetchEarnings}
              businessId={businessId}
              color="salmon"
              title="earnings"
              t={t}
              currency={currency}
            />
            <BarTile
              isDisabled
              fetchAction={fetchEarnings}
              businessId={businessId}
              title="earnings"
              t={t}
              color="royalblue"
              currency={currency}
            />
          </Flex>
          <Flex width={[1, 1, 1, 31 / 64]} flexDirection="column">
            <ProgressBarTile
              businessId={businessId}
              fetchAction={fetchRevenue}
              t={t}
            />
            <Tile isDisabled height={380}>
              <TileHeader>{t("paymentTypes")}</TileHeader>
              <PaymentChart />
            </Tile>
          </Flex>
        </Flex>
      </Tile>
      <Tile isDisabled width={1}>
        <TileHeader isBig>{t("todaysActivity")}</TileHeader>
        <Flex flexDirection={["column", "column", "row"]}>
          <Stream />
          <Flex width={1} flexDirection="column">
            <Sales t={t} salesList={salesList} title="Best Sales" />
          </Flex>
        </Flex>
      </Tile>
    </TileWrapper>
    <Tile isDisabled>
      <Flex flexDirection={["column", "column", "column", "row"]}>
        <LineChart title={t("consultation")} />
        <LineChart isDown title={t("totalComments")} />
        <EvaluationChart title={t("consultation")} isDown />
      </Flex>
      <Flex
        flexDirection={["column", "column", "column", "row"]}
        justifyContent="space-between"
      >
        <LineChart title="Daily Budget" isDown />
        <LineChart title="Offers & Promotions" />
        <LineChart title="Hours Worked" isDown />
        <LineChart title="Labour Cost" />
      </Flex>
    </Tile>
  </AppLayout>
);

Dashboard.getInitialPageProps = async () => ({
  namespacesRequired: namespaces
});

Dashboard.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  businessId: string.isRequired,
  fetchTickets: func.isRequired,
  fetchEarnings: func.isRequired,
  fetchRevenue: func.isRequired,
  currency: string.isRequired
};

export default compose(
  requireAuth(true),
  withTranslation(namespaces),
  connect(
    (state, { i18n }) => {
      const businessData = state.getIn(["users", "currentBusiness", "data"]);
      const business =
        businessData &&
        businessData.get("businesses") &&
        businessData.get("businesses").first();

      return {
        lng: (i18n && i18n.language) || "en",
        businessId: business && business.get("id"),
        currency: business && business.getIn(["attributes", "currency"])
      };
    },
    {
      fetchTickets: fetchAvgTicketSize,
      fetchEarnings: fetchTodaysEarnings,
      fetchRevenue: fetchRevenueBreakdown
    }
  )
)(Dashboard);
