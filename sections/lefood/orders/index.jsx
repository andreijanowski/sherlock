import { func, shape, bool, string } from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";
import { LoadingIndicator, DndColumn } from "components";
import { ColumnsWrapper } from "./styled";
import RejectModal from "./RejectModal";
import { columns as columnsList, setIsDropDisabled } from "../utils";
import Order from "./Order";

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
            <DndColumn
              {...{
                key: column.id,
                id: column.id,
                title: column.title,
                items: columnOrders,
                isDropDisabled: setIsDropDisabled(draggedOrderState, column.id),
                isColumnGrayedOut: column.id === columnsList.rejected,
                handleCardClick: toggleOrderDetails,
                renderCardHeader: id => (
                  <>
                    {`${(
                      orders.getIn([id, "attributes", "totalCostCents"]) / 100
                    ).toFixed(2)} ${currency}`}
                    <span>
                      ID: {orders.getIn([id, "attributes", "shortId"])}
                    </span>
                  </>
                ),
                renderCardDetails: id => (
                  <Order
                    {...{
                      order: orders.get(id),
                      id,
                      t,
                      setRejectModalVisibility,
                      updateOrder
                    }}
                  />
                )
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
