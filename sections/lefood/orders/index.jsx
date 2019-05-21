import { func, shape, arrayOf, bool, string } from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";
import { LoadingIndicator } from "components";
import { mergeOrderData } from "sections/lefood/utils";
import Column from "./Column";
import { ColumnsWrapper } from "./styled";
import RejectModal from "./RejectModal";

const Orders = ({
  onDragEnd,
  onDragStart,
  draggedOrderState,
  updateOrder,
  orders,
  ordersElements,
  columns,
  loading,
  currency,
  setRejectModalVisibility,
  pendingRejectionOrderId,
  handleRejectionSubmit,
  toggleOrderDetails,
  t
}) =>
  loading ? (
    <LoadingIndicator />
  ) : (
    <DragDropContext {...{ onDragStart, onDragEnd }}>
      <ColumnsWrapper>
        {Object.values(columns).map(column => {
          const columnOrders = column.orderIds
            .map(id => mergeOrderData(id, orders, ordersElements))
            .filter(o => !!o);
          return (
            <Column
              {...{
                ...column,
                t,
                currency,
                draggedOrderState,
                updateOrder,
                setRejectModalVisibility,
                toggleOrderDetails,
                orders: columnOrders,
                key: column.id
              }}
            />
          );
        })}
        <RejectModal
          {...{
            isOpen: !!pendingRejectionOrderId,
            onClose: () => setRejectModalVisibility(undefined),
            pendingRejectionOrder: orders
              ? orders.find(o => o.id === pendingRejectionOrderId)
              : null,
            handleRejectionSubmit,
            t
          }}
        />
      </ColumnsWrapper>
    </DragDropContext>
  );

Orders.propTypes = {
  t: func.isRequired,
  onDragEnd: func.isRequired,
  orders: arrayOf(shape()),
  columns: shape().isRequired,
  loading: bool.isRequired,
  currency: string,
  updateOrder: func.isRequired,
  draggedOrderState: string,
  onDragStart: func.isRequired,
  setRejectModalVisibility: func.isRequired,
  pendingRejectionOrderId: string,
  handleRejectionSubmit: func.isRequired,
  toggleOrderDetails: func.isRequired,
  ordersElements: shape()
};

Orders.defaultProps = {
  draggedOrderState: null,
  currency: "",
  pendingRejectionOrderId: "",
  ordersElements: {},
  orders: null
};

export default Orders;
