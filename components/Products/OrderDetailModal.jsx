import React, { useEffect, useMemo } from "react";
import Modal from "react-responsive-modal";
import { arrayOf, bool, func, shape } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { groupBy } from "lodash";
import { connect } from "react-redux";
import { Box } from "@rebass/grid";
import { useRouter } from "next/router";
import { useLng } from "utils/hooks";
import { CartIcon, CloseCircleIcon } from "../Icons";
import {
  removeProductToCart,
  setProductsToCart,
  updateProductToCart
} from "../../data/actions/products";
import { convertToFound } from "../../utils/price";

const OrderDetailModal = ({
  isOpen,
  onClose,
  products,
  t,
  updateProduct,
  removeProduct,
  setProducts
}) => {
  const router = useRouter();
  const lng = useLng();
  const groupedBySupplier = useMemo(
    () => groupBy(products, "supplier_name"),
    [products]
  );

  const onChangeCount = (productId, count) => {
    if (count === 0) {
      removeProduct(productId);
    } else {
      updateProduct(productId, count);
    }
  };

  useEffect(() => {
    const productsString = window.localStorage.getItem("cart_products");
    if (productsString) {
      try {
        const parsedProducts = JSON.parse(productsString);

        if (parsedProducts.length) {
          setProducts(parsedProducts);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }, [setProducts]);

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onClose}
        classNames={{
          overlay:
            "bg-transparent right-0 left-auto w-118 top-0 p-0 overflow-visible",
          modal:
            "right-0 absolute top-0 h-screen w-118 p-0 bg-white shadow-card",
          closeIcon: "hidden"
        }}
      >
        <div className="flex h-screen flex-auto flex-col pt-17 pb-5">
          <CloseCircleIcon
            className="absolute right-4 top-4 cursor-pointer"
            onClick={onClose}
          />
          <div className="mb-20 flex-1 overflow-auto px-15.5">
            <div className="mb-5 text-xl font-bold">{t("app:myCart")}</div>

            {Object.values(groupedBySupplier).map(supplierProducts => (
              <div
                key={supplierProducts[0]?.supplier?.objectID}
                className="mb-8"
              >
                <div className="text-lg font-semibold text-gray-900">
                  {supplierProducts[0]?.supplier?.name}
                </div>
                <div className="mb-4 text-gray-500">
                  {(
                    supplierProducts[0]?.supplier?.supplier_categories?.map(
                      item => item.name
                    ) || []
                  ).join(", ")}
                </div>

                {supplierProducts.map(product => (
                  <div key={product.objectID} className="mb-4 flex space-x-4">
                    <div className="">
                      <img
                        src={product?.image?.url}
                        alt="logo"
                        className="h-33 w-full min-w-33 max-w-33 rounded-4.5 object-cover"
                      />
                    </div>
                    <div className="select-none">
                      <div className="font-semibold">{product.name}</div>
                      <div className="text-sm text-gray-500">
                        {product.description?.slice(0, 100)}
                      </div>
                      <div className="my-2.5 flex h-10 w-23 items-center justify-center space-x-2 rounded-2.5 border border-[#0F1138] text-gray-900">
                        <FontAwesomeIcon
                          icon={faMinus}
                          className="cursor-pointer cursor-pointer text-sm"
                          onClick={() =>
                            onChangeCount(product.objectID, product.count - 1)
                          }
                        />
                        <div className="select-none">{product.count}</div>
                        <FontAwesomeIcon
                          icon={faPlus}
                          className="cursor-pointer cursor-pointer text-sm"
                          onClick={() =>
                            onChangeCount(product.objectID, product.count + 1)
                          }
                        />
                      </div>
                      {!!product.price_per_unit_cents && (
                        <div className="flex select-none text-sm">
                          <div>
                            {convertToFound(product.price_per_unit_cents)}€
                            {product.units ? "/" : ""}
                          </div>
                          <div>{product.units}</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="absolute bottom-0 left-0 flex h-21 w-full items-center justify-center bg-white shadow-card">
            <Box
              className="flex cursor-pointer items-center space-x-3"
              onClick={() => router.push(`/${lng}/app/cart`)}
            >
              <div className="text-[22px] font-semibold text-gray-900">
                {t("app:finalizeMyOrder")}
              </div>
              <CartIcon className="w-6 text-gray-900" />
            </Box>
          </div>
        </div>
      </Modal>
    </div>
  );
};

OrderDetailModal.propTypes = {
  products: arrayOf(shape()).isRequired,
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  t: func.isRequired,
  updateProduct: func.isRequired,
  removeProduct: func.isRequired,
  setProducts: func.isRequired
};

const mapStateToProps = state => {
  const products = state.getIn(["products", "selectedProducts"]);

  return {
    products: products.size ? products.toJS() : []
  };
};

const mapDispatchToProps = {
  updateProduct: updateProductToCart,
  removeProduct: removeProductToCart,
  setProducts: setProductsToCart
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailModal);
