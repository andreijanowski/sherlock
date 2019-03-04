import { shape, bool, string, arrayOf } from "prop-types";
import { Day, Event } from "./styled";

const CalendarDay = ({ date, outside, dayFormat, events }) => (
  <Day {...{ outside }}>
    {date.format(dayFormat)}
    {events.length !== 0 && <Event />}
  </Day>
);

CalendarDay.propTypes = {
  date: shape().isRequired,
  events: arrayOf(shape()).isRequired,
  dayFormat: string,
  outside: bool
};

CalendarDay.defaultProps = {
  dayFormat: "D",
  outside: false
};

export default CalendarDay;
