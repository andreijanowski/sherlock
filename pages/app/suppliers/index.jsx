import React, { useMemo } from "react";
import { withTranslation } from "i18n";
import AppLayout from "layout/App";
import { func, shape, string } from "prop-types";
import requireAuth from "lib/requireAuth";
import SearchApp from "components/Algolia/SearchApp";
import algoliasearchLite from "algoliasearch/lite";
import { PUBLIC_ALGOLIA_CLIENT_KEY, ALGOLIA_APP_ID } from "consts";
import { connect } from "react-redux";
import ConnectedHits from "components/Suppliers/ConnectedHits";
import Loading from "../../../components/Suppliers/Loading";
import SupplierCategories from "../../../components/Suppliers/SupplierCategories";

const searchClient = algoliasearchLite(
  ALGOLIA_APP_ID,
  PUBLIC_ALGOLIA_CLIENT_KEY
);

const namespaces = ["forms", "app"];

const SuppliersPage = ({ t, lng, business }) => {
  const city = business?.get("city");
  const country = business?.get("country");

  const filters = useMemo(() => {
    const queries = [];
    if (country) {
      queries.push(`(country_codes_names: "${country}")`);
    }
    if (city) {
      queries.push(`(cities: "${city}")`);
    }

    return queries.join(" AND ");
  }, [city, country]);

  return (
    <AppLayout
      t={t}
      lng={lng}
      mainIcon="wholesalers"
      header={t("app:suppliers")}
    >
      <SearchApp
        searchClient={searchClient}
        indexName="Supplier_staging"
        label={t("app:allSuppliers")}
        placeholder={t("app:supplierSearchPlaceholder")}
        filters={filters}
        t={t}
      >
        <SupplierCategories searchClient={searchClient} lng={lng} t={t} />
        <Loading>
          <ConnectedHits t={t} lng={lng} />
        </Loading>
      </SearchApp>
    </AppLayout>
  );
};

SuppliersPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  business: shape()
};

SuppliersPage.defaultProps = {
  business: null
};

const mapState = (state, { i18n }) => {
  const businessData = state.getIn(["users", "currentBusiness", "data"]);
  const business = businessData && businessData.get("businesses").first();

  return {
    business: business && business.get("attributes"),
    lng: (i18n && i18n.language) || "en"
  };
};

export default requireAuth(true)(
  withTranslation(namespaces)(connect(mapState, {})(SuppliersPage))
);
