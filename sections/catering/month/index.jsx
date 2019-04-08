import { func, arrayOf, shape, string } from "prop-types";
import { BigCalendar } from "components";
import { CalendarWrapper } from "../styled";

const Month = ({
  t,
  lng,
  caterings,
  currency,
  timeZone,
  setEditedCatering,
  sendOffer
}) => (
  <CalendarWrapper height="620">
    {timeZone && (
      <BigCalendar
        {...{
          t,
          lng,
          caterings,
          currency,
          defaultView: "month",
          timeZone,
          setEditedCatering,
          sendOffer
        }}
      />
    )}
  </CalendarWrapper>
);

Month.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  setEditedCatering: func.isRequired,
  sendOffer: func.isRequired,
  currency: string,
  caterings: arrayOf(shape()),
  timeZone: string
};

Month.defaultProps = {
  caterings: null,
  currency: "EUR",
  timeZone: null
};

export default Month;
