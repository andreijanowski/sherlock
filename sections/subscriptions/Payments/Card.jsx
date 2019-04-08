import { Box } from "@rebass/grid";
import { string, func, bool } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CardWrapper } from "./styled";
import { selectCardIcon } from "./utils";

const Card = ({ id, last4, brand, disabled, chooseCard, onClose }) => (
  <CardWrapper
    disabled={disabled}
    onClick={
      !disabled
        ? () => {
            chooseCard(id);
            onClose();
          }
        : undefined
    }
  >
    <FontAwesomeIcon icon={selectCardIcon(brand)} size="2x" color="" />
    <Box pl={3}>﹡﹡﹡﹡ ﹡﹡﹡﹡ ﹡﹡﹡﹡ {last4}</Box>
  </CardWrapper>
);

Card.propTypes = {
  id: string.isRequired,
  last4: string.isRequired,
  brand: string.isRequired,
  chooseCard: func,
  onClose: func,
  disabled: bool
};

Card.defaultProps = {
  chooseCard: null,
  onClose: null,
  disabled: false
};

export default Card;
