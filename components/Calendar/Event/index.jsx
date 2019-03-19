import { PureComponent } from "react";
import { shape, func } from "prop-types";
import { BoldText } from "components";
import { Text, Wrapper } from "./styled";
import EventModal from "./EventModal";

class Event extends PureComponent {
  state = {
    isOpen: false
  };

  openModal = () => this.setState({ isOpen: true });

  closeModal = () => this.setState({ isOpen: false });

  render() {
    const { event, t } = this.props;
    const { isOpen } = this.state;
    return (
      <>
        <Wrapper onClick={this.openModal}>
          <Text>{event.title}</Text>
          <Text>
            <BoldText>
              {event.start.getHours()} - {event.end.getHours()} pm
            </BoldText>
          </Text>
        </Wrapper>
        <EventModal {...{ isOpen, onClose: this.closeModal, event, t }} />
      </>
    );
  }
}

Event.propTypes = {
  event: shape().isRequired,
  t: func.isRequired
};

export default Event;
