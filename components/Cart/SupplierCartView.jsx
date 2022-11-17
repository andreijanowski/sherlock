import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { arrayOf, func, shape } from "prop-types";
import { Box } from "@rebass/grid";
import { TrashIcon } from "../Icons";
import { useTranslation } from "../../i18n";

const SupplierCartView = ({ products, onChangeCount, removeProducts }) => {
  const { t } = useTranslation();

  const totalPrice = useMemo(
    () =>
      products.reduce((sum, el) => sum + el.count * el.price_per_unit_cents, 0),
    [products]
  );

  return (
    <div className="mb-8 relative">
      <div className="font-semibold text-blue-900 text-xl">
        {products[0]?.supplier?.name}
      </div>
      <div className="text-gray-500 mb-6">
        {(
          products[0]?.supplier?.supplier_categories?.map(item => item.name) ||
          []
        ).join(", ")}
      </div>
      <Box
        className="absolute right-0 top-0 flex items-center space-x-2 cursor-pointer"
        onClick={() => removeProducts(products[0]?.supplier?.name)}
      >
        <div>{t("app:deleteAllItems")}</div>
        <TrashIcon width={16} />
      </Box>

      <div className="flex space-x-8 mb-5 overflow-x-auto">
        {products.map(product => (
          <div key={product.objectID} className="flex space-x-4 mb-4">
            <div className="">
              <img
                src={product?.image?.url}
                alt="logo"
                className="min-w-33 max-w-33 w-full rounded-4.5 h-33 object-cover"
              />
            </div>
            <div className="select-none max-w-40 flex flex-col justify-between">
              <div className="font-semibold">{product.name}</div>
              <div>
                <div className="text-gray-500 text-sm truncate">
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
                  <div className="select-none">{product.count}</div>
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="cursor-pointer text-sm cursor-pointer"
                    onClick={() =>
                      onChangeCount(product.objectID, product.count + 1)
                    }
                  />
                </div>
                <div className="flex text-sm select-none">
                  <div>
                    {product.price_per_unit_cents || 0}€
                    {product.units ? "/" : ""}
                  </div>
                  <div>{product.units}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="max-w-160">
        <div className="mb-5">
          <div className="text-gray-900 mb-2">{t("app:deliveryDate")}</div>
          <input
            className="text-gray-900 bg-white border border-gray-300 h-13 px-5 py-2 focus:outline-none w-full rounded"
            placeholder=""
          />
        </div>
        <div>
          <div className="text-gray-900 mb-2">{t("app:comment")}</div>
          <textarea
            className="w-full focus:outline-none border border-gray-300 h-28 rounded px-5 py-3"
            rows={4}
          />
        </div>
      </div>

      <div className="flex justify-between my-6">
        <div className="text-gray-700 text-[22px] font-bold">
          {t("app:total")}
        </div>
        <div className="text-gray-700 text-[22px] font-bold">{totalPrice}€</div>
      </div>
      <hr className="border-b border-dashed" />
    </div>
  );
};

SupplierCartView.propTypes = {
  products: arrayOf(shape()).isRequired,
  onChangeCount: func.isRequired,
  removeProducts: func.isRequired
};

export default SupplierCartView;
