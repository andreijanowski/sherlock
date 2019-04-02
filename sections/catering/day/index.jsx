import { func, arrayOf, shape, string } from "prop-types";
import { BigCalendar } from "components";
import { CalendarWrapper } from "../styled";

const Day = ({ t, caterings, currency, timeZone }) => (
  <CalendarWrapper height="1500">
    {timeZone && (
      <BigCalendar
        {...{ t, caterings, currency, defaultView: "day", timeZone }}
      />
    )}
  </CalendarWrapper>
);

Day.propTypes = {
  t: func.isRequired,
  currency: string,
  caterings: arrayOf(shape()),
  timeZone: string
};

Day.defaultProps = {
  caterings: null,
  currency: "EUR",
  timeZone: null
};

export default Day;
