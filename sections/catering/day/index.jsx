import { func, shape, string } from "prop-types";
import { BigCalendar } from "components";
import { CalendarWrapper } from "../styled";
import TimezoneNotDefined from "../TimezoneNotDefined";

const Day = ({
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
          defaultView: "day",
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

Day.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  setEditedCatering: func.isRequired,
  sendOffer: func.isRequired,
  currency: string,
  caterings: shape(),
  addresses: shape(),
  timeZone: string
};

Day.defaultProps = {
  caterings: null,
  addresses: null,
  currency: "EUR",
  timeZone: null
};

export default Day;
