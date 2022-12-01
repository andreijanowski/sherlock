import React, { useState } from "react";
import moment from "moment";
import { Box } from "@rebass/grid";
import { shape } from "prop-types";

const OrderTableRow = ({ order }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <tr className="">
      <td className="border-b border-t border-gray-200 px-4 py-5 align-top text-sm">
        <div className="flex h-9 items-center">
          {moment(order.desiredDeliveryDate).format("MMMM Do YYYY")}
        </div>
      </td>
      <td className="border-b border-t border-gray-200 px-4 py-5 align-top">
        <div className="flex h-9 items-center space-x-4 text-sm">
          <div className="font-semibold uppercase">{order.supplierName}</div>
        </div>
      </td>
      <td className="border-b border-t border-gray-200 px-4 py-5 align-top text-sm">
        <div className="flex h-9 items-center">{order.orderId}</div>
      </td>
      <td className="w-1/5 border-b border-t border-gray-200 px-4 py-5">
        {expanded && (
          <div className="mb-6 text-sm">
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
              <span className="mr-2 font-bold italic">Comment:</span>
              <span>{order.comment}</span>
            </div>
          </div>
        )}
        <Box
          className="cursor-pointer text-sm font-semibold text-gray-900 underline"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Hide Order" : "See Order"}
        </Box>
      </td>
      <td className="border-b border-t border-gray-200 px-4 py-5">
        <div className="flex h-9 items-center">
          <button
            type="button"
            className="rounded-full bg-indigo-700 bg-button py-2 px-6 text-white"
          >
            Repeat
          </button>
        </div>
      </td>
    </tr>
  );
};

OrderTableRow.propTypes = {
  order: shape().isRequired
};

export default OrderTableRow;
