import { Droppable } from "react-beautiful-dnd";
import { shape, string, arrayOf } from "prop-types";
import Order from "./Order";
import {
  ColumnWrapper,
  ColumnHeader,
  ColumnTitle,
  OrdersNumber,
  OrdersWrapper
} from "./styled";

const Column = ({ id, title, orders }) => (
  <ColumnWrapper>
    <ColumnHeader>
      <ColumnTitle>{title}</ColumnTitle>
      <OrdersNumber>{orders.length}</OrdersNumber>
    </ColumnHeader>
    <Droppable droppableId={id}>
      {provided => (
        <OrdersWrapper {...provided.droppableProps} ref={provided.innerRef}>
          {orders.map((order, index) => (
            <Order {...{ order, index }} key={order.id} />
          ))}
          {provided.placeholder}
        </OrdersWrapper>
      )}
    </Droppable>
  </ColumnWrapper>
);

Column.propTypes = {
  id: string.isRequired,
  title: string.isRequired,
  orders: arrayOf(shape()).isRequired
};

export default Column;
