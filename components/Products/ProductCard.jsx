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
        "flex w-full flex-col rounded-4 bg-white p-2 shadow-card",
        className
      )}
    >
      <img
        src={product?.image?.url}
        alt="logo"
        className="h-32.5 w-full rounded-4.5 object-cover"
      />
      <div className="mt-3 flex flex-auto select-none flex-col justify-between px-2">
        <div className="flex flex-auto justify-between space-x-3">
          <div className="shrink-1 inline flex-auto">
            <div className="font-semibold">{product.name}</div>
          </div>
          <div className="shrink-0 text-right text-sm font-medium">
            <div>
              {parseCentsPriceToDottedFormat(
                product.price_per_unit_cents || 0,
                "EUR"
              )}
              €{product.units ? "/" : ""}
            </div>
            <div>{product.units}</div>
          </div>
        </div>
        <div className="max-w-40 truncate text-sm text-gray-500">
          {product.description}
        </div>

        <div className="mt-3 flex space-x-3">
          <div className="flex h-10 w-21 items-center justify-center space-x-2 rounded-full border border-black">
            <FontAwesomeIcon
              icon={faMinus}
              className="cursor-pointer cursor-pointer text-sm text-gray-900"
              onClick={() => onChangeCount(product.objectID, product.count - 1)}
            />
            <div>{product.count || 0}</div>
            <FontAwesomeIcon
              icon={faPlus}
              className="cursor-pointer cursor-pointer text-sm text-gray-900"
              onClick={() => onChangeCount(product.objectID, product.count + 1)}
            />
          </div>
          <Box
            className={clsx(
              "flex h-10 flex-1 cursor-pointer items-center justify-center rounded-full text-white",
              selected ? "bg-gray-700" : "bg-gray-900"
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
