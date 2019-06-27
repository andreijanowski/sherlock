import { shape, func } from "prop-types";
import moment from "moment";
import { BoldText } from "components";
import { Header, MainInfo, Name, Details, Text, EventWrapper } from "./styled";
import { parseDateTime } from "../utils";

const EventDetails = ({ t, event, chooseEvent }) => (
  <>
    <Header>
      <MainInfo>
        <Name>{t("events:chooseEvent")}</Name>
      </MainInfo>
    </Header>
    <Details>
      {event.resource.map(e => (
        <EventWrapper onClick={() => chooseEvent(e)} key={e.resource.id}>
          <Text>{e.resource.name}</Text>
          <Text>
            <BoldText>{`${moment(e.resource.date).format("Do MMMM")}, 
            ${parseDateTime(
              e.resource.date,
              e.resource.realFrom || e.resource.from
            )} - ${parseDateTime(e.resource.date, e.resource.to)} `}</BoldText>
          </Text>
        </EventWrapper>
      ))}
    </Details>
  </>
);

EventDetails.propTypes = {
  event: shape().isRequired,
  t: func.isRequired,
  chooseEvent: func.isRequired
};

export default EventDetails;
