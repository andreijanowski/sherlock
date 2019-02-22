import { Draggable } from "react-beautiful-dnd";
import { shape, number } from "prop-types";
import {
  OrderWrapper,
  OrderHeader,
  OrderPrice,
  OrderTime,
  OrderDetails,
  OrderDetail
} from "./styled";

const Order = ({ order, index }) => (
  <Draggable draggableId={order.id} index={index}>
    {provided => (
      <OrderWrapper
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <OrderHeader>
          <OrderPrice>{order.price}</OrderPrice>
          <OrderTime>{order.time}</OrderTime>
        </OrderHeader>
        <OrderDetails>
          {order.details.map(detail => (
            <OrderDetail key={detail}>{detail}</OrderDetail>
          ))}
        </OrderDetails>
      </OrderWrapper>
    )}
  </Draggable>
);

Order.propTypes = {
  order: shape().isRequired,
  index: number.isRequired
};

export default Order;
