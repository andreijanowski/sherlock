import { func, shape } from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { ColumnsWrapper } from "./styled";

const Orders = ({ onDragEnd, data, t }) => (
  <DragDropContext {...{ onDragEnd }}>
    <ColumnsWrapper>
      {Object.values(data.columns).map(column => {
        const orders = column.orderIds.map(id => data.orders[id]);
        return <Column {...{ ...column, orders, t, key: column.id }} />;
      })}
    </ColumnsWrapper>
  </DragDropContext>
);

Orders.propTypes = {
  t: func.isRequired,
  onDragEnd: func.isRequired,
  data: shape().isRequired
};

export default Orders;
