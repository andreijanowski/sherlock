import React, { useEffect } from "react";
import { bool, func, shape, string } from "prop-types";
import { connect } from "react-redux";
import SearchApp from "components/Algolia/SearchApp";
import algoliasearchLite from "algoliasearch/lite";
import { ALGOLIA_APP_ID, PUBLIC_ALGOLIA_CLIENT_KEY } from "consts";
import requireAuth from "lib/requireAuth";
import AppLayout from "layout/App";
import OrdersTable from "components/Suppliers/Orders/OrdersTable";
import { useLng } from "utils/hooks";
import { fetchBusinessSupplierOrdersHistory } from "actions/businesses";
import { mergeOrdersData } from "utils/supplierUtils";
import { useTranslation } from "i18n";

const searchClient = algoliasearchLite(
  ALGOLIA_APP_ID,
  PUBLIC_ALGOLIA_CLIENT_KEY
);

const OrdersPage = ({
  businessId,
  getBusinessSupplierOrders,
  supplierOrders,
  isFetching
}) => {
  const { t } = useTranslation();
  const lng = useLng();

  useEffect(() => {
    if (businessId) {
      getBusinessSupplierOrders(businessId);
    }
  }, [businessId, getBusinessSupplierOrders]);

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
        label={t("app:orderHistory")}
        backUrl={`/${lng}/app/suppliers`}
        hasBack
        placeholder={t("app:supplierSearchPlaceholder")}
        t={t}
      >
        <OrdersTable supplierOrders={supplierOrders} loading={isFetching} />
      </SearchApp>
    </AppLayout>
  );
};

OrdersPage.propTypes = {
  businessId: string,
  getBusinessSupplierOrders: func.isRequired,
  supplierOrders: shape(),
  isFetching: bool.isRequired
};

OrdersPage.defaultProps = {
  businessId: "",
  supplierOrders: null
};

const mapStateToProps = state => {
  const businessData = state.getIn(["users", "currentBusiness", "data"]);
  const isFetching = state.getIn(["supplierOrders", "isFetching"]);
  const supplierOrders = state.getIn([
    "supplierOrders",
    "data",
    "supplierOrders"
  ]);
  const supplierElements = state.getIn([
    "supplierOrders",
    "data",
    "supplierElements"
  ]);
  const supplierProducts = state.getIn([
    "supplierOrders",
    "data",
    "supplierProducts"
  ]);

  const businessId =
    businessData && businessData.get("businesses").keySeq().first();

  return {
    businessId,
    isFetching,
    supplierOrders: mergeOrdersData(
      supplierOrders,
      supplierElements,
      supplierProducts
    )
  };
};

const mapDispatchToProps = {
  getBusinessSupplierOrders: fetchBusinessSupplierOrdersHistory
};

export default requireAuth(true)(
  connect(mapStateToProps, mapDispatchToProps)(OrdersPage)
);
