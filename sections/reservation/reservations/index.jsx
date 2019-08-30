import { func, shape, number, arrayOf } from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";
import { DndColumn, DndTable, TimeSlotPicker, DaySwitcher } from "components";
import { Flex } from "@rebass/grid";
import moment from "moment";
import { ColumnsWrapper, TablesWrapper } from "./styled";
import {
  columnsList,
  checkIfTableIsAvailable,
  getNewReservations
} from "../utils";
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
  splitedReservation,
  slots,
  chooseDate,
  t
}) => {
  const newReservations = getNewReservations({
    reservationIds: columns.newReservations.reservationIds,
    reservations,
    splitedReservation,
    slots
  });

  return (
    <DragDropContext {...{ onDragStart, onDragEnd }}>
      <ColumnsWrapper>
        <DndColumn
          {...{
            key: columns.newReservations.id,
            id: columns.newReservations.id,
            title: columns.newReservations.title,
            items: newReservations,
            splitedCard: splitedReservation,
            handleCardClick,
            isDropDisabled: false,
            isColumnGrayedOut: false,
            width: "250px",
            renderCardHeader: id => {
              const reservation = newReservations.find(r => r.get("id") === id);
              return `${moment(
                reservation.getIn(["attributes", "date"])
              ).format("Do MMMM")}, ${moment({
                minutes: (reservation.getIn(["attributes", "from"]) / 60) % 60,
                hours:
                  (reservation.getIn(["attributes", "from"]) / 60 / 60) % 24
              }).format("h:mm A")}`;
            },
            renderCardDetails: (id, opt) => (
              <CardDetails
                {...{
                  t,
                  reservation: newReservations.find(r => r.get("id") === id),
                  ...opt
                }}
              />
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
                    currentReservation: checkIfTableIsAvailable({
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
  splitedReservation: shape(),
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
  splitedReservation: undefined,
  choosenSlot: undefined,
  draggedReservation: undefined
};

export default Reservations;
