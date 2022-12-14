import React from "react";
import clsx from "clsx";
import { bool, func, shape, string } from "prop-types";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "@rebass/grid";
import { useTranslation } from "i18n";
import { convertToFound } from "utils/price";

const ProductCard = ({
  product,
  className,
  onAdd,
  selected,
  onChangeCount,
  onClick
}) => {
  const { t } = useTranslation();
  const handleClick = e => {
    e.stopPropagation();
    if (!selected) {
      onAdd(product);
    }
  };

  const onIncreaseCount = e => {
    e.stopPropagation();
    onChangeCount(product.objectID, product.count + 1);
  };

  const onDecreaseCount = e => {
    e.stopPropagation();
    onChangeCount(product.objectID, product.count - 1);
  };

  return (
    <Box
      className={clsx(
        "flex w-full cursor-pointer flex-col rounded-4 bg-white p-2 shadow-card",
        className
      )}
      onClick={() => onClick(product)}
    >
      <img
        src={product?.image?.url}
        alt="logo"
        className="h-32.5 w-full rounded-4.5 object-cover"
      />
      <div className="mt-3 flex flex-auto select-none flex-col justify-between px-2">
        <div className="font-semibold leading-1.5">{product.name}</div>
        {!!product.price_per_unit_cents && (
          <div className="flex shrink-0 text-sm font-medium leading-1.5">
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
          <Box
            className="flex-2 flex h-10 w-21 items-center justify-center space-x-2 rounded-2.5 border border-[#0F1138]"
            onClick={e => e.stopPropagation()}
          >
            <FontAwesomeIcon
              icon={faMinus}
              className="cursor-pointer text-sm text-gray-900"
              onClick={onDecreaseCount}
            />
            <div className="leading-1">{product.count || 0}</div>
            <FontAwesomeIcon
              icon={faPlus}
              className="cursor-pointer text-sm text-gray-900"
              onClick={onIncreaseCount}
            />
          </Box>
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
    </Box>
  );
};

ProductCard.propTypes = {
  product: shape().isRequired,
  className: string.isRequired,
  selected: bool.isRequired,
  onAdd: func.isRequired,
  onChangeCount: func.isRequired,
  onClick: func.isRequired
};

export default ProductCard;
