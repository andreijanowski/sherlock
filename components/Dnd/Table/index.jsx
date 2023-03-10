import { Droppable } from "react-beautiful-dnd";
import { string, shape, number, func } from "prop-types";
import { Flex, Box } from "@rebass/grid";
import {
  TableWrapper,
  ChairsSpace,
  Name,
  Chair,
  ChairNumber,
  ReservedBy
} from "./styled";
import { calcTableAvailibilityStatus } from "./utils";

const RADIUS = 60;

const Table = ({
  id,
  tableNumber,
  numberOfSeats,
  currentReservation,
  handleTableClick,
  handleTableMouseEnter
}) => (
  <Droppable droppableId={id} isDropDisabled={!!currentReservation}>
    {(provided, { isDraggingOver }) => {
      const availibilityStatus = calcTableAvailibilityStatus(
        currentReservation,
        numberOfSeats,
        isDraggingOver
      );
      return (
        <TableWrapper
          {...provided.droppableProps}
          ref={provided.innerRef}
          availibilityStatus={availibilityStatus}
          onClick={() => handleTableClick(id)}
          onMouseEnter={() => handleTableMouseEnter(id)}
        >
          <ChairsSpace
            seats={numberOfSeats}
            radius={RADIUS}
            availibilityStatus={availibilityStatus}
            isDraggingOver={isDraggingOver}
          >
            <svg>
              <circle id="circle" cx="50%" cy="50%" r={`${RADIUS}px`} />
            </svg>
          </ChairsSpace>
          <Flex flexDirection="column" alignItems="center">
            <Box>
              <Name availibilityStatus={availibilityStatus}>{tableNumber}</Name>
            </Box>
            <Box>
              <ChairNumber availibilityStatus={availibilityStatus}>
                {numberOfSeats}
              </ChairNumber>
              <Chair availibilityStatus={availibilityStatus} />
            </Box>
            {currentReservation && (
              <Flex justifyContent="center">
                <ReservedBy availibilityStatus={availibilityStatus}>
                  {currentReservation.name}
                </ReservedBy>
              </Flex>
            )}
          </Flex>
        </TableWrapper>
      );
    }}
  </Droppable>
);

Table.propTypes = {
  id: string.isRequired,
  tableNumber: number.isRequired,
  numberOfSeats: number.isRequired,
  handleTableClick: func.isRequired,
  handleTableMouseEnter: func.isRequired,
  currentReservation: shape()
};

Table.defaultProps = {
  currentReservation: undefined
};

export default Table;
