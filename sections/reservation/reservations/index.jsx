import { func, shape, number, arrayOf } from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";
import { DndColumn, DndTable, TimeSlotPicker, DaySwitcher } from "components";
import { Flex } from "@rebass/grid";
import moment from "moment";
import { ColumnsWrapper, TablesWrapper } from "./styled";
import { columnsList, checkIfTableIsAvailable } from "../utils";
import CardDetails from "./CardDetails";

const Reservations = ({
  onDragEnd,
  onDragStart,
  handleCardClick,
  handleTableClick,
  draggedReservation,
  // isDropDisabled,
  choosenDate,
  choosenSlot,
  chooseSlot,
  columns,
  reservations,
  slots,
  chooseDate,
  t
}) => {
  const newReservations = columns.newReservations.reservationIds.map(
    id => reservations && reservations.get(id)
  );
  return (
    <DragDropContext {...{ onDragStart, onDragEnd }}>
      <ColumnsWrapper>
        <DndColumn
          {...{
            key: columns.newReservations.id,
            id: columns.newReservations.id,
            title: columns.newReservations.title,
            items: newReservations,
            isDropDisabled: false,
            isColumnGrayedOut: false,
            handleCardClick,
            width: "250px",
            renderCardHeader: id => {
              const from = reservations.getIn([id, "attributes", "from"]);
              return `${moment(
                reservations.getIn([id, "attributes", "date"])
              ).format("Do MMMM")}, ${moment({
                minutes: (from / 60) % 60,
                hours: (from / 60 / 60) % 24
              }).format("h:mm A")}`;
            },
            renderCardDetails: id => (
              <CardDetails {...{ t, id, reservations }} />
            )
          }}
        />
        <TablesWrapper>
          <DaySwitcher {...{ choosenDate, chooseDate }} />
          <TimeSlotPicker {...{ slots, choosenSlot, chooseSlot }} />
          <Flex width={1} flexWrap="wrap" justifyContent="space-around">
            {Object.values(columns).map(column =>
              column.id !== columnsList.newReservations ? (
                <DndTable
                  {...{
                    key: column.id,
                    id: column.id,
                    numberOfSeats: column.numberOfSeats,
                    tableNumber: column.number,
                    items: [],
                    isDropDisabled: checkIfTableIsAvailable({
                      reservedPeriods: column.reservedPeriods,
                      choosenDate,
                      choosenSlot,
                      draggedReservation
                    }), // TODO: function to calculate if for chosen period table is avaliable
                    handleTableClick
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

Reservations.propTypes = {
  t: func.isRequired,
  onDragEnd: func.isRequired,
  reservations: shape(),
  draggedReservation: shape(),
  slots: arrayOf(number).isRequired,
  columns: shape().isRequired,
  onDragStart: func.isRequired,
  choosenDate: shape().isRequired,
  chooseDate: func.isRequired,
  chooseSlot: func.isRequired,
  handleCardClick: func.isRequired,
  handleTableClick: func.isRequired,
  choosenSlot: number
};

Reservations.defaultProps = {
  reservations: null,
  choosenSlot: undefined,
  draggedReservation: undefined
};

export default Reservations;
