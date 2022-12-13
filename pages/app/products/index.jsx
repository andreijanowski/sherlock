import React, { useEffect, useState } from "react";
import { withTranslation } from "i18n";
import AppLayout from "layout/App";
import { func, string, bool } from "prop-types";
import requireAuth from "lib/requireAuth";
import SearchApp from "components/Algolia/SearchApp";
import algoliasearchLite from "algoliasearch/lite";
import {
  PUBLIC_ALGOLIA_CLIENT_KEY,
  ALGOLIA_APP_ID,
  ALGOLIA_ENVIRONMENT,
  ALGOLIA_SUPPLIER_PRODUCT_INDEX_NAME,
  ALGOLIA_SUPPLIER_INDEX_NAME
  // ALGOLIA_SUPPLIER_PRODUCT_CATEGORY_INDEX_NAME
} from "consts";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Loading from "components/Suppliers/Loading";
import ProductsGrid from "components/Products/ProductsGrid";
import Categories from "components/Suppliers/Categories";
import { getSupplierProductCategories } from "actions/suppliers";
import {
  selectSupplierProductCategories,
  selectSupplierProductCategoriesIsFetching
} from "selectors/supplier";

const searchClient = algoliasearchLite(
  ALGOLIA_APP_ID,
  PUBLIC_ALGOLIA_CLIENT_KEY
);

const namespaces = ["forms", "app"];

const ProductsPage = ({
  t,
  lng,
  fetchSupplierProductCategories,
  supplierProductCategories,
  IsFetching
}) => {
  const router = useRouter();
  const { name, id } = router.query;
  const [supplier, setSupplier] = useState();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const index = searchClient.initIndex(
      `${ALGOLIA_SUPPLIER_INDEX_NAME}_${ALGOLIA_ENVIRONMENT}`
    );

    // fetchSupplierProductCategories({ include: "sub_categories" });

    index
      .search(name)
      .then(({ hits }) => {
        const data = hits.find(hit => hit.objectID === id);
        setSupplier(data);
      })
      .catch(err => console.log(err));

    const categoryIndex = searchClient.initIndex(
      `SupplierProduct_${ALGOLIA_ENVIRONMENT}`
    );

    categoryIndex.search(name, {}).then(({ hits }) => {
      let categoriesArray = [];
      for (let i = 0; i < hits.length; i++) {
        for (let x = 0; x < hits[i].supplier_product_categories.length; x++) {
          if (
            !categoriesArray.includes(hits[i].supplier_product_categories[x])
          ) {
            categoriesArray.push(hits[i].supplier_product_categories[x]);
          }
        }
      }
      setCategories(
        categoriesArray.map(item => ({
          label: item,
          value: item
        }))
      );
    });
  }, [name, id, fetchSupplierProductCategories]);

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
          attribute="supplier_product_categories"
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
  lng: string.isRequired,
  fetchSupplierProductCategories: func.isRequired,
  supplierProductCategories: null,
  IsFetching: bool.isRequired
};

ProductsPage.defaultProps = {};

const mapState = (state, { i18n }) => ({
  lng: (i18n && i18n.language) || "en",
  supplierProductCategories: selectSupplierProductCategories(state),
  IsFetching: selectSupplierProductCategoriesIsFetching(state)
});

const mapDispatch = {
  fetchSupplierProductCategories: getSupplierProductCategories
};

export default requireAuth(true)(
  withTranslation(namespaces)(connect(mapState, mapDispatch)(ProductsPage))
);
