import { shape } from "prop-types";
import { BoldText } from "components";
import { Text, Wrapper } from "./styled";
import { parseDateTime } from "../utils";

const Event = ({ event }) => (
  <Wrapper>
    <Text>{event.title}</Text>
    <Text>
      <BoldText>
        {!event.resource.length &&
          `${parseDateTime(
            event.date,
            event.resource.realFrom || event.resource.from
          )} - ${parseDateTime(event.date, event.resource.to)} `}
      </BoldText>
    </Text>
  </Wrapper>
);

Event.propTypes = {
  event: shape().isRequired
};

export default Event;
