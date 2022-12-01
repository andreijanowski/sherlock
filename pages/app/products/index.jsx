import React, { useEffect, useState } from "react";
import { withTranslation } from "i18n";
import AppLayout from "layout/App";
import { func, string } from "prop-types";
import requireAuth from "lib/requireAuth";
import SearchApp from "components/Algolia/SearchApp";
import algoliasearchLite from "algoliasearch/lite";
import {
  PUBLIC_ALGOLIA_CLIENT_KEY,
  ALGOLIA_APP_ID,
  ALGOLIA_ENVIRONMENT,
  ALGOLIA_SUPPLIER_PRODUCT_INDEX_NAME,
  ALGOLIA_SUPPLIER_INDEX_NAME,
  ALGOLIA_SUPPLIER_PRODUCT_CATEGORY_INDEX_NAME
} from "consts";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Loading from "components/Suppliers/Loading";
import ProductsGrid from "components/Products/ProductsGrid";
import Categories from "components/Suppliers/Categories";

const searchClient = algoliasearchLite(
  ALGOLIA_APP_ID,
  PUBLIC_ALGOLIA_CLIENT_KEY
);

const namespaces = ["forms", "app"];

const ProductsPage = ({ t, lng }) => {
  const router = useRouter();
  const { name, id } = router.query;
  const [supplier, setSupplier] = useState();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const index = searchClient.initIndex(
      `${ALGOLIA_SUPPLIER_INDEX_NAME}_${ALGOLIA_ENVIRONMENT}`
    );

    index.search(name).then(res => {
      const data = res.hits.find(hit => hit.objectID === id);
      setSupplier(data);
    });

    const categoryIndex = searchClient.initIndex(
      `${ALGOLIA_SUPPLIER_PRODUCT_CATEGORY_INDEX_NAME}_${ALGOLIA_ENVIRONMENT}`
    );

    categoryIndex.search().then(res => {
      setCategories(
        res.hits.map(item => ({
          label: item.name,
          value: item.name
        }))
      );
    });
  }, [name, id]);

  return (
    <AppLayout
      t={t}
      lng={lng}
      mainIcon="wholesalers"
      header={t("app:menuSuppliers")}
    >
      <SearchApp
        searchClient={searchClient}
        indexName={`${ALGOLIA_SUPPLIER_PRODUCT_INDEX_NAME}_${ALGOLIA_ENVIRONMENT}`}
        label={name}
        backUrl={`/${lng}/app/suppliers`}
        hasBack
        hasFavourite
        placeholder={t("app:supplierSearchPlaceholder")}
        filters={`supplier_name: "${name}"`}
        t={t}
      >
        <Categories
          categories={categories}
          attribute="supplier_categories.name"
          disabled
          t={t}
        />
        <Loading>
          <ProductsGrid t={t} supplier={supplier} />
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
