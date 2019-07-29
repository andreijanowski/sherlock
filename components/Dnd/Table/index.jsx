import { Droppable } from "react-beautiful-dnd";
import { string, bool, number } from "prop-types";
import { TableWrapper, ChairsSpace, Name } from "./styled";

const RADIUS = 60;

const Table = ({ id, tableNumber, numberOfSeats, isDropDisabled }) => (
  <Droppable droppableId={id} isDropDisabled={isDropDisabled}>
    {provided => (
      <TableWrapper
        {...provided.droppableProps}
        ref={provided.innerRef}
        isDropDisabled={isDropDisabled}
      >
        <ChairsSpace seats={numberOfSeats} radius={RADIUS}>
          <svg>
            <circle id="circle" cx="50%" cy="50%" r={`${RADIUS}px`} />
          </svg>
        </ChairsSpace>
        <Name>{tableNumber}</Name>
      </TableWrapper>
    )}
  </Droppable>
);

Table.propTypes = {
  id: string.isRequired,
  tableNumber: number.isRequired,
  numberOfSeats: number.isRequired,
  isDropDisabled: bool
};

Table.defaultProps = {
  isDropDisabled: false
};

export default Table;
