import { func, shape } from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";
import { DndColumn, DndTable, Timeline } from "components";
import { ColumnsWrapper, TablesWrapper } from "./styled";
import { columnsList } from "../utils";

const Bookings = ({
  onDragEnd,
  onDragStart,
  // isDropDisabled,
  columns,
  bookings
  // openPeriods TODO: parse open periods and use it in timeline
  // t
}) => {
  const newBookings = columns.newBookings.bookingIds
    .map(id => bookings.get(id))
    .filter(o => !!o);

  return (
    <DragDropContext {...{ onDragStart, onDragEnd }}>
      <ColumnsWrapper>
        <DndColumn
          {...{
            key: columns.newBookings.id,
            id: columns.newBookings.id,
            title: columns.newBookings.title,
            items: newBookings,
            isDropDisabled: false,
            isColumnGrayedOut: false,
            handleCardClick: undefined,
            renderCardHeader: () => "header",
            renderCardDetails: id => `details ${id}`
          }}
        />
        <TablesWrapper>
          <Timeline {...{ from: 32400, to: 86400, slots: 900 }} />
          {Object.values(columns).map(column =>
            column.id !== columnsList.newBookings ? (
              <DndTable
                {...{
                  key: column.id,
                  id: column.id,
                  seats: column.seats,
                  name: column.name,
                  items: [],
                  isDropDisabled: false
                }}
              />
            ) : null
          )}
        </TablesWrapper>
      </ColumnsWrapper>
    </DragDropContext>
  );
};

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
