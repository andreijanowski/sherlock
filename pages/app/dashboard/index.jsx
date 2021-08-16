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
import { Tile, TileHeader } from "components/Dashboard/styled";

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

const Dashboard = ({ t, lng }) => (
  <AppLayout
    {...{
      mainIcon: "analytics",
      header: "Dashbord"
    }}
    t={t}
    lng={lng}
  >
    <Flex flexDirection={["column", "column", "row"]} width={1}>
      <Tile width={[1, 1 / 2, 1 / 2]}>
        <TileHeader isBig>Business overview</TileHeader>{" "}
        <Flex flexDirection="row">
          <Flex width={[1, 1 / 2, 1 / 2]} flexDirection="column">
            <BarTile isDown={salesList.isDown} withDroprown color="turquoise" />
            <BarTile color="salmon" />
            <BarTile color="royalblue" />
          </Flex>
          <Flex width={[1, 1 / 2, 1 / 2]} flexDirection="column">
            <ProgressBarTile />
            <Tile height={424}>
              <TileHeader>Payment chart</TileHeader>
              <PaymentChart />
            </Tile>
          </Flex>
        </Flex>
      </Tile>
      <Tile width={[1, 1 / 2, 1 / 2]}>
        <TileHeader isBig>Todays activity</TileHeader>
        <Flex>
          <Stream />
          <Flex width={1} flexDirection="column">
            <Sales salesList={salesList} title="Best Sales" />
            <Sales isWorst salesList={salesList} title="Worst Sales" />
          </Flex>
        </Flex>
      </Tile>
    </Flex>
    <Tile>
      <Flex justifyContent="space-between">
        <LineChart title="Consultation" />
        <LineChart isDown title="total number of comments" />
        <EvaluationChart title="Consultation" isDown />
      </Flex>
      <Flex justifyContent="space-between">
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
  lng: string.isRequired
};

export default compose(
  requireAuth(true),
  withTranslation(namespaces),
  connect((state, { i18n }) => ({
    lng: (i18n && i18n.language) || "en"
  }))
)(Dashboard);
