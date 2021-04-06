import React, { useState, useEffect } from "react";
import Router from "next/router";
import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import { connect } from "react-redux";
import AppLayout from "layout/App";
import {
  generateWholesalersMenuItems,
  WHOLESALERS_CATEGORIES
} from "sections/integrations/utils";
import isServer from "utils/isServer";
import IntegrationsList from "sections/integrations";

const namespaces = ["forms", "app"];

const IntegrationsPage = ({ t, lng, wholesalers }) => {
  const [tab, setTab] = useState("");

  const setActiveTab = () => {
    if (!isServer) {
      const urlParams = new URLSearchParams(window.location.search);
      const getParam = urlParams.get("category");

      setTab(WHOLESALERS_CATEGORIES.includes(getParam) ? getParam : "pos");
    }
  };

  useEffect(() => {
    setActiveTab();
  }, []);

  Router.events.on("routeChangeComplete", () => setActiveTab());

  const preparedWholesalers =
    wholesalers &&
    wholesalers.filter(wholesaler =>
      tab === "allProducts"
        ? wholesaler.getIn(["attributes", "category"]) === "wholesaler"
        : wholesaler.getIn(["attributes", "wholesalerCategory"]) === tab
    );

  return (
    <AppLayout
      t={t}
      lng={lng}
      mainIcon="wholesalers"
      header={t("app:wholesaler")}
      withMenu
      menuItems={generateWholesalersMenuItems(t, tab)}
    >
      {wholesalers && wholesalers.size > 0 && (
        <IntegrationsList partners={preparedWholesalers} t={t} />
      )}
    </AppLayout>
  );
};

IntegrationsPage.getInitialProps = async () => ({
  namespacesRequired: namespaces
});

IntegrationsPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  wholesalers: shape()
};

IntegrationsPage.defaultProps = {
  wholesalers: null
};

export default requireAuth(true)(
  withTranslation(namespaces)(
    connect((state, { i18n }) => ({
      lng: (i18n && i18n.language) || "en",
      wholesalers: state.getIn([
        "wholesalers",
        "data",
        "wholesalers",
        "partners"
      ])
    }))(IntegrationsPage)
  )
);
