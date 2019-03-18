import { func, shape, arrayOf, bool, string } from "prop-types";
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
  t
}) =>
  loading ? (
    <LoadingIndicator />
  ) : (
    <DragDropContext {...{ onDragStart, onDragEnd }}>
      <ColumnsWrapper>
        {Object.values(columns).map(column => {
          const columnOrders = column.orderIds.map(id =>
            orders.find(o => o.id === id)
          );
          return (
            <Column
              {...{
                ...column,
                t,
                currency,
                draggedOrderState,
                updateOrder,
                setRejectModalVisibility,
                orders: columnOrders,
                key: column.id
              }}
            />
          );
        })}
        <RejectModal
          {...{
            open: !!pendingRejectionOrderId,
            onClose: () => setRejectModalVisibility(undefined),
            pendingRejectionOrder: orders.find(
              o => o.id === pendingRejectionOrderId
            ),
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
  orders: arrayOf(shape()).isRequired,
  columns: shape().isRequired,
  loading: bool.isRequired,
  currency: string.isRequired,
  updateOrder: func.isRequired,
  draggedOrderState: string,
  onDragStart: func.isRequired,
  setRejectModalVisibility: func.isRequired,
  pendingRejectionOrderId: string.isRequired,
  handleRejectionSubmit: func.isRequired
};

Orders.defaultProps = {
  draggedOrderState: null
};

export default Orders;
