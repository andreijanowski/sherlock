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
import prepareBusinessesList from "utils/prepareBusinessesList";
import { setCurrentBusiness } from "actions/app";
import { postBusiness } from "actions/businesses";
import isServer from "utils/isServer";
import IntegrationsList from "sections/integrations";

const namespaces = ["forms", "app"];

const IntegrationsPage = ({
  t,
  lng,
  business,
  businessId,
  changeCurrentBusiness,
  addBusiness,
  businesses,
  wholesalers
}) => {
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
      select={{
        value: {
          value: businessId,
          label:
            (business && business.get("name")) ||
            t("app:manageProfile.unnamedBusiness"),
          src: business && business.getIn(["logo", "url"])
        },
        items: prepareBusinessesList(t, businesses),
        handleChange: b => changeCurrentBusiness(b.value),
        bottomAction: {
          text: t("app:manageProfile.addNewBusiness"),
          handleClick: () => addBusiness()
        },
        withImage: true
      }}
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
  changeCurrentBusiness: func.isRequired,
  addBusiness: func.isRequired,
  business: shape(),
  businessId: string,
  businesses: shape(),
  wholesalers: shape()
};

IntegrationsPage.defaultProps = {
  businesses: null,
  business: null,
  businessId: "",
  wholesalers: null
};

export default requireAuth(true)(
  withTranslation(namespaces)(
    connect(
      (state, { i18n }) => {
        const businessData = state.getIn(["users", "currentBusiness", "data"]);
        const business = businessData && businessData.get("businesses").first();

        return {
          lng: (i18n && i18n.language) || "en",
          business: business && business.get("attributes"),
          businessId: business && business.get("id"),
          businesses: state.getIn([
            "users",
            "profileBusinesses",
            "data",
            "businesses"
          ]),
          wholesalers: state.getIn([
            "wholesalers",
            "data",
            "wholesalers",
            "partners"
          ])
        };
      },
      { changeCurrentBusiness: setCurrentBusiness, addBusiness: postBusiness }
    )(IntegrationsPage)
  )
);
