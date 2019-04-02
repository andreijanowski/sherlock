import { PureComponent } from "react";
import { Modal } from "components";
import { shape, func, bool } from "prop-types";
import EventDetails from "./EventDetails";
import EventChooser from "./EventChooser";

class EventModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      event: props.event.resource.length ? undefined : props.event
    };
  }

  chooseEvent = event => this.setState({ event });

  render() {
    const { event, isOpen, onClose, t } = this.props;
    const { event: choosedEvent } = this.state;
    return (
      <Modal {...{ open: isOpen, onClose }}>
        {choosedEvent ? (
          <EventDetails {...{ event: choosedEvent, t }} />
        ) : (
          <EventChooser {...{ event, t, chooseEvent: this.chooseEvent }} />
        )}
      </Modal>
    );
  }
}

EventModal.propTypes = {
  event: shape().isRequired,
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  t: func.isRequired
};

export default EventModal;
