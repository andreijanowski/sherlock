import React, { useState } from "react";
import moment from "moment";
import { Box } from "@rebass/grid";
import { func, shape, string } from "prop-types";
import RepeatOrderModal from "./RepeatOrderModal";
import RepeatSuccessModal from "./RepeatSuccessModal";
import {
  postSupplierOrder,
  postSupplierOrderEmail
} from "../../../data/actions/supplierOrders";
import { postSupplierElements } from "../../../data/actions/supplierElements";
import { connect } from "react-redux";
import { useTranslation } from "i18n";

const OrderTableRow = ({
  order,
  businessId,
  createSupplierOrder,
  createSupplierElements,
  sendSupplierOrderEmail
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const { t } = useTranslation();

  const onRepeatOrder = async (deliveryDate, comment, elements) => {
    const result = await createSupplierOrder({
      desiredDeliveryDate: deliveryDate,
      comment,
      businessId,
      supplierId: order.supplier.id
    });

    if (result?.rawData && result.rawData?.data) {
      const orderId = result.rawData?.data?.id;

      await Promise.all(
        elements.map(async element => {
          await createSupplierElements({
            quantity: element.quantity,
            supplierOrderId: orderId,
            supplierProductId: element.supplierProductId
          });
        })
      );

      await sendSupplierOrderEmail(orderId);
      setIsSuccessModalOpen(true);
    }
  };

  return (
    <tr className="">
      <td className="border-b border-t border-gray-200 px-4 py-5 text-center align-top text-sm">
        <div className="flex h-9 items-center justify-center">
          {moment(order.createdAt).format("DD.MM.YYYY")}
        </div>
      </td>
      <td className="border-b border-t border-gray-200 px-4 py-5 text-center align-top">
        <div className="flex h-9 items-center justify-center space-x-1 text-sm">
          <img
            src={order.supplierLogo}
            className="h-6 w-6 rounded-full shadow"
            alt="logo"
          />
          <div className="font-semibold uppercase">{order.supplierName}</div>
        </div>
      </td>
      <td className="border-b border-t border-gray-200 px-4 py-5 text-center align-top text-sm">
        <div className="flex h-9 items-center justify-center">
          {order.orderId}
        </div>
      </td>
      <td className="w-1/5 border-b border-t border-gray-200 px-4 py-5 text-center">
        {expanded && (
          <div className="mb-6 flex flex-col items-center text-sm">
            <div className="mb-6">
              {order.elements.map(item => (
                <div className="mb-1 flex space-x-2">
                  <div>{item.attributes.quantity}</div>
                  <div>x</div>
                  <div>{item.attributes.supplierProductName}</div>
                </div>
              ))}
            </div>
            <div className="text-gray-900">
              <span className="mr-2 font-bold italic">{t("app:comment")}:</span>
              <span>{order.comment}</span>
            </div>
          </div>
        )}
        <Box
          className="cursor-pointer text-sm font-semibold text-gray-900 underline"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? t("app:hideOrder") : t("app:seeOrder")}
        </Box>
      </td>
      <td className="border-b border-t border-gray-200 px-4 py-5 text-center">
        <div className="flex h-9 items-center justify-center">
          <button
            type="button"
            className="rounded-2.5 bg-indigo-700 bg-button py-2 px-6 leading-1.4 text-white"
            onClick={() => setIsOpen(true)}
          >
            {t("app:repeat")}
          </button>
        </div>
      </td>
      <RepeatOrderModal
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
        order={order}
        onRepeatOrder={onRepeatOrder}
      />
      <RepeatSuccessModal
        onClose={() => setIsSuccessModalOpen(false)}
        isOpen={isSuccessModalOpen}
      />
    </tr>
  );
};

OrderTableRow.propTypes = {
  order: shape().isRequired,
  businessId: string.isRequired,
  createSupplierOrder: func.isRequired,
  createSupplierElements: func.isRequired,
  sendSupplierOrderEmail: func.isRequired
};

const mapStateToProps = state => {
  const businessData = state.getIn(["users", "currentBusiness", "data"]);

  const businessId =
    businessData && businessData.get("businesses").keySeq().first();

  return {
    businessId
  };
};

const mapDispatchToProps = {
  createSupplierOrder: postSupplierOrder,
  sendSupplierOrderEmail: postSupplierOrderEmail,
  createSupplierElements: postSupplierElements
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderTableRow);
