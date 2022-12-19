import React, { useEffect, useState } from "react";
import Modal from "react-responsive-modal";
import { bool, func, shape } from "prop-types";
import { useTranslation } from "i18n";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { convertToFound } from "../../../utils/price";
import { Box } from "@rebass/grid";

const RepeatOrderModal = ({ isOpen, onClose, order, onRepeatOrder }) => {
  const { t } = useTranslation();
  const [comment, setComment] = useState();
  const [deliveryDate, setDeliveryDate] = useState();
  const [elements, setElements] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setElements(
        order.elements
          .filter(element => !!element.attributes.supplierProductId)
          .map(element => ({
            quantity: element.attributes.quantity,
            supplierProductImage: element.attributes.supplierProductImage,
            supplierProductName: element.attributes.supplierProductName,
            supplierProductId: element.attributes.supplierProductId,
            product: order.products.find(
              item => item.id === element.attributes.supplierProductId
            )
          }))
      );
    }
  }, [isOpen, order]);

  const onCreate = async () => {
    await onRepeatOrder(deliveryDate, comment, elements);
    onClose();
  };

  const onChangeCount = (productId, quantity) => {
    if (quantity === 0) {
      setElements(
        elements.filter(item => item.supplierProductId !== productId)
      );
      return;
    }
    setElements(
      elements.map(item =>
        item.supplierProductId === productId
          ? {
              ...item,
              quantity
            }
          : item
      )
    );
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      classNames={{
        modal: "w-170 p-0 shadow-card rounded-4 overflow-hidden",
        closeIcon: "hidden"
      }}
    >
      <div className="min-w-170 bg-white">
        <div className="px-5.5 pt-8">
          <div className="text-xl font-bold text-blue-900">
            {order.supplierName}
          </div>
          <div className="mt-1 mb-2 text-gray-500">
            {order.supplier?.supplier_categories
              ?.map(item => item.name)
              .join(", ")}
          </div>

          <div className="mb-5 flex space-x-3 overflow-x-auto py-4">
            {elements.map(element => (
              <div
                key={element.supplierProductId}
                className="w-64 rounded-4 p-2 shadow-card"
              >
                <div className="mb-3">
                  <img
                    src={element?.supplierProductImage}
                    alt="logo"
                    className="h-33 w-full rounded-4.5 object-cover"
                  />
                </div>
                <div className="select-none">
                  <div className="font-semibold">
                    {element?.supplierProductName}
                  </div>
                  <div>
                    <div className="truncate text-sm text-gray-500">
                      {element?.product?.attributes?.description}
                    </div>
                    {!!element?.product?.attributes?.pricePerUnitCents && (
                      <div className="flex shrink-0 text-sm text-sm font-medium leading-1.5">
                        <div>
                          {convertToFound(
                            element?.product?.attributes?.pricePerUnitCents
                          )}
                          €{element?.product?.attributes?.units ? "/" : ""}
                        </div>
                        <div>{element?.product?.attributes?.units}</div>
                      </div>
                    )}
                    <div className="my-2.5 flex h-10 w-23 items-center justify-center space-x-2 rounded-full border border-gray-900 text-gray-900">
                      <FontAwesomeIcon
                        icon={faMinus}
                        className="cursor-pointer cursor-pointer text-sm"
                        onClick={() =>
                          onChangeCount(
                            element?.supplierProductId,
                            element.quantity - 1
                          )
                        }
                      />
                      <div className="select-none">{element.quantity}</div>
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="cursor-pointer cursor-pointer text-sm"
                        onClick={() =>
                          onChangeCount(
                            element?.supplierProductId,
                            element.quantity + 1
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-5.5">
          <div className="mb-5 w-60">
            <div className="mb-2 text-gray-900">{t("app:deliveryDate")}</div>
            <input
              className="h-13 w-full rounded border border-gray-300 bg-white px-5 py-2 text-gray-900 focus:outline-none"
              type="date"
              value={deliveryDate}
              onChange={e => setDeliveryDate(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 text-gray-900">{t("app:comment")}</div>
            <textarea
              className="h-28 w-full rounded border border-gray-300 px-5 py-3 focus:outline-none"
              rows={4}
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
          </div>
        </div>

        <Box
          className="flex h-25 w-full cursor-pointer items-center justify-center rounded-3 bg-green-50 text-xl font-bold text-green-700"
          onClick={onCreate}
        >
          {t("app:repeatRequest")}
        </Box>
      </div>
    </Modal>
  );
};

RepeatOrderModal.propTypes = {
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  order: shape().isRequired,
  onRepeatOrder: func.isRequired
};
export default RepeatOrderModal;
