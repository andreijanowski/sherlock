import { func, arrayOf, shape, string } from "prop-types";
import { BigCalendar } from "components";
import { CalendarWrapper } from "../styled";

const Week = ({ t, lng, caterings, currency, timeZone, setEditedCatering }) => (
  <CalendarWrapper height="1500">
    {timeZone && (
      <BigCalendar
        {...{
          t,
          lng,
          caterings,
          currency,
          defaultView: "week",
          timeZone,
          setEditedCatering
        }}
      />
    )}
  </CalendarWrapper>
);

Week.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  setEditedCatering: func.isRequired,
  currency: string,
  caterings: arrayOf(shape()),
  timeZone: string
};

Week.defaultProps = {
  caterings: null,
  currency: "EUR",
  timeZone: null
};

export default Week;
