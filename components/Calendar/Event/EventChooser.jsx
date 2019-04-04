import { shape, func } from "prop-types";
import moment from "moment";
import { BoldText } from "components";
import { Header, MainInfo, Name, Details, Text, EventWrapper } from "./styled";

const EventDetails = ({ t, event, chooseEvent }) => (
  <>
    <Header>
      <MainInfo>
        <Name>{t("chooseEvent")}</Name>
      </MainInfo>
    </Header>
    <Details>
      {event.resource.map(e => (
        <EventWrapper onClick={() => chooseEvent(e)} key={e.resource.id}>
          <Text>{e.resource.name}</Text>
          <Text>
            <BoldText>{`${moment(e.resource.date).format("Do MMMM")}, ${moment(
              e.resource.date
            )
              .hour(0)
              .minute(0)
              .second(e.resource.realFrom || e.resource.from)
              .format("h:mm a")} - ${moment(e.resource.date)
              .hour(0)
              .minute(0)
              .second(e.resource.to)
              .format("h:mm a")} `}</BoldText>
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
