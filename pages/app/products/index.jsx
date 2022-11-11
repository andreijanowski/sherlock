import React from "react";
import { withTranslation } from "i18n";
import AppLayout from "layout/App";
import { func, string } from "prop-types";
import requireAuth from "lib/requireAuth";
import SearchApp from "components/Algolia/SearchApp";
import algoliasearchLite from "algoliasearch/lite";
import { PUBLIC_ALGOLIA_CLIENT_KEY, ALGOLIA_APP_ID } from "consts";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Loading from "../../../components/Suppliers/Loading";
import SupplierCategories from "../../../components/Suppliers/SupplierCategories";
import ProductsGrid from "../../../components/Products/ProductsGrid";

const searchClient = algoliasearchLite(
  ALGOLIA_APP_ID,
  PUBLIC_ALGOLIA_CLIENT_KEY
);

const namespaces = ["forms", "app"];

const ProductsPage = ({ t, lng }) => {
  const router = useRouter();
  const { name } = router.query;

  return (
    <AppLayout t={t} lng={lng} mainIcon="wholesalers" header={name}>
      <SearchApp
        searchClient={searchClient}
        indexName="SupplierProduct_staging"
        label={name}
        backUrl={`/${lng}/app/suppliers`}
        placeholder={t("app:supplierSearchPlaceholder")}
        filters={`supplier_name: ${name}`}
      >
        <SupplierCategories searchClient={searchClient} lng={lng} />
        <Loading>
          <ProductsGrid t={t} />
        </Loading>
      </SearchApp>
    </AppLayout>
  );
};

ProductsPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired
};

ProductsPage.defaultProps = {};

const mapState = (state, { i18n }) => ({
  lng: (i18n && i18n.language) || "en"
});

export default requireAuth(true)(
  withTranslation(namespaces)(connect(mapState, {})(ProductsPage))
);
