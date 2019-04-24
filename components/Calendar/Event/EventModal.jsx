import { PureComponent } from "react";
import { Modal } from "components";
import { shape, func, bool, string } from "prop-types";
import EventDetails from "./EventDetails";
import EventChooser from "./EventChooser";
import { ModalContentWrapper } from "./styled";

class EventModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      event: props.event.resource.length ? undefined : props.event
    };
  }

  componentDidUpdate(prevProps) {
    const { event: prevEvent } = prevProps;
    const { event } = this.props;
    const { event: chosenEvent } = this.state;
    if (event !== prevEvent) {
      if (event.resource.id) {
        this.chooseEvent(event);
      } else {
        const updatedEvent = event.resource.find(
          e => e.resource.id === chosenEvent.resource.id
        );
        this.chooseEvent(updatedEvent);
      }
    }
  }

  chooseEvent = event => this.setState({ event });

  render() {
    const {
      event,
      isOpen,
      onClose,
      t,
      lng,
      setEditedCatering,
      sendOffer
    } = this.props;
    const { event: chosenEvent } = this.state;
    return (
      <Modal {...{ open: isOpen, onClose }}>
        <ModalContentWrapper>
          {chosenEvent ? (
            <EventDetails
              {...{ event: chosenEvent, t, lng, setEditedCatering, sendOffer }}
            />
          ) : (
            <EventChooser {...{ event, t, chooseEvent: this.chooseEvent }} />
          )}
        </ModalContentWrapper>
      </Modal>
    );
  }
}

EventModal.propTypes = {
  event: shape().isRequired,
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  lng: string.isRequired,
  t: func.isRequired,
  setEditedCatering: func.isRequired,
  sendOffer: func.isRequired
};

export default EventModal;
