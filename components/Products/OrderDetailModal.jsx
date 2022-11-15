import React, { useMemo } from "react";
import Modal from "react-responsive-modal";
import { arrayOf, bool, func, shape } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { groupBy } from "lodash";
import { CartIcon, CloseCircleIcon } from "../Icons";

const OrderDetailModal = ({ isOpen, onClose, products, onChangeCount, t }) => {
  const groupedBySupplier = useMemo(() => groupBy(products, "supplier_name"), [
    products
  ]);

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
        <div className="flex flex-col h-screen flex-auto pt-17 pb-5">
          <CloseCircleIcon
            className="absolute right-4 top-4 cursor-pointer"
            onClick={onClose}
          />
          <div className="px-15.5 flex-1 overflow-auto mb-20">
            <div className="font-bold text-xl mb-5">{t("app:myCart")}</div>

            {Object.values(groupedBySupplier).map(supplierProducts => (
              <div
                key={supplierProducts[0]?.supplier?.objectID}
                className="mb-8"
              >
                <div className="font-semibold text-gray-900 text-lg">
                  {supplierProducts[0]?.supplier?.name}
                </div>
                <div className="text-gray-500 mb-4">
                  {(
                    supplierProducts[0]?.supplier?.supplier_categories?.map(
                      item => item.name
                    ) || []
                  ).join(", ")}
                </div>

                {supplierProducts.map(product => (
                  <div key={product.objectID} className="flex space-x-4 mb-4">
                    <div className="">
                      <img
                        src={product?.image?.url}
                        alt="logo"
                        className="min-w-33 max-w-33 w-full rounded-4.5 h-33 object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold">{product.name}</div>
                      <div className="text-gray-500 text-sm">
                        {product.description?.slice(0, 100)}
                      </div>
                      <div className="rounded-full h-10 w-23 my-2.5 flex space-x-2 items-center justify-center border border-gray-900 text-gray-900">
                        <FontAwesomeIcon
                          icon={faMinus}
                          className="cursor-pointer text-sm cursor-pointer"
                          onClick={() =>
                            onChangeCount(product.objectID, product.count - 1)
                          }
                        />
                        <div>{product.count}</div>
                        <FontAwesomeIcon
                          icon={faPlus}
                          className="cursor-pointer text-sm cursor-pointer"
                          onClick={() =>
                            onChangeCount(product.objectID, product.count + 1)
                          }
                        />
                      </div>
                      <div className="flex text-sm">
                        <div>{product.price_per_unit_cents || 0}€/</div>
                        <div>{product.units}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="absolute w-full bottom-0 left-0 h-21 flex items-center justify-center space-x-3 shadow-card bg-white">
            <div className="text-gray-900 text-xl font-semibold">
              {t("app:finalizeMyOrder")}
            </div>
            <CartIcon className="w-6 text-gray-900" />
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
  onChangeCount: func.isRequired,
  t: func.isRequired
};

export default OrderDetailModal;
