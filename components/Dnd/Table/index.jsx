import { Droppable } from "react-beautiful-dnd";
import { string, bool, number, func } from "prop-types";
import { Flex, Box } from "@rebass/grid";
import { TableWrapper, ChairsSpace, Name, Chair, ChairNumber } from "./styled";

const RADIUS = 60;

const Table = ({
  id,
  tableNumber,
  numberOfSeats,
  isDropDisabled,
  handleTableClick
}) => (
  <Droppable droppableId={id} isDropDisabled={isDropDisabled}>
    {(provided, { isDraggingOver }) => (
      <TableWrapper
        {...provided.droppableProps}
        ref={provided.innerRef}
        isDropDisabled={isDropDisabled}
        isDraggingOver={isDraggingOver}
        onClick={() => handleTableClick(id)}
      >
        <ChairsSpace
          seats={numberOfSeats}
          radius={RADIUS}
          isDropDisabled={isDropDisabled}
          isDraggingOver={isDraggingOver}
        >
          <svg>
            <circle id="circle" cx="50%" cy="50%" r={`${RADIUS}px`} />
          </svg>
        </ChairsSpace>
        <Flex flexDirection="column" alignItems="center">
          <Box>
            <Name
              isDropDisabled={isDropDisabled}
              isDraggingOver={isDraggingOver}
            >
              {tableNumber}
            </Name>
          </Box>
          <Box>
            <ChairNumber
              isDropDisabled={isDropDisabled}
              isDraggingOver={isDraggingOver}
            >
              {numberOfSeats}
            </ChairNumber>
            <Chair
              isDropDisabled={isDropDisabled}
              isDraggingOver={isDraggingOver}
            />
          </Box>
        </Flex>
      </TableWrapper>
    )}
  </Droppable>
);

Table.propTypes = {
  id: string.isRequired,
  tableNumber: number.isRequired,
  numberOfSeats: number.isRequired,
  handleTableClick: func.isRequired,
  isDropDisabled: bool
};

Table.defaultProps = {
  isDropDisabled: false
};

export default Table;
