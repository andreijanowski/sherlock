import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { arrayOf, func, shape, string } from "prop-types";
import { Box } from "@rebass/grid";
import { TrashIcon } from "../Icons";
import { useTranslation } from "../../i18n";
import { convertToFound } from "../../utils/price";

const SupplierCartView = ({
  products,
  onChangeCount,
  removeProducts,
  comment,
  onChangeComment,
  deliveryDate,
  onChangeDate
}) => {
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

      <div className="flex space-x-8 mb-5 overflow-x-auto overflow-y-hidden">
        {products.map(product => (
          <div key={product.objectID} className="mb-4">
            <div className="flex space-x-4">
              <div className="">
                <img
                  src={product?.image?.url}
                  alt="logo"
                  className="min-w-33 max-w-33 w-full rounded-4.5 h-33 object-cover"
                />
              </div>
              <div className="select-none max-w-40 flex flex-col">
                <div className="font-semibold">{product.name}</div>
                <div>
                  <div className="text-gray-500 text-sm truncate">
                    {product.description?.slice(0, 100)}
                  </div>
                  <div className="rounded-2.5 h-10 w-23 my-2.5 flex space-x-2 items-center justify-center border border-[#0F1138] text-gray-900">
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
                  {(product.price_per_unit_cents === 0 ||
                    product.price_per_unit_cents) && (
                    <div className="flex text-sm select-none">
                      <div>
                        {convertToFound(product.price_per_unit_cents)}€
                        {product.units ? "/" : ""}
                      </div>
                      <div>{product.units}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {!product.price_per_unit_cents && (
              <div className="text-red-500 text-sm mt-3">Price is required</div>
            )}
          </div>
        ))}
      </div>
      <div className="max-w-160">
        <div className="mb-5">
          <div className="text-gray-900 mb-2">{t("app:deliveryDate")}</div>
          <input
            className="text-gray-900 bg-white border border-gray-300 h-13 px-5 py-2 focus:outline-none w-full rounded"
            type="date"
            value={deliveryDate}
            onChange={e => onChangeDate(e.target.value)}
          />
        </div>
        <div>
          <div className="text-gray-900 mb-2">{t("app:comment")}</div>
          <textarea
            className="w-full focus:outline-none border border-gray-300 h-28 rounded px-5 py-3"
            rows={4}
            value={comment}
            onChange={e => onChangeComment(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-between my-6">
        <div className="text-gray-700 text-[22px] font-bold">
          {t("app:total")}
        </div>
        <div className="text-gray-700 text-[22px] font-bold">
          {convertToFound(totalPrice)}€
        </div>
      </div>
      <hr className="border-b border-dashed" />
    </div>
  );
};

SupplierCartView.propTypes = {
  products: arrayOf(shape()).isRequired,
  onChangeCount: func.isRequired,
  removeProducts: func.isRequired,
  comment: string,
  onChangeComment: func.isRequired,
  deliveryDate: string,
  onChangeDate: func.isRequired
};

SupplierCartView.defaultProps = {
  comment: "",
  deliveryDate: new Date()
};

export default SupplierCartView;
