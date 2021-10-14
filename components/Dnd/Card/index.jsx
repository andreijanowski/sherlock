import { Draggable } from "react-beautiful-dnd";
import { number, string, func, bool } from "prop-types";
import { Wrapper, Header, Details, Footer } from "./styled";

const Card = ({
  id,
  isCardGrayedOut,
  index,
  renderHeader,
  renderDetails,
  renderFooter,
  renderSource,
  handleCardClick,
  isDragDisabled,
  isSplited
}) => (
  <Draggable draggableId={id} index={index} isDragDisabled={isDragDisabled}>
    {provided => (
      <Wrapper
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        isCardGrayedOut={isCardGrayedOut || isDragDisabled}
        isSplited={isSplited}
        onClick={handleCardClick}
      >
        <Header isSplited={isSplited}>{renderHeader()}</Header>
        <Details isSplited={isSplited}>{renderDetails({ isSplited })}</Details>
        <>{renderSource()}</>
        <Footer isSplited={isSplited}>{renderFooter()}</Footer>
      </Wrapper>
    )}
  </Draggable>
);

Card.propTypes = {
  id: string.isRequired,
  index: number.isRequired,
  renderHeader: func.isRequired,
  renderDetails: func.isRequired,
  renderFooter: func.isRequired,
  renderSource: func,
  handleCardClick: func,
  isCardGrayedOut: bool,
  isDragDisabled: bool,
  isSplited: bool
};

Card.defaultProps = {
  handleCardClick: undefined,
  isCardGrayedOut: false,
  isDragDisabled: false,
  isSplited: false,
  renderSource: () => {}
};

export default Card;
