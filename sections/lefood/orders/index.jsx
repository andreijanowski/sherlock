import { func, shape } from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { ColumnsWrapper } from "./styled";

const Orders = ({ onDragEnd, data }) => (
  <DragDropContext {...{ onDragEnd }}>
    <ColumnsWrapper>
      {Object.values(data.columns).map(column => {
        const orders = column.orderIds.map(id => data.orders[id]);
        return <Column {...{ ...column, orders, key: column.id }} />;
      })}
    </ColumnsWrapper>
  </DragDropContext>
);

Orders.propTypes = {
  onDragEnd: func.isRequired,
  data: shape().isRequired
};

export default Orders;
