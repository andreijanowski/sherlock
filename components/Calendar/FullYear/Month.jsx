import { string, shape, arrayOf } from "prop-types";
import { monthEdges, weeksOfMonth, daysOfWeek } from "./dateUtils";
import Week from "./Week";
import { WeekDay, WeekDays, Month, MonthName } from "./styled";

const CalendarMonth = ({ date, events, weekdayFormat, monthNameFormat }) => (
  <Month>
    <MonthName>{date.format(monthNameFormat)}</MonthName>
    <WeekDays>
      {daysOfWeek(date).map(d => (
        <WeekDay key={d.date.toString()}>
          {d.date.format(weekdayFormat)}
        </WeekDay>
      ))}
    </WeekDays>
    {weeksOfMonth(date, events).map(w => (
      <Week
        key={w.date.toString()}
        date={w.date}
        events={w.events}
        edges={monthEdges(date)}
      />
    ))}
  </Month>
);

CalendarMonth.propTypes = {
  monthNameFormat: string,
  weekdayFormat: string,
  date: shape().isRequired,
  events: arrayOf(shape()).isRequired
};

CalendarMonth.defaultProps = {
  monthNameFormat: "MMMM",
  weekdayFormat: "dd"
};

export default CalendarMonth;
