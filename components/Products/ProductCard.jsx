import React from "react";
import clsx from "clsx";
import { bool, func, shape, string } from "prop-types";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "@rebass/grid";
import { useTranslation } from "../../i18n";
import { convertToFound } from "../../utils/price";

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
        <div className="font-semibold leading-1.5">{product.name}</div>
        {!!product.price_per_unit_cents && (
          <div className="flex shrink-0 text-sm text-sm font-medium leading-1.5">
            <div>
              {convertToFound(product.price_per_unit_cents)}€
              {product.units ? "/" : ""}
            </div>
            <div>{product.units}</div>
          </div>
        )}
        <div className="max-w-40 truncate text-sm leading-1.4 text-gray-500">
          {product.description}
        </div>

        <div className="mt-3 flex space-x-3">
          <div className="flex-2 flex h-10 w-21 items-center justify-center space-x-2 rounded-2.5 border border-[#0F1138]">
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
              "flex-3 flex h-10 flex-1 cursor-pointer items-center justify-center rounded-2.5",
              selected
                ? "bg-green-50 font-bold text-green-700"
                : "bg-indigo-700 bg-linear3 text-white"
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
