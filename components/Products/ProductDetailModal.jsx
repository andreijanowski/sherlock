import React from "react";
import Modal from "react-responsive-modal";
import { bool, func, shape } from "prop-types";
import { useTranslation } from "i18n";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { convertToFound } from "utils/price";
import { Box } from "@rebass/grid";
import { CheckIcon, ChevronRightIcon } from "../Icons";
import { useRouter } from "next/router";
import { useLng } from "utils/hooks";

const ProductDetailModal = ({
  isOpen,
  onClose,
  product,
  selected,
  onChangeCount,
  onAdd
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const lng = useLng();

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      classNames={{
        modal: "w-170 p-0 shadow-card rounded-3 overflow-hidden",
        closeIcon: "hidden"
      }}
      center
    >
      <div className="min-w-170 bg-white">
        <div className="px-5.5">
          <div className="flex justify-center pt-2">
            <img src={product?.image?.url} alt="logo" className="mb-5 h-70" />
          </div>
          <div className="text-xl font-bold leading-1.4 text-gray-900">
            {product?.name}
          </div>
          {!!product?.selling_price_cents && (
            <div className="mt-2 flex text-xl font-bold leading-1.4">
              <div>{convertToFound(product?.selling_price_cents)} €</div>
            </div>
          )}
          {!!product?.price_per_unit_cents && (
            <div className="mb-2 flex text-sm font-medium leading-1.5 text-gray-500">
              <div>
                {convertToFound(product?.price_per_unit_cents)}€
                {product?.units ? "/" : ""}
              </div>
              <div>{product?.units}</div>
            </div>
          )}
          <table className="mb-3 w-full">
            <tbody>
              <tr>
                <td className="w-full py-1">
                  <div className="leading-1.4 text-black">
                    {product?.description}
                    {!selected && (
                      <div className="my-2 text-lg font-semibold leading-1.4 text-gray-900">
                        {t("app:chooseQuantity")}
                      </div>
                    )}
                  </div>
                  {!selected && (
                    <td className="py-1 text-center">
                      <div className="inline-flex items-center space-x-1 rounded-2.5 border border-blue-600 px-6 py-2 text-gray-900">
                        <FontAwesomeIcon
                          icon={faMinus}
                          className="cursor-pointer text-sm text-gray-900"
                          onClick={() =>
                            onChangeCount(product?.objectID, product?.count - 1)
                          }
                        />
                        <div>{product?.count}</div>
                        <FontAwesomeIcon
                          icon={faPlus}
                          className="cursor-pointer text-sm text-gray-900"
                          onClick={() =>
                            onChangeCount(product?.objectID, product?.count + 1)
                          }
                        />
                      </div>
                    </td>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {!selected ? (
          <Box
            className="flex h-17.5 cursor-pointer items-center justify-center bg-indigo-700 bg-button"
            onClick={() => onAdd(product)}
          >
            <div className="text-xl font-medium text-white">
              {t("app:addCart")}
            </div>
          </Box>
        ) : (
          <Box className="flex h-17.5 items-center justify-between px-6 shadow-card">
            <div className="flex cursor-pointer items-center space-x-3 px-3">
              <div className="text-xl font-medium leading-1.4 text-gray-900">
                {t("app:added")}
              </div>
              <CheckIcon />
            </div>
            <div className="flex items-center space-x-4">
              <Box
                className="cursor-pointer font-semibold leading-1.4 text-blue-600"
                onClick={() => router.push(`/${lng}/app/cart`)}
              >
                {t("app:goToCart")}
              </Box>
              <Box
                className="flex cursor-pointer items-center space-x-2 rounded-2.5 bg-indigo-700 bg-button px-6 py-2"
                onClick={onClose}
              >
                <div className="leading-1.4 text-white">Continue Shopping</div>
                <ChevronRightIcon />
              </Box>
            </div>
          </Box>
        )}
      </div>
    </Modal>
  );
};

ProductDetailModal.propTypes = {
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  product: shape().isRequired,
  selected: bool.isRequired,
  onChangeCount: func.isRequired,
  onAdd: func.isRequired
};
export default ProductDetailModal;
