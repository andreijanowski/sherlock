import { func, arrayOf, shape, string } from "prop-types";
import { BigCalendar } from "components";
import { CalendarWrapper } from "../styled";

const Week = ({ t, caterings, currency, timeZone }) => (
  <CalendarWrapper height="1500">
    {timeZone && (
      <BigCalendar
        {...{ t, caterings, currency, defaultView: "week", timeZone }}
      />
    )}
  </CalendarWrapper>
);

Week.propTypes = {
  t: func.isRequired,
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
