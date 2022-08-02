import React, { useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "i18n";
import { func, string } from "prop-types";
import { Flex } from "@rebass/grid";

import PartooIframe from "components/PartooIframe";
import {
  Button,
  ButtonWithImageIconWrapper,
  ButtonWithImageText
} from "components";
import { PresenceManagement, Reviews, Restaurant } from "components/Icons";
import AppLayout from "layout/App";
import requireAuth from "lib/requireAuth";
import { PaymentChart } from "components/Dashboard//pieChart";
import ProgressBarTile from "components/Dashboard/progressBarTile";
import BarTile from "components/Dashboard/barTile";
import Sales from "components/Dashboard/sales";
import LineChart from "components/Dashboard/lineChart";
import Stream from "components/Dashboard/stream";
import EvaluationChart from "components/Dashboard/evaluationChart";

import {
  Tile,
  TileHeader,
  TileWrapper,
  ButtonsWrapper,
  IconWrapper
} from "components/Dashboard/styled";
import {
  fetchAvgTicketSize as fetchAvgTicketSizeAction,
  fetchTodaysEarnings as fetchTodaysEarningsAction,
  fetchRevenueBreakdown as fetchRevenueBreakdownAction,
  fetchBestSales as fetchBestSalesAction,
  fetchWorstSales as fetchWorstSalesAction
} from "actions/businesses";
import { selectCurrentBusiness } from "selectors/business";

const namespaces = ["dashboard", "app", "forms", "lefood"];
const tabs = [
  { name: "businessOperations", icon: <Restaurant /> },
  { name: "reviews", icon: <Reviews /> },
  { name: "onlinePresence", icon: <PresenceManagement /> }
];

const Dashboard = ({
  t,
  lng,
  businessId,
  fetchAvgTicketSize,
  fetchTodaysEarnings,
  fetchRevenueBreakdown,
  fetchBestSales,
  fetchWorstSales,
  currency
}) => {
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  const switchCurrentTab = tabIndex => setCurrentTab(tabIndex);

  return (
    <AppLayout
      {...{
        mainIcon: "dashboard",
        header: "Dashboard"
      }}
      t={t}
      lng={lng}
    >
      <ButtonsWrapper>
        {tabs.map(tab => (
          <Button
            key={tab.name}
            as="a"
            styleName="withImage"
            active={currentTab.name === tab.name}
            onClick={() => switchCurrentTab(tab)}
            margin="10px 32px 0 0"
          >
            <ButtonWithImageIconWrapper>
              <IconWrapper active={currentTab.name === tab.name}>
                {tab.icon}
              </IconWrapper>
            </ButtonWithImageIconWrapper>
            <ButtonWithImageText>{t(tab.name)}</ButtonWithImageText>
          </Button>
        ))}
      </ButtonsWrapper>
      {currentTab.name === tabs[0].name && (
        <>
          <TileWrapper width={1}>
            <Tile width={1}>
              <TileHeader isBig>{t("businessOverview")}</TileHeader>
              <Flex
                justifyContent="space-between"
                flexDirection={["column", "column", "column", "row"]}
              >
                <Flex width={[1, 1, 1, 31 / 64]} flexDirection="column">
                  <BarTile
                    businessId={businessId}
                    color="turquoise"
                    fetchAction={fetchAvgTicketSize}
                    title="ticket"
                    t={t}
                    currency={currency}
                  />
                  <BarTile
                    fetchAction={fetchTodaysEarnings}
                    businessId={businessId}
                    color="salmon"
                    title="earnings"
                    t={t}
                    currency={currency}
                  />
                  <BarTile
                    isDisabled
                    fetchAction={fetchTodaysEarnings}
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
                    fetchAction={fetchRevenueBreakdown}
                    t={t}
                  />
                  <Tile isDisabled height={350}>
                    <TileHeader>{t("paymentTypes")}</TileHeader>
                    <PaymentChart />
                  </Tile>
                </Flex>
              </Flex>
            </Tile>
            <Tile width={1}>
              <TileHeader isBig>{t("todaysActivity")}</TileHeader>
              <Flex flexDirection={["column", "column", "column", "row"]}>
                <Stream t={t} />
                <Flex width={1} flexDirection="column">
                  <Sales t={t} title="bestSales" fetchAction={fetchBestSales} />
                  <Sales
                    t={t}
                    title="worstSales"
                    isWorst
                    fetchAction={fetchWorstSales}
                  />
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
        </>
      )}
      {currentTab.name === tabs[1].name && (
        <PartooIframe startPage="reviewAnalytics" />
      )}
      {currentTab.name === tabs[2].name && (
        <PartooIframe startPage="analytics" />
      )}
    </AppLayout>
  );
};

Dashboard.getInitialPageProps = async () => ({
  namespacesRequired: namespaces
});

Dashboard.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  businessId: string,
  fetchAvgTicketSize: func.isRequired,
  fetchTodaysEarnings: func.isRequired,
  fetchRevenueBreakdown: func.isRequired,
  fetchBestSales: func.isRequired,
  fetchWorstSales: func.isRequired,
  currency: string
};

Dashboard.defaultProps = {
  businessId: "",
  currency: ""
};

const mapState = (state, { i18n }) => {
  const business = selectCurrentBusiness(state);
  return {
    lng: (i18n && i18n.language) || "en",
    businessId: business && business.get("id"),
    currency: business && business.getIn(["attributes", "currency"])
  };
};

const mapDispatch = {
  fetchAvgTicketSize: fetchAvgTicketSizeAction,
  fetchTodaysEarnings: fetchTodaysEarningsAction,
  fetchRevenueBreakdown: fetchRevenueBreakdownAction,
  fetchBestSales: fetchBestSalesAction,
  fetchWorstSales: fetchWorstSalesAction
};

export default compose(
  requireAuth(true),
  withTranslation(namespaces),
  connect(
    mapState,
    mapDispatch
  )
)(Dashboard);
