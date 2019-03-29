import BigCalendar from "react-big-calendar";
import { func, arrayOf, shape, string } from "prop-types";
import { CalendarEvent, CalendarToolbar } from "components";
import { parseCaterings, localizer } from "../utils";
import CalendarStyles from "../calendarStyles";
import { CalendarWrapper } from "../styled";

const Week = ({ t, caterings, currency }) => (
  <CalendarWrapper height="1500">
    <CalendarStyles />
    <BigCalendar
      localizer={localizer}
      components={{
        event: p => <CalendarEvent {...{ t, ...p }} />,
        toolbar: CalendarToolbar
      }}
      defaultView="week"
      events={parseCaterings(caterings, currency)}
      startAccessor="start"
      endAccessor="end"
      step={60}
      timeslots={1}
    />
  </CalendarWrapper>
);

Week.propTypes = {
  t: func.isRequired,
  currency: string,
  caterings: arrayOf(shape())
};

Week.defaultProps = {
  caterings: null,
  currency: "EUR"
};

export default Week;
