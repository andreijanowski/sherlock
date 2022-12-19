import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { arrayOf, func, shape, string } from "prop-types";
import { Box } from "@rebass/grid";
import { TrashIcon } from "../Icons";
import { useTranslation } from "i18n";
import { convertToFound } from "utils/price";

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
      products.reduce((sum, el) => sum + el.count * el.selling_price_cents, 0),
    [products]
  );

  return (
    <div className="relative mb-8">
      <div className="text-xl font-semibold text-blue-900">
        {products[0]?.supplier?.name}
      </div>
      <div className="mb-6 text-gray-500">
        {(
          products[0]?.supplier?.supplier_categories?.map(item => item.name) ||
          []
        ).join(", ")}
      </div>
      <Box
        className="absolute right-0 top-0 flex cursor-pointer items-center space-x-2"
        onClick={() => removeProducts(products[0]?.supplier?.name)}
      >
        <div>{t("app:deleteAllItems")}</div>
        <TrashIcon width={16} />
      </Box>

      <div className="mb-5 flex space-x-8 overflow-x-auto overflow-y-hidden">
        {products.map(product => (
          <div key={product.objectID} className="mb-4">
            <div className="flex space-x-4">
              <div className="">
                <img
                  src={product?.image?.url}
                  alt="logo"
                  className="h-33 w-full min-w-33 max-w-33 rounded-4.5 object-cover"
                />
              </div>
              <div className="flex max-w-40 select-none flex-col">
                <div className="font-semibold">{product.name}</div>
                <div>
                  <div className="truncate text-sm text-gray-500">
                    {product.description?.slice(0, 100)}
                  </div>
                  <div className="my-2.5 flex h-10 w-23 items-center justify-center space-x-2 rounded-2.5 border border-[#0F1138] text-gray-900">
                    <FontAwesomeIcon
                      icon={faMinus}
                      className="cursor-pointer text-sm"
                      onClick={() =>
                        onChangeCount(product.objectID, product.count - 1)
                      }
                    />
                    <div className="select-none leading-1">{product.count}</div>
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="cursor-pointer text-sm"
                      onClick={() =>
                        onChangeCount(product.objectID, product.count + 1)
                      }
                    />
                  </div>
                  {!!product.selling_price_cents && (
                    <div className="flex select-none text-sm">
                      <div>
                        {convertToFound(product.selling_price_cents)}€
                        {product.units ? "/" : ""}
                      </div>
                      <div>{product.units}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="max-w-160">
        <div className="mb-5">
          <div className="mb-2 text-gray-900">{t("app:deliveryDate")}</div>
          <input
            className="h-13 w-full rounded border border-gray-300 bg-white px-5 py-2 text-gray-900 focus:outline-none"
            type="date"
            value={deliveryDate}
            onChange={e => onChangeDate(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-2 text-gray-900">{t("app:comment")}</div>
          <textarea
            className="h-28 w-full rounded border border-gray-300 px-5 py-3 focus:outline-none"
            rows={4}
            value={comment}
            onChange={e => onChangeComment(e.target.value)}
          />
        </div>
      </div>

      <div className="my-6 flex justify-between">
        <div className="text-[22px] font-bold text-gray-700">
          {t("app:total")}
        </div>
        <div className="text-[22px] font-bold text-gray-700">
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
