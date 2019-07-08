import { func, shape } from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { ColumnsWrapper } from "./styled";

const Bookings = ({ onDragEnd, onDragStart, columns, bookings, t }) => (
  <DragDropContext {...{ onDragStart, onDragEnd }}>
    <ColumnsWrapper>
      {Object.values(columns).map(column => {
        const columnBookings = column.bookingIds
          .map(id => bookings.get(id))
          .filter(o => !!o);
        return (
          <Column
            {...{
              ...column,
              t,
              bookings: columnBookings,
              key: column.id
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
