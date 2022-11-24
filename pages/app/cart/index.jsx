import React, { useMemo, useState } from "react";
import { useTranslation } from "i18n";
import AppLayout from "layout/App";
import { arrayOf, func, shape, string } from "prop-types";
import requireAuth from "lib/requireAuth";
import SearchApp from "components/Algolia/SearchApp";
import algoliasearchLite from "algoliasearch/lite";
import { PUBLIC_ALGOLIA_CLIENT_KEY, ALGOLIA_APP_ID } from "consts";
import { connect } from "react-redux";
import { groupBy } from "lodash";
import { Box } from "@rebass/grid";
import { PulseLoader } from "react-spinners";
import { useLng } from "../../../utils/hooks";
import {
  clearCart,
  removeProductsBySupplier,
  removeProductToCart,
  updateProductToCart
} from "../../../data/actions/products";
import SupplierCartView from "../../../components/Cart/SupplierCartView";
import {
  postSupplierOrder,
  postSupplierOrderEmail
} from "../../../data/actions/supplierOrders";
import { postSupplierElements } from "../../../data/actions/supplierElements";
import { colors } from "../../../utils/theme";
import { convertToFound } from "../../../utils/price";
import SuccessModal from "../../../components/Cart/SuccessModal";

const searchClient = algoliasearchLite(
  ALGOLIA_APP_ID,
  PUBLIC_ALGOLIA_CLIENT_KEY
);

const CartPage = ({
  products,
  businessId,
  updateProduct,
  removeProduct,
  removeProducts,
  createSupplierOrder,
  sendSupplierOrderEmail,
  createSupplierElements,
  cleanCart
}) => {
  const { t } = useTranslation();
  const lng = useLng();
  const [comments, setComments] = useState({});
  const [deliveryDates, setDeliveryDates] = useState({});
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const groupedBySupplier = useMemo(
    () => groupBy(products, "supplier_name"),
    [products]
  );

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

  const onChangeComment = (supplierId, value) => {
    setComments({
      ...comments,
      [supplierId]: value
    });
  };

  const onChangeDate = (supplierId, value) => {
    setDeliveryDates({
      ...deliveryDates,
      [supplierId]: value
    });
  };

  const onConfirmRequest = async () => {
    if (!businessId || loading) return;

    try {
      setLoading(true);
      await Promise.all(
        Object.values(groupedBySupplier).map(async supplierProducts => {
          const supplierId = supplierProducts[0]?.supplier?.objectID;
          const result = await createSupplierOrder({
            desiredDeliveryDate: deliveryDates[supplierId],
            comment: comments[supplierId],
            businessId,
            supplierId
          });
          if (result?.rawData && result.rawData?.data) {
            const orderId = result.rawData?.data?.id;

            await sendSupplierOrderEmail(orderId);

            await Promise.all(
              supplierProducts.map(async product => {
                await createSupplierElements({
                  quantity: product.count,
                  supplierOrderId: orderId,
                  supplierProductId: product.objectID
                });
              })
            );
          }
        })
      );
      cleanCart();
      setIsOpen(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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
        <div className="my-4 overflow-hidden rounded-6 bg-white shadow-card md:my-6">
          <div className="py-6 px-6 md:py-8 md:px-8.5">
            {Object.values(groupedBySupplier).map(supplierProducts => {
              const supplierId = supplierProducts[0]?.supplier?.objectID;
              return (
                <SupplierCartView
                  key={supplierId}
                  products={supplierProducts}
                  onChangeCount={onChangeCount}
                  removeProducts={removeProducts}
                  comment={comments[supplierId]}
                  onChangeComment={value => onChangeComment(supplierId, value)}
                  deliveryDate={deliveryDates[supplierId]}
                  onChangeDate={value => onChangeDate(supplierId, value)}
                />
              );
            })}
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold text-blue-900">
                {t("app:estimatedTotal")}
              </div>
              <div className="text-xl font-bold text-blue-900">
                {convertToFound(totalPrice)}€
              </div>
            </div>
            <div className="mb-2 text-xs text-gray-700">
              {t("app:cartSummary")}
            </div>
          </div>

          <Box
            className="flex h-25 w-full cursor-pointer items-center justify-center rounded-3 bg-green-50 text-xl font-bold text-green-700"
            onClick={onConfirmRequest}
          >
            {loading ? (
              <PulseLoader size={16} color={`rgb(${colors.blue})`} loading />
            ) : (
              <span>{t("app:confirmRequest")}</span>
            )}
          </Box>
        </div>
      </SearchApp>
      <SuccessModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </AppLayout>
  );
};

CartPage.propTypes = {
  products: arrayOf(shape()).isRequired,
  businessId: string,
  updateProduct: func.isRequired,
  removeProduct: func.isRequired,
  removeProducts: func.isRequired,
  createSupplierOrder: func.isRequired,
  sendSupplierOrderEmail: func.isRequired,
  createSupplierElements: func.isRequired,
  cleanCart: func.isRequired
};

CartPage.defaultProps = {
  businessId: ""
};

const mapStateToProps = state => {
  const products = state.getIn(["products", "selectedProducts"]);
  const businessData = state.getIn(["users", "currentBusiness", "data"]);

  const businessId =
    businessData && businessData.get("businesses").keySeq().first();

  return {
    products: products.size ? products.toJS() : [],
    businessId
  };
};

const mapDispatchToProps = {
  updateProduct: updateProductToCart,
  removeProduct: removeProductToCart,
  removeProducts: removeProductsBySupplier,
  createSupplierOrder: postSupplierOrder,
  sendSupplierOrderEmail: postSupplierOrderEmail,
  createSupplierElements: postSupplierElements,
  cleanCart: clearCart
};

export default requireAuth(true)(
  connect(mapStateToProps, mapDispatchToProps)(CartPage)
);
