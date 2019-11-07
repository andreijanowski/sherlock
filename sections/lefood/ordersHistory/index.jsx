import { useMemo } from "react";
import { func, shape, bool } from "prop-types";
import { normalizePrice } from "utils/normalizers";
import moment from "moment";
import Table from "./Table";
import Filters from "./Filters";
import { Wrapper } from "./styled";

const OrdersHistory = ({
  orders,
  loading,
  toggleOrderDetails,
  t,
  hasNextPage,
  isNextPageLoading,
  loadNextPage,
  onFilterSubmit,
  filter
}) => {
  const columns = useMemo(
    () => [
      {
        Header: t("index"),
        accessor: (row, i) => i,
        width: 50
      },
      {
        Header: t("shortId"),
        accessor: "shortId",
        width: 50
      },
      {
        Header: t("state"),
        accessor: "state",
        width: 210
      },
      {
        Header: t("date"),
        accessor: "date",
        width: 150
      },
      {
        Header: t("time"),
        accessor: "time",
        width: 60
      },
      {
        Header: t("totalCostCents"),
        accessor: "totalCostCents",
        width: 100
      }
    ],
    [t]
  );

  const data = useMemo(
    () =>
      (orders &&
        orders
          .sort((a, b) => {
            if (
              new Date(a.getIn(["attributes", "placedAt"])).getTime() <
              new Date(b.getIn(["attributes", "placedAt"])).getTime()
            ) {
              return 1;
            }
            return -1;
          })
          .map(order => ({
            id: order.get("id"),
            shortId: order.getIn(["attributes", "shortId"]),
            state: t(order.getIn(["attributes", "state"])),
            date: moment(order.getIn(["attributes", "placedAt"])).format(
              "Do MMM YYYY"
            ),
            time: moment(order.getIn(["attributes", "placedAt"])).format(
              "h:mma"
            ),
            totalCostCents: normalizePrice(
              order.getIn(["attributes", "totalCostCents"])
            )
          }))
          .toList()
          .toArray()) ||
      [],
    [orders]
  );

  return (
    <Wrapper>
      <Table
        {...{
          loading,
          columns,
          data,
          hasNextPage,
          isNextPageLoading,
          loadNextPage,
          toggleOrderDetails
        }}
      />
      <Filters {...{ t, onFilterSubmit, filter }} />
    </Wrapper>
  );
};

OrdersHistory.propTypes = {
  t: func.isRequired,
  orders: shape(),
  loading: bool.isRequired,
  toggleOrderDetails: func.isRequired,
  hasNextPage: bool.isRequired,
  isNextPageLoading: bool.isRequired,
  loadNextPage: func.isRequired,
  onFilterSubmit: func.isRequired,
  filter: shape().isRequired
};

OrdersHistory.defaultProps = {
  orders: null
};

export default OrdersHistory;
