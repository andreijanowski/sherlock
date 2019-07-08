import { Component } from "react";
import { shape, string, arrayOf, func, bool } from "prop-types";
import Card from "./Card";

class Cards extends Component {
  shouldComponentUpdate(nextProps) {
    const { items } = this.props;
    const { items: nextItems } = nextProps;
    if (items === nextItems) {
      return false;
    }
    return true;
  }

  render() {
    const {
      items,
      isColumnGrayedOut,
      handleCardClick,
      renderCardHeader,
      renderCardDetails
    } = this.props;
    if (items && items.length !== 0) {
      return (
        <>
          {items.map((item, index) =>
            item && item.get("id") ? (
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
            ) : null
          )}
        </>
      );
    }
    return null;
  }
}

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

export default Cards;
