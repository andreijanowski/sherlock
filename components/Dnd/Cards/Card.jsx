import { Draggable } from "react-beautiful-dnd";
import { number, string, func, bool } from "prop-types";
import { Wrapper, Header, Details } from "./styled";

const Card = ({
  id,
  isCardGrayedOut,
  index,
  renderHeader,
  renderDetails,
  handleCardClick
}) => (
  <Draggable draggableId={id} index={index}>
    {provided => (
      <Wrapper
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        isCardGrayedOut={isCardGrayedOut}
        onClick={handleCardClick}
      >
        <Header>{renderHeader()}</Header>
        <Details>{renderDetails()}</Details>
      </Wrapper>
    )}
  </Draggable>
);

Card.propTypes = {
  id: string.isRequired,
  index: number.isRequired,
  renderHeader: func.isRequired,
  renderDetails: func.isRequired,
  handleCardClick: func,
  isCardGrayedOut: bool
};

Card.defaultProps = {
  handleCardClick: undefined,
  isCardGrayedOut: false
};

export default Card;
