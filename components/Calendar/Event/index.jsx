import { shape } from "prop-types";
import { BoldText } from "components";
import moment from "moment";
import { Text, Wrapper } from "./styled";

const Event = ({ event }) => (
  <Wrapper>
    <Text>{event.title}</Text>
    <Text>
      <BoldText>
        {!event.resource.length &&
          `${moment(event.date)
            .hour(0)
            .minute(0)
            .second(event.resource.realFrom || event.resource.from)
            .format("h:mm a")} - ${moment(event.date)
            .hour(0)
            .minute(0)
            .second(event.resource.to)
            .format("h:mm a")} `}
      </BoldText>
    </Text>
  </Wrapper>
);

Event.propTypes = {
  event: shape().isRequired
};

export default Event;
