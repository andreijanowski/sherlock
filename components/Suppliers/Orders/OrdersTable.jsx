import React, { useMemo } from "react";
import { bool, shape } from "prop-types";
import { useTranslation } from "i18n";
import { PulseLoader } from "react-spinners";
import OrderTableRow from "./OrderTableRow";
import { theme } from "utils/theme";

const OrdersTable = ({ supplierOrders, loading }) => {
  const { t } = useTranslation();

  const headers = [
    t("app:date"),
    t("app:suppliersName"),
    t("app:orderId"),
    t("app:productsOrdered"),
    t("app:wantEditOrRepeat")
  ];

  const dataSource = useMemo(() => {
    if (!supplierOrders) return [];

    return supplierOrders.valueSeq().map(order => {
      const desiredDeliveryDate = order?.getIn([
        "attributes",
        "desiredDeliveryDate"
      ]);
      const comment = order?.getIn(["attributes", "comment"]);
      const orderId = order?.get("id");
      const products = order
        ?.getIn(["relationships", "supplierProducts", "data"])
        ?.toJS();
      const supplierName = products[0]?.attributes?.supplierName;
      const elements = order
        ?.getIn(["relationships", "supplierElements", "data"])
        ?.toJS();

      return {
        desiredDeliveryDate,
        comment,
        orderId,
        elements: elements || [],
        supplierName
      };
    });
  }, [supplierOrders]);

  return (
    <div className="rounded-4 bg-white p-6">
      <table className="w-full border-separate border-spacing-y-4">
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header} className="px-4 py-5 text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5}>
                <div className="flex flex-1 items-center justify-center">
                  <PulseLoader color={`rgb(${theme.colors.blue})`} />
                </div>
              </td>
            </tr>
          ) : (
            <>
              {dataSource.map(order => (
                <OrderTableRow key={order.orderId} order={order} />
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

OrdersTable.propTypes = {
  supplierOrders: shape(),
  loading: bool
};

OrdersTable.defaultProps = {
  supplierOrders: null,
  loading: false
};

export default OrdersTable;
