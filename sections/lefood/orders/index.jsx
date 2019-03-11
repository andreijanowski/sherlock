import { func, shape, arrayOf, bool } from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";
import { LoadingIndicator } from "components";
import Column from "./Column";
import { ColumnsWrapper } from "./styled";

const Orders = ({ onDragEnd, orders, columns, loading, t }) =>
  loading ? (
    <LoadingIndicator />
  ) : (
    <DragDropContext {...{ onDragEnd }}>
      <ColumnsWrapper>
        {Object.values(columns).map(column => {
          const columnOrders = column.orderIds.map(id =>
            orders.find(o => o.id === id)
          );
          return (
            <Column
              {...{
                ...column,
                orders: columnOrders,
                t,
                onClick: onDragEnd,
                key: column.id
              }}
            />
          );
        })}
      </ColumnsWrapper>
    </DragDropContext>
  );

Orders.propTypes = {
  t: func.isRequired,
  onDragEnd: func.isRequired,
  orders: arrayOf(shape()).isRequired,
  columns: shape().isRequired,
  loading: bool.isRequired
};

export default Orders;
