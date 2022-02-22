import { shape, bool, string, arrayOf } from "prop-types";
import { Router } from "routes";
import { Day, Event } from "./styled";

const CalendarDay = ({ date, outside, dayFormat, events, lng }) => (
  <Day
    {...{ outside }}
    onClick={() =>
      Router.pushRoute(
        `/${lng}/app/events-management/catering/day?date=${date.format(
          "YYYY-MM-DD"
        )}`
      )
    }
  >
    {date.format(dayFormat)}
    {events.length !== 0 && <Event />}
  </Day>
);

CalendarDay.propTypes = {
  date: shape().isRequired,
  events: arrayOf(shape()).isRequired,
  lng: string.isRequired,
  dayFormat: string,
  outside: bool
};

CalendarDay.defaultProps = {
  dayFormat: "D",
  outside: false
};

export default CalendarDay;
