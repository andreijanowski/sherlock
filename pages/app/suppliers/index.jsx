import React, { useEffect, useMemo, useState } from "react";
import { withTranslation } from "i18n";
import AppLayout from "layout/App";
import { bool, func, shape, string } from "prop-types";
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
import {
  fetchBusinessFavoriteSuppliers,
  fetchBusinessExclusiveSuppliers
} from "actions/businesses";
import SupplierCard from "components/Suppliers/SupplierCard";
import Categories from "components/Suppliers/Categories";
import { uniq } from "lodash";
import { PulseLoader } from "react-spinners";
import { theme } from "utils/theme";

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
  removeSupplierFromFavorites,
  getBusinessExclusiveSuppliers,
  exclusiveSuppliers,
  isExclusiveLoaded
}) => {
  const city = business?.get("city");
  const country = business?.get("country");
  const [selectedCategory, setSelectedCategory] = useState("");

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

  useEffect(() => {
    if (businessId) {
      getBusinessExclusiveSuppliers(businessId);
    }
  }, [businessId, getBusinessExclusiveSuppliers]);

  const exclusiveSuppliersCategories = useMemo(() => {
    return uniq(
      exclusiveSuppliers
        ?.map(item => item.attributes.categories)
        .reduce((au, el) => [...au, ...el], []) || []
    );
  }, [exclusiveSuppliers]);

  const filteredExclusiveSuppliers = useMemo(() => {
    return exclusiveSuppliers.filter(
      item =>
        !selectedCategory ||
        item.attributes?.categories?.includes(selectedCategory)
    );
  }, [exclusiveSuppliers, selectedCategory]);

  const onCategoryChange = category => {
    setSelectedCategory(category);
  };

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
        {exclusiveSuppliers?.length ? (
          <Categories
            categories={exclusiveSuppliersCategories.map(item => ({
              label: item,
              value: item
            }))}
            attribute="supplier_categories.name"
            disabled
            t={t}
            onChange={onCategoryChange}
          />
        ) : (
          <SupplierCategories searchClient={searchClient} lng={lng} t={t} />
        )}
        {exclusiveSuppliers?.length || !isExclusiveLoaded ? (
          <>
            {!isExclusiveLoaded ? (
              <div className="flex flex-1 items-center justify-center">
                <PulseLoader color={`rgb(${theme.colors.blue})`} />
              </div>
            ) : (
              <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 2lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 4xl:grid-cols-8 4xl:gap-8 5xl:grid-cols-9 6xl:grid-cols-10 7xl:grid-cols-11">
                {filteredExclusiveSuppliers.map(supplier => (
                  <SupplierCard key={supplier.id} supplier={supplier} />
                ))}
              </div>
            )}
          </>
        ) : (
          <Loading>
            <ConnectedHits
              t={t}
              lng={lng}
              onChangeFavoriteSupplier={onChangeFavoriteSupplier}
              suppliersData={suppliersData}
            />
          </Loading>
        )}
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
  suppliersData: shape().isRequired,
  getBusinessExclusiveSuppliers: func.isRequired,
  exclusiveSuppliers: shape().isRequired,
  isExclusiveLoaded: bool.isRequired
};

SuppliersPage.defaultProps = {
  business: null,
  businessId: ""
};

const mapState = (state, { i18n }) => {
  const businessData = state.getIn(["users", "currentBusiness", "data"]);
  const business = businessData && businessData.get("businesses").first();
  const suppliersData = state.getIn(["suppliers", "data", "suppliers"]);
  const exclusiveSuppliersData = state.getIn([
    "suppliers",
    "exclusiveSuppliers",
    "suppliers"
  ]);
  const isExclusiveLoaded = state.getIn(["suppliers", "isExclusiveLoaded"]);

  const businessId =
    businessData && businessData.get("businesses").keySeq().first();

  return {
    business: business && business.get("attributes"),
    lng: (i18n && i18n.language) || "en",
    businessId,
    suppliersData,
    exclusiveSuppliers: exclusiveSuppliersData?.valueSeq()?.toJS(),
    isExclusiveLoaded
  };
};

const mapDispatchToProps = {
  addSupplierToFavorites: postSupplierToFavorites,
  removeSupplierFromFavorites: postRemoveSupplierToFavorites,
  getBusinessFavoriteSuppliers: fetchBusinessFavoriteSuppliers,
  getBusinessExclusiveSuppliers: fetchBusinessExclusiveSuppliers
};

export default requireAuth(true)(
  withTranslation(namespaces)(
    connect(mapState, mapDispatchToProps)(SuppliersPage)
  )
);
