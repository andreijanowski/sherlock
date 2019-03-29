import BigCalendar from "react-big-calendar";
import { func, arrayOf, shape, string } from "prop-types";
import { CalendarEvent, CalendarToolbar } from "components";
import CalendarStyles from "../calendarStyles";
import { CalendarWrapper } from "../styled";
import { parseCaterings, localizer } from "../utils";

const Month = ({ t, caterings, currency }) => (
  <CalendarWrapper height="620">
    <CalendarStyles />
    <BigCalendar
      localizer={localizer}
      components={{
        event: p => <CalendarEvent {...{ t, ...p }} />,
        toolbar: CalendarToolbar
      }}
      defaultView="month"
      events={parseCaterings(caterings, currency)}
      startAccessor="start"
      endAccessor="end"
    />
  </CalendarWrapper>
);

Month.propTypes = {
  t: func.isRequired,
  currency: string,
  caterings: arrayOf(shape())
};

Month.defaultProps = {
  caterings: null,
  currency: "EUR"
};

export default Month;
