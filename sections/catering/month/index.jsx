import { func, arrayOf, shape, string } from "prop-types";
import { BigCalendar } from "components";
import { CalendarWrapper } from "../styled";

const Month = ({ t, caterings, currency, timeZone }) => (
  <CalendarWrapper height="620">
    {timeZone && (
      <BigCalendar
        {...{ t, caterings, currency, defaultView: "month", timeZone }}
      />
    )}
  </CalendarWrapper>
);

Month.propTypes = {
  t: func.isRequired,
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
