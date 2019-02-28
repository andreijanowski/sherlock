import { Droppable } from "react-beautiful-dnd";
import { shape, string, arrayOf, func } from "prop-types";
import Order from "./Order";
import {
  ColumnWrapper,
  ColumnHeader,
  ColumnTitle,
  OrdersNumber,
  OrdersWrapper
} from "./styled";
import { columns } from "./utils";

const Column = ({ id, title, orders, t, onClick }) => (
  <ColumnWrapper>
    <ColumnHeader>
      <ColumnTitle>{title}</ColumnTitle>
      <OrdersNumber canceled={id === columns.canceled}>
        {orders.length}
      </OrdersNumber>
    </ColumnHeader>
    <Droppable droppableId={id}>
      {provided => (
        <OrdersWrapper
          {...provided.droppableProps}
          ref={provided.innerRef}
          canceled={id === columns.canceled}
        >
          {orders.map((order, index) => (
            <Order
              {...{ order, t, onClick, columnId: id, index, key: order.id }}
            />
          ))}
          {provided.placeholder}
        </OrdersWrapper>
      )}
    </Droppable>
  </ColumnWrapper>
);

Column.propTypes = {
  onClick: func.isRequired,
  t: func.isRequired,
  id: string.isRequired,
  title: string.isRequired,
  orders: arrayOf(shape()).isRequired
};

export default Column;
