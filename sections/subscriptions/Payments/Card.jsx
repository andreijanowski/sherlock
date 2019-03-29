import { Box } from "@rebass/grid";
import { string, func } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CardWrapper } from "./styled";
import { selectCardIcon } from "./utils";

const Card = ({ id, last4, brand, chooseCard, onClose }) => (
  <CardWrapper
    onClick={() => {
      chooseCard(id);
      onClose();
    }}
  >
    <FontAwesomeIcon icon={selectCardIcon(brand)} size="2x" color="" />
    <Box pl={3}>﹡﹡﹡﹡ ﹡﹡﹡﹡ ﹡﹡﹡﹡ {last4}</Box>
  </CardWrapper>
);

Card.propTypes = {
  id: string.isRequired,
  last4: string.isRequired,
  brand: string.isRequired,
  chooseCard: func.isRequired,
  onClose: func.isRequired
};

export default Card;
