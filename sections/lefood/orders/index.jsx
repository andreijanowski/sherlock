import { func, shape, arrayOf, bool, string } from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";
import isServer from "utils/isServer";
import { LoadingIndicator } from "components";
import Column from "./Column";
import { ColumnsWrapper } from "./styled";
import RejectModal from "./RejectModal";
import StopOrdersModal from "./StopOrdersModal";
import FinishOrdersModal from "./FinishOrdersModal";

const Orders = ({
  onDragEnd,
  onDragStart,
  draggedOrderState,
  updateOrder,
  orders,
  columns,
  loading,
  currency,
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
                orders: columnOrders,
                key: column.id
              }}
            />
          );
        })}
        {!isServer && (
          <RejectModal {...{ open: true, onClose: () => null, t }} />
        )}
        {!isServer && (
          <StopOrdersModal {...{ open: true, onClose: () => null, t }} />
        )}
        {!isServer && (
          <FinishOrdersModal {...{ open: true, onClose: () => null, t }} />
        )}
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
  draggedOrderState: string.isRequired,
  onDragStart: func.isRequired
};

export default Orders;
