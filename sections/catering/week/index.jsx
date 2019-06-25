import { func, shape, string } from "prop-types";
import { BigCalendar } from "components";
import { CalendarWrapper } from "../styled";
import TimezoneNotDefined from "../TimezoneNotDefined";

const Week = ({
  t,
  lng,
  caterings,
  addresses,
  currency,
  timeZone,
  setEditedCatering,
  sendOffer
}) => (
  <CalendarWrapper height="1500">
    {timeZone ? (
      <BigCalendar
        {...{
          t,
          lng,
          caterings,
          addresses,
          currency,
          defaultView: "week",
          timeZone,
          setEditedCatering,
          sendOffer
        }}
      />
    ) : (
      <TimezoneNotDefined {...{ t }} />
    )}
  </CalendarWrapper>
);

Week.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  setEditedCatering: func.isRequired,
  sendOffer: func.isRequired,
  currency: string,
  caterings: shape(),
  addresses: shape(),
  timeZone: string
};

Week.defaultProps = {
  caterings: null,
  addresses: null,
  currency: "EUR",
  timeZone: null
};

export default Week;
