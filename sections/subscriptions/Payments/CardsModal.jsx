import { Modal, H3 } from "components";
import { shape, func, bool, arrayOf } from "prop-types";
import Card from "./Card";

const CardsModal = ({ cards, isOpen, onClose, t }) => (
  <Modal {...{ open: isOpen, onClose }}>
    <H3>{t("selectCardForPayment")}</H3>
    {cards.map(c => (
      <Card {...c} key={c.id} />
    ))}
  </Modal>
);

CardsModal.propTypes = {
  cards: arrayOf(shape()).isRequired,
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  t: func.isRequired
};

export default CardsModal;
