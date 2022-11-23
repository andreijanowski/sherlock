import React from "react";
import clsx from "clsx";
import { bool, func, shape, string } from "prop-types";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "@rebass/grid";
import { useTranslation } from "../../i18n";
import { parseCentsPriceToDottedFormat } from "../../utils/price";

const ProductCard = ({
  product,
  className,
  onAdd,
  selected,
  onChangeCount
}) => {
  const { t } = useTranslation();
  const handleClick = () => {
    if (!selected) {
      onAdd(product);
    }
  };

  return (
    <div
      className={clsx(
        "bg-white rounded-4 flex flex-col shadow-card w-full p-2",
        className
      )}
    >
      <img
        src={product?.image?.url}
        alt="logo"
        className="h-32.5 w-full rounded-4.5 object-cover"
      />
      <div className="mt-3 px-2 flex flex-col justify-between flex-auto select-none">
        <div className="font-semibold leading-1.5">{product.name}</div>
        {(product.price_per_unit_cents === 0 ||
          product.price_per_unit_cents) && (
          <div className="text-sm shrink-0 font-medium flex text-sm leading-1.5">
            <div>
              {parseCentsPriceToDottedFormat(
                product.price_per_unit_cents,
                "EUR"
              )}
              €{product.units ? "/" : ""}
            </div>
            <div>{product.units}</div>
          </div>
        )}
        <div className="text-gray-500 max-w-40 text-sm truncate leading-1.4">
          {product.description}
        </div>

        <div className="flex space-x-3 mt-3">
          <div className="flex-2 rounded-2.5 h-10 w-21 flex space-x-2 items-center justify-center border border-[#0F1138]">
            <FontAwesomeIcon
              icon={faMinus}
              className="cursor-pointer text-sm text-gray-900 cursor-pointer"
              onClick={() => onChangeCount(product.objectID, product.count - 1)}
            />
            <div>{product.count || 0}</div>
            <FontAwesomeIcon
              icon={faPlus}
              className="cursor-pointer text-sm text-gray-900 cursor-pointer"
              onClick={() => onChangeCount(product.objectID, product.count + 1)}
            />
          </div>
          <Box
            className={clsx(
              "flex-3 rounded-2.5 h-10 flex-1 flex justify-center items-center cursor-pointer",
              selected
                ? "bg-green-50 text-green-700 font-bold"
                : "bg-linear3 bg-indigo-700 text-white"
            )}
            onClick={handleClick}
          >
            {selected ? t("app:added") : t("app:add")}
          </Box>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: shape().isRequired,
  className: string.isRequired,
  selected: bool.isRequired,
  onAdd: func.isRequired,
  onChangeCount: func.isRequired
};

export default ProductCard;
