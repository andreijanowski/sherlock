import { shape } from "prop-types";
import { BoldText } from "components";
import { Text } from "./styled";

const Event = ({ event }) => (
  <>
    <Text>{event.title}</Text>
    <Text>
      <BoldText>
        {event.start.getHours()} - {event.end.getHours()} pm
      </BoldText>
    </Text>
  </>
);

Event.propTypes = {
  event: shape().isRequired
};

export default Event;
