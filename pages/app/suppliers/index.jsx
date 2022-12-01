import React, { useEffect, useMemo } from "react";
import { withTranslation } from "i18n";
import AppLayout from "layout/App";
import { func, shape, string } from "prop-types";
import requireAuth from "lib/requireAuth";
import SearchApp from "components/Algolia/SearchApp";
import algoliasearchLite from "algoliasearch/lite";
import {
  PUBLIC_ALGOLIA_CLIENT_KEY,
  ALGOLIA_APP_ID,
  ALGOLIA_ENVIRONMENT,
  ALGOLIA_SUPPLIER_INDEX_NAME
} from "consts";
import { connect } from "react-redux";
import ConnectedHits from "components/Suppliers/ConnectedHits";
import Loading from "components/Suppliers/Loading";
import SupplierCategories from "components/Suppliers/SupplierCategories";
import {
  postRemoveSupplierToFavorites,
  postSupplierToFavorites
} from "actions/suppliers";
import { fetchBusinessFavoriteSuppliers } from "actions/businesses";

const searchClient = algoliasearchLite(
  ALGOLIA_APP_ID,
  PUBLIC_ALGOLIA_CLIENT_KEY
);

const namespaces = ["forms", "app"];

const SuppliersPage = ({
  t,
  lng,
  business,
  addSupplierToFavorites,
  businessId,
  getBusinessFavoriteSuppliers,
  suppliersData,
  removeSupplierFromFavorites
}) => {
  const city = business?.get("city");
  const country = business?.get("country");

  const filters = useMemo(() => {
    const queries = [];
    if (country) {
      // TODO we will enable this when we fix the location restriction issue
      // queries.push(`(country_codes_names: "${country}")`);
    }
    if (city) {
      // TODO we will enable this when we fix the location restriction issue
      // queries.push(`(cities: "${city}")`);
    }

    return queries.join(" AND ");
  }, [city, country]);

  const onChangeFavoriteSupplier = async (supplierId, isFavorite) => {
    if (!businessId) {
      return;
    }

    if (isFavorite) {
      await addSupplierToFavorites({
        supplierId,
        businessId
      });
    } else {
      const favoriteId = suppliersData
        ?.get(supplierId)
        ?.getIn(["attributes", "favoriteId"]);
      await removeSupplierFromFavorites(favoriteId);
    }
    await getBusinessFavoriteSuppliers(businessId);
  };

  useEffect(() => {
    if (businessId) {
      getBusinessFavoriteSuppliers(businessId);
    }
  }, [businessId, getBusinessFavoriteSuppliers]);

  return (
    <AppLayout
      t={t}
      lng={lng}
      mainIcon="wholesalers"
      header={t("app:suppliers")}
    >
      <SearchApp
        searchClient={searchClient}
        indexName={`${ALGOLIA_SUPPLIER_INDEX_NAME}_${ALGOLIA_ENVIRONMENT}`}
        label={t("app:allSuppliers")}
        placeholder={t("app:supplierSearchPlaceholder")}
        filters={filters}
        t={t}
      >
        <SupplierCategories searchClient={searchClient} lng={lng} t={t} />
        <Loading>
          <ConnectedHits
            t={t}
            lng={lng}
            onChangeFavoriteSupplier={onChangeFavoriteSupplier}
            suppliersData={suppliersData}
          />
        </Loading>
      </SearchApp>
    </AppLayout>
  );
};

SuppliersPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  business: shape(),
  addSupplierToFavorites: func.isRequired,
  removeSupplierFromFavorites: func.isRequired,
  businessId: string,
  getBusinessFavoriteSuppliers: func.isRequired,
  suppliersData: shape().isRequired
};

SuppliersPage.defaultProps = {
  business: null,
  businessId: ""
};

const mapState = (state, { i18n }) => {
  const businessData = state.getIn(["users", "currentBusiness", "data"]);
  const business = businessData && businessData.get("businesses").first();
  const suppliersData = state.getIn(["suppliers", "data", "suppliers"]);

  const businessId =
    businessData && businessData.get("businesses").keySeq().first();

  return {
    business: business && business.get("attributes"),
    lng: (i18n && i18n.language) || "en",
    businessId,
    suppliersData
  };
};

const mapDispatchToProps = {
  addSupplierToFavorites: postSupplierToFavorites,
  removeSupplierFromFavorites: postRemoveSupplierToFavorites,
  getBusinessFavoriteSuppliers: fetchBusinessFavoriteSuppliers
};

export default requireAuth(true)(
  withTranslation(namespaces)(
    connect(mapState, mapDispatchToProps)(SuppliersPage)
  )
);
