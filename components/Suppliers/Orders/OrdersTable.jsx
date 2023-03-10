import React, { useMemo } from "react";
import { bool, shape } from "prop-types";
import moment from "moment";
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
    t("app:repeatThisOrder")
  ];

  const dataSource = useMemo(() => {
    if (!supplierOrders) return [];

    return supplierOrders
      .valueSeq()
      .map(order => {
        const createdAt = order?.getIn(["attributes", "createdAt"]);
        const comment = order?.getIn(["attributes", "comment"]);
        const orderId = order?.get("id");
        const elements = order
          ?.getIn(["relationships", "supplierElements", "data"])
          ?.toJS();
        const products = order
          ?.getIn(["relationships", "supplierProducts", "data"])
          ?.toJS();
        const supplier = order?.getIn(["relationships", "supplier", "data"]);

        return {
          createdAt,
          comment,
          orderId,
          elements: elements || [],
          supplier: supplier?.toJS(),
          supplierName: supplier?.getIn(["attributes", "name"]),
          products,
          supplierLogo: supplier?.getIn(["attributes", "logo", "url"])
        };
      })
      .sort((a, b) => (moment(a.createdAt).isBefore(b.createdAt) ? 1 : -1));
  }, [supplierOrders]);

  return (
    <div className="rounded-4 bg-white p-6">
      <table className="w-full border-separate border-spacing-y-4">
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header} className="px-4 py-5 text-center">
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
