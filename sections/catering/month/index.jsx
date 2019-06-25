import { func, shape, string } from "prop-types";
import { BigCalendar } from "components";
import { CalendarWrapper } from "../styled";
import TimezoneNotDefined from "../TimezoneNotDefined";

const Month = ({
  t,
  lng,
  caterings,
  addresses,
  currency,
  timeZone,
  setEditedCatering,
  sendOffer
}) => (
  <CalendarWrapper height="620">
    {timeZone ? (
      <BigCalendar
        {...{
          t,
          lng,
          caterings,
          addresses,
          currency,
          defaultView: "month",
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

Month.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  setEditedCatering: func.isRequired,
  sendOffer: func.isRequired,
  currency: string,
  caterings: shape(),
  addresses: shape(),
  timeZone: string
};

Month.defaultProps = {
  caterings: null,
  addresses: null,
  currency: "EUR",
  timeZone: null
};

export default Month;
