import BigCalendar from "react-big-calendar";
import { func, arrayOf, shape, string } from "prop-types";
import { CalendarEvent, CalendarToolbar } from "components";
import CalendarStyles from "../calendarStyles";
import { CalendarWrapper } from "../styled";
import { parseCaterings, localizer } from "../utils";

const Day = ({ t, caterings, currency }) => (
  <CalendarWrapper height="1500">
    <CalendarStyles />
    <BigCalendar
      localizer={localizer}
      components={{
        event: p => <CalendarEvent {...{ t, ...p }} />,
        toolbar: CalendarToolbar
      }}
      defaultView="day"
      events={parseCaterings(caterings, currency)}
      startAccessor="start"
      endAccessor="end"
      step={60}
      timeslots={1}
    />
  </CalendarWrapper>
);

Day.propTypes = {
  t: func.isRequired,
  currency: string,
  caterings: arrayOf(shape())
};

Day.defaultProps = {
  caterings: null,
  currency: "EUR"
};

export default Day;
