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
import { fetchAvgTicketSize, fetchTodaysEarnings } from "actions/businesses";

const namespaces = ["dashboardView", "app"];

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

const Dashboard = ({ t, lng, businessId, fetchTickets, fetchEarnings }) => (
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
        <TileHeader isBig>{t("dashboard:businessOverview")}</TileHeader>
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
            />
            <BarTile
              fetchAction={fetchEarnings}
              businessId={businessId}
              color="salmon"
              title="earnings"
            />
            {/*  <BarTile color="royalblue" /> */}
          </Flex>
          <Flex width={[1, 1, 1, 31 / 64]} flexDirection="column">
            <ProgressBarTile />
            <Tile height={424}>
              <TileHeader>{t("dashboard:paymentType")}</TileHeader>
              <PaymentChart />
            </Tile>
          </Flex>
        </Flex>
      </Tile>
      <Tile width={1}>
        <TileHeader isBig>{t("dashboard:todaysActivity")}</TileHeader>
        <Flex flexDirection={["column", "column", "row"]}>
          <Stream />
          <Flex width={1} flexDirection="column">
            <Sales salesList={salesList} title="Best Sales" />
          </Flex>
        </Flex>
      </Tile>
    </TileWrapper>
    <Tile>
      <Flex flexDirection={["column", "column", "column", "row"]}>
        <LineChart title={t("dashboard:consultation")} />
        <LineChart isDown title={t("dashboard:totalComments")} />
        <EvaluationChart title={t("dashboard:consultation")} isDown />
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
  fetchEarnings: func.isRequired
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
        businessId: business && business.get("id")
      };
    },
    {
      fetchTickets: fetchAvgTicketSize,
      fetchEarnings: fetchTodaysEarnings
    }
  )
)(Dashboard);
