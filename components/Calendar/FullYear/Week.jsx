import { shape, arrayOf, string } from "prop-types";
import { daysOfWeek } from "./dateUtils";
import Day from "./Day";
import { Week } from "./styled";

const CalendarWeek = ({ date, events, edges, lng }) => (
  <Week>
    {daysOfWeek(date, events).map(d => (
      <Day
        outside={
          !!edges.find(edge => edge.isSame(d.date, "month", "week", "year"))
        }
        key={d.date.toString()}
        date={d.date}
        events={d.events}
        lng={lng}
      />
    ))}
  </Week>
);

CalendarWeek.propTypes = {
  date: shape().isRequired,
  events: arrayOf(shape()).isRequired,
  edges: arrayOf(shape()).isRequired,
  lng: string.isRequired
};

export default CalendarWeek;
