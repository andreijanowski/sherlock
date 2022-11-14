import React, { useEffect, useMemo, useState } from "react";
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
import ProductsGrid from "../../../components/Products/ProductsGrid";
import Categories from "../../../components/Suppliers/Categories";

const searchClient = algoliasearchLite(
  ALGOLIA_APP_ID,
  PUBLIC_ALGOLIA_CLIENT_KEY
);

const namespaces = ["forms", "app"];

const ProductsPage = ({ t, lng }) => {
  const router = useRouter();
  const { name, id } = router.query;
  const [supplier, setSupplier] = useState();

  useEffect(() => {
    const index = searchClient.initIndex("Supplier_staging");

    index.search(name).then(res => {
      const data = res.hits.find(hit => hit.objectID === id);
      setSupplier(data);
    });
  }, [name, id]);

  const categories = useMemo(
    () => [
      "",
      ...(supplier?.supplier_categories?.map(item => item.name) || [])
    ],
    [supplier]
  );

  return (
    <AppLayout
      t={t}
      lng={lng}
      mainIcon="wholesalers"
      header={t("app:menuSuppliers")}
    >
      <SearchApp
        searchClient={searchClient}
        indexName="SupplierProduct_staging"
        label={name}
        backUrl={`/${lng}/app/suppliers`}
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
