import { memo } from "react";
import { shape, string, arrayOf, func, bool } from "prop-types";
import Card from "./Card";

const Cards = ({
  items,
  isColumnGrayedOut,
  handleCardClick,
  renderCardHeader,
  renderCardDetails
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
                renderHeader: () => renderCardHeader(item.get("id")),
                renderDetails: () => renderCardDetails(item.get("id")),
                handleCardClick: () => handleCardClick(item.get("id"))
              }}
            />
          )) ||
          null
      )
    : null;

Cards.propTypes = {
  t: func.isRequired,
  id: string.isRequired,
  items: arrayOf(shape()).isRequired,
  isColumnGrayedOut: bool,
  handleCardClick: func,
  renderCardHeader: func.isRequired,
  renderCardDetails: func.isRequired
};

Cards.defaultProps = {
  isColumnGrayedOut: false,
  handleCardClick: undefined
};

const arePropsEqual = ({ items: prevItems }, { items: nextItems }) =>
  prevItems === nextItems;

export default memo(Cards, arePropsEqual);
