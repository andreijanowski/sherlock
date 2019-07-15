import { Droppable } from "react-beautiful-dnd";
import { shape, string, arrayOf, func, bool, number } from "prop-types";
import Cards from "../Cards";
import {
  ColumnWrapper,
  ColumnHeader,
  ColumnTitle,
  ItemsNumber,
  ItemsWrapper
} from "./styled";

const Column = ({
  id,
  title,
  items,
  isDropDisabled,
  isColumnGrayedOut,
  handleCardClick,
  renderCardHeader,
  renderCardDetails,
  width
}) => (
  <ColumnWrapper {...{ width }}>
    <ColumnHeader>
      <ColumnTitle>{title}</ColumnTitle>
      <ItemsNumber isColumnGrayedOut={isColumnGrayedOut}>
        {items.length}
      </ItemsNumber>
    </ColumnHeader>
    <Droppable droppableId={id} isDropDisabled={isDropDisabled}>
      {provided => (
        <ItemsWrapper
          {...provided.droppableProps}
          ref={provided.innerRef}
          isDropDisabled={isDropDisabled}
          isColumnGrayedOut={isColumnGrayedOut}
        >
          <Cards
            {...{
              items,
              isColumnGrayedOut,
              handleCardClick,
              renderCardHeader,
              renderCardDetails
            }}
          />
          {provided.placeholder}
        </ItemsWrapper>
      )}
    </Droppable>
  </ColumnWrapper>
);

Column.propTypes = {
  t: func.isRequired,
  id: string.isRequired,
  title: string.isRequired,
  items: arrayOf(shape()).isRequired,
  isDropDisabled: bool,
  isColumnGrayedOut: bool,
  handleCardClick: func,
  renderCardHeader: func.isRequired,
  renderCardDetails: func.isRequired,
  width: number
};

Column.defaultProps = {
  isDropDisabled: false,
  isColumnGrayedOut: false,
  handleCardClick: undefined,
  width: undefined
};

export default Column;
