import { func, shape, bool, string } from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";
import { LoadingIndicator } from "components";
import Column from "./Column";
import { ColumnsWrapper } from "./styled";
import RejectModal from "./RejectModal";

const Orders = ({
  onDragEnd,
  onDragStart,
  draggedOrderState,
  updateOrder,
  orders,
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
            .map(id => orders.get(id))
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
              ? orders.find(o => o.get("id") === pendingRejectionOrderId)
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
  orders: shape(),
  columns: shape().isRequired,
  loading: bool.isRequired,
  currency: string,
  updateOrder: func.isRequired,
  draggedOrderState: string,
  onDragStart: func.isRequired,
  setRejectModalVisibility: func.isRequired,
  pendingRejectionOrderId: string,
  handleRejectionSubmit: func.isRequired,
  toggleOrderDetails: func.isRequired
};

Orders.defaultProps = {
  draggedOrderState: null,
  currency: "",
  pendingRejectionOrderId: "",
  orders: null
};

export default Orders;
