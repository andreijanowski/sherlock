import { func, shape, number, arrayOf } from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";
import { DndColumn, DndTable, TimeSlotPicker, DaySwitcher } from "components";
import { Flex } from "@rebass/grid";
import { ColumnsWrapper, TablesWrapper } from "./styled";
import { columnsList } from "../utils";

const Bookings = ({
  onDragEnd,
  onDragStart,
  // isDropDisabled,
  choosedDate,
  columns,
  bookings,
  slots,
  changeDate
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
          <DaySwitcher {...{ choosedDate, changeDate }} />
          <TimeSlotPicker {...{ slots }} />
          <Flex width={1} flexWrap="wrap" justifyContent="space-around">
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
          </Flex>
        </TablesWrapper>
      </ColumnsWrapper>
    </DragDropContext>
  );
};

Bookings.propTypes = {
  t: func.isRequired,
  onDragEnd: func.isRequired,
  bookings: shape(),
  slots: arrayOf(number).isRequired,
  columns: shape().isRequired,
  onDragStart: func.isRequired,
  choosedDate: shape().isRequired,
  changeDate: func.isRequired
};

Bookings.defaultProps = {
  bookings: null
};

export default Bookings;
