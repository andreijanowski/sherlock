import { Droppable } from "react-beautiful-dnd";
import { string, bool, number } from "prop-types";
import { Table, ChairsSpace, Name } from "./styled";

const RADIUS = 60;

const Column = ({ id, name, seats, isDropDisabled }) => (
  <Droppable droppableId={id} isDropDisabled={isDropDisabled}>
    {provided => (
      <Table
        {...provided.droppableProps}
        ref={provided.innerRef}
        isDropDisabled={isDropDisabled}
      >
        <ChairsSpace seats={seats} radius={RADIUS}>
          <svg>
            <circle id="circle" cx="50%" cy="50%" r={`${RADIUS}px`} />
          </svg>
        </ChairsSpace>
        <Name>{name}</Name>
      </Table>
    )}
  </Droppable>
);

Column.propTypes = {
  id: string.isRequired,
  name: string.isRequired,
  seats: number.isRequired,
  isDropDisabled: bool
};

Column.defaultProps = {
  isDropDisabled: false
};

export default Column;
