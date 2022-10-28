import React from "react";
import { withTranslation } from "i18n";
import { findResultsState } from "react-instantsearch-dom/server";
import AppLayout from "layout/App";
import { func, string } from "prop-types";
import requireAuth from "lib/requireAuth";
import { pathToSearchState } from "utils/algolia";
import SearchApp from "components/Algolia/SearchApp";
import algoliasearchLite from "algoliasearch/lite";
import { PUBLIC_ALGOLIA_CLIENT_KEY, ALGOLIA_APP_ID } from "consts";
import { connect } from "react-redux";
import ConnectedHits from "components/Suppliers/ConnectedHits";
import { SUPPLIER_CATEGORIES } from "sections/integrations/utils";

const searchClient = algoliasearchLite(
  ALGOLIA_APP_ID,
  PUBLIC_ALGOLIA_CLIENT_KEY
);

const namespaces = ["forms", "app"];

const defaultProps = {
  searchClient,
  indexName: "Supplier_staging"
};

const SuppliersPage = ({ t, lng }) => (
  <AppLayout t={t} lng={lng} mainIcon="wholesalers" header={t("app:suppliers")}>
    <SearchApp
      searchClient={searchClient}
      categories={SUPPLIER_CATEGORIES}
      categoryName="supplier_categories.name"
      indexName="Supplier_staging"
      label={t("app:allSuppliers")}
      placeholder="Search product, brand or category"
    >
      <ConnectedHits />
    </SearchApp>
  </AppLayout>
);

SuppliersPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired
};

SuppliersPage.defaultProps = {};

SuppliersPage.getInitialProps = async context => {
  const { req, res, query, ...restProps } = context;

  const searchState = pathToSearchState(restProps.asPath);
  const resultsState = await findResultsState(SearchApp, {
    ...defaultProps,
    searchState
  });

  return {
    resultsState,
    searchState
  };
};

export default requireAuth(true)(
  withTranslation(namespaces)(
    connect(
      (state, { i18n }) => ({
        lng: (i18n && i18n.language) || "en"
      }),
      {}
    )(SuppliersPage)
  )
);
