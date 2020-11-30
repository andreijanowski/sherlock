import { memo } from "react";
import { shape, string, arrayOf, func, bool } from "prop-types";
import Card from "../Card";

const Cards = ({
  items,
  splitedCard,
  isColumnGrayedOut,
  handleCardClick,
  renderCardHeader,
  renderCardDetails,
  renderCardFooter
}) =>
  items && items.length !== 0
    ? items.map(
        (item, index) =>
          (item && item.get("id") && (
            <Card
              {...{
                index,
                key: item.get("id"),
                id: item.get("id"),
                isCardGrayedOut: isColumnGrayedOut,
                isDragDisabled:
                  (splitedCard && !item.get("splited")) ||
                  item.get("fitsSlots") === false,
                isSplited: item.get("splited"),
                renderHeader: () => renderCardHeader(item.get("id")),
                renderDetails: opt => renderCardDetails(item.get("id"), opt),
                renderFooter: () => renderCardFooter(item.get("id")),
                handleCardClick: () => handleCardClick(item.get("id"))
              }}
            />
          )) ||
          null
      )
    : null;

Cards.propTypes = {
  t: func,
  id: string,
  items: arrayOf(shape()).isRequired,
  splitedCard: shape(),
  isColumnGrayedOut: bool,
  handleCardClick: func,
  renderCardHeader: func.isRequired,
  renderCardDetails: func.isRequired,
  renderCardFooter: func.isRequired
};

Cards.defaultProps = {
  t: () => null,
  id: "",
  isColumnGrayedOut: false,
  handleCardClick: undefined,
  splitedCard: undefined
};

const arePropsEqual = ({ items: prevItems }, { items: nextItems }) =>
  prevItems === nextItems;

export default memo(Cards, arePropsEqual);
