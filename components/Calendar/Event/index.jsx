import { PureComponent } from "react";
import { shape, func } from "prop-types";
import { BoldText } from "components";
import { Text, Wrapper } from "./styled";
import EventModal from "./EventModal";

class Event extends PureComponent {
  state = {
    isModalVisible: false
  };

  openModal = () => this.setState({ isModalVisible: true });

  closeModal = () => this.setState({ isModalVisible: false });

  render() {
    const { event, t } = this.props;
    const { isModalVisible } = this.state;
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
        <EventModal
          {...{ open: isModalVisible, onClose: this.closeModal, event, t }}
        />
      </>
    );
  }
}

Event.propTypes = {
  event: shape().isRequired,
  t: func.isRequired
};

export default Event;
