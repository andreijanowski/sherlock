import { func, shape, number, arrayOf } from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";
import { DndColumn, DndTable, TimeSlotPicker, DaySwitcher } from "components";
import { Flex } from "@rebass/grid";
import moment from "moment";
import { ColumnsWrapper, TablesWrapper } from "./styled";
import { columnsList } from "../utils";
import CardDetails from "./CardDetails";

const Bookings = ({
  onDragEnd,
  onDragStart,
  handleCardClick,
  // isDropDisabled,
  choosenDate,
  choosenSlot,
  chooseSlot,
  columns,
  bookings,
  slots,
  chooseDate,
  t
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
            handleCardClick,
            width: "200px",
            renderCardHeader: id => {
              const from = bookings.getIn([id, "attributes", "from"]);
              return `${moment(
                bookings.getIn([id, "attributes", "date"])
              ).format("Do MMMM")}, ${moment({
                minutes: (from / 60) % 60,
                hours: (from / 60 / 60) % 24
              }).format("h:mm A")}`;
            },
            renderCardDetails: id => <CardDetails {...{ t, id, bookings }} />
          }}
        />
        <TablesWrapper>
          <DaySwitcher {...{ choosenDate, chooseDate }} />
          <TimeSlotPicker {...{ slots, choosenSlot, chooseSlot }} />
          <Flex width={1} flexWrap="wrap" justifyContent="space-around">
            {Object.values(columns).map(column =>
              column.id !== columnsList.newBookings ? (
                <DndTable
                  {...{
                    key: column.id,
                    id: column.id,
                    numberOfSeats: column.numberOfSeats,
                    tableNumber: column.number,
                    items: [],
                    isDropDisabled: !choosenSlot
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
  choosenDate: shape().isRequired,
  chooseDate: func.isRequired,
  chooseSlot: func.isRequired,
  handleCardClick: func.isRequired,
  choosenSlot: number
};

Bookings.defaultProps = {
  bookings: null,
  choosenSlot: undefined
};

export default Bookings;
