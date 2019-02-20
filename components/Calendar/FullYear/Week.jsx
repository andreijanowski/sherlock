import { shape, arrayOf } from "prop-types";
import { daysOfWeek } from "./dateUtils";
import Day from "./Day";
import { Week } from "./styled";

const CalendarWeek = ({ date, events, edges }) => (
  <Week>
    {daysOfWeek(date, events).map(d => (
      <Day
        outside={
          !!edges.find(edge => edge.isSame(d.date, "month", "week", "year"))
        }
        key={d.date.toString()}
        date={d.date}
        events={d.events}
      />
    ))}
  </Week>
);

CalendarWeek.propTypes = {
  date: shape().isRequired,
  events: arrayOf(shape()).isRequired,
  edges: arrayOf(shape()).isRequired
};

export default CalendarWeek;
