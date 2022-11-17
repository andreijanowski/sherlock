import React, { useMemo } from "react";
import { useTranslation } from "i18n";
import AppLayout from "layout/App";
import { arrayOf, func, shape } from "prop-types";
import requireAuth from "lib/requireAuth";
import SearchApp from "components/Algolia/SearchApp";
import algoliasearchLite from "algoliasearch/lite";
import { PUBLIC_ALGOLIA_CLIENT_KEY, ALGOLIA_APP_ID } from "consts";
import { connect } from "react-redux";
import { groupBy } from "lodash";
import { useLng } from "../../../utils/hooks";
import {
  removeProductsBySupplier,
  removeProductToCart,
  updateProductToCart
} from "../../../data/actions/products";
import SupplierCartView from "../../../components/Cart/SupplierCartView";

const searchClient = algoliasearchLite(
  ALGOLIA_APP_ID,
  PUBLIC_ALGOLIA_CLIENT_KEY
);

const CartPage = ({
  products,
  updateProduct,
  removeProduct,
  removeProducts
}) => {
  const { t } = useTranslation();
  const lng = useLng();

  const groupedBySupplier = useMemo(() => groupBy(products, "supplier_name"), [
    products
  ]);

  const totalPrice = useMemo(
    () =>
      products.reduce((sum, el) => sum + el.count * el.price_per_unit_cents, 0),
    [products]
  );

  const onChangeCount = (productId, count) => {
    if (count === 0) {
      removeProduct(productId);
    } else {
      updateProduct(productId, count);
    }
  };

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
        label={t("app:cart")}
        placeholder={t("app:supplierSearchPlaceholder")}
        t={t}
        hasBack
      >
        <div className="rounded-6 shadow-card bg-white my-6 overflow-hidden">
          <div className="py-8 px-8.5 ">
            {Object.values(groupedBySupplier).map(supplierProducts => (
              <SupplierCartView
                key={supplierProducts[0]?.supplier?.objectID}
                products={supplierProducts}
                onChangeCount={onChangeCount}
                removeProducts={removeProducts}
              />
            ))}
            <div className="flex justify-between items-center">
              <div className="text-blue-900 text-xl font-bold">
                {t("app:estimatedTotal")}
              </div>
              <div className="text-blue-900 text-xl font-bold">
                {totalPrice}€
              </div>
            </div>
            <div className="text-xs text-gray-700 mb-2">
              {t("app:cartSummary")}
            </div>
          </div>

          <div className="w-full bg-green-50 text-green-700 text-xl font-bold h-25 flex items-center justify-center rounded-3 cursor-pointer">
            <span>{t("app:confirmRequest")}</span>
          </div>
        </div>
      </SearchApp>
    </AppLayout>
  );
};

CartPage.propTypes = {
  products: arrayOf(shape()).isRequired,
  updateProduct: func.isRequired,
  removeProduct: func.isRequired,
  removeProducts: func.isRequired
};

CartPage.defaultProps = {};

const mapStateToProps = state => {
  const products = state.getIn(["products", "selectedProducts"]);

  return {
    products: products.size ? products.toJS() : []
  };
};

const mapDispatchToProps = {
  updateProduct: updateProductToCart,
  removeProduct: removeProductToCart,
  removeProducts: removeProductsBySupplier
};

export default requireAuth(true)(
  connect(mapStateToProps, mapDispatchToProps)(CartPage)
);
