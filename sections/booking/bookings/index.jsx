import { func, shape } from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";
import { DndColumn } from "components";
import { ColumnsWrapper } from "./styled";

const Bookings = ({
  onDragEnd,
  onDragStart,
  // isDropDisabled,
  columns,
  bookings
  // t
}) => (
  <DragDropContext {...{ onDragStart, onDragEnd }}>
    <ColumnsWrapper>
      {Object.values(columns).map(column => {
        const columnBookings = column.bookingIds
          .map(id => bookings.get(id))
          .filter(o => !!o);
        return (
          <DndColumn
            {...{
              key: column.id,
              id: column.id,
              title: column.title,
              items: columnBookings,
              isDropDisabled: false,
              isColumnGrayedOut: false,
              handleCardClick: undefined,
              renderCardHeader: () => "header",
              renderCardDetails: () => "details"
            }}
          />
        );
      })}
    </ColumnsWrapper>
  </DragDropContext>
);

Bookings.propTypes = {
  t: func.isRequired,
  onDragEnd: func.isRequired,
  bookings: shape(),
  columns: shape().isRequired,
  onDragStart: func.isRequired
};

Bookings.defaultProps = {
  bookings: null
};

export default Bookings;
