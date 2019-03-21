import { Droppable } from "react-beautiful-dnd";
import { shape, string, arrayOf, func } from "prop-types";
import Orders from "./Orders";
import {
  ColumnWrapper,
  ColumnHeader,
  ColumnTitle,
  OrdersNumber,
  OrdersWrapper
} from "./styled";
import { columns, setIsDropDisabled } from "../utils";

const Column = ({
  id,
  title,
  orders,
  t,
  currency,
  updateOrder,
  draggedOrderState,
  setRejectModalVisibility,
  toggleOrderDetails
}) => {
  const isDropDisabled = setIsDropDisabled(draggedOrderState, id);
  return (
    <ColumnWrapper>
      <ColumnHeader>
        <ColumnTitle>{title}</ColumnTitle>
        <OrdersNumber rejected={id === columns.rejected}>
          {orders.length}
        </OrdersNumber>
      </ColumnHeader>
      <Droppable droppableId={id} isDropDisabled={isDropDisabled}>
        {provided => (
          <OrdersWrapper
            {...provided.droppableProps}
            isDropDisabled={isDropDisabled}
            ref={provided.innerRef}
            rejected={id === columns.rejected}
          >
            <Orders
              {...{
                orders,
                currency,
                t,
                updateOrder,
                id,
                toggleOrderDetails,
                setRejectModalVisibility
              }}
            />
            {provided.placeholder}
          </OrdersWrapper>
        )}
      </Droppable>
    </ColumnWrapper>
  );
};

Column.propTypes = {
  t: func.isRequired,
  id: string.isRequired,
  title: string.isRequired,
  orders: arrayOf(shape()).isRequired,
  currency: string.isRequired,
  updateOrder: func.isRequired,
  setRejectModalVisibility: func.isRequired,
  toggleOrderDetails: func.isRequired,
  draggedOrderState: string
};

Column.defaultProps = {
  draggedOrderState: null
};

export default Column;
