import BigCalendar from "react-big-calendar";
import moment from "moment";
import { CalendarEvent, CalendarToolbar } from "components";
import CalendarStyles from "../calendarStyles";
import { CalendarWrapper } from "../styled";

const localizer = BigCalendar.momentLocalizer(moment);

const getRandomIntInclusive = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomMoment = (i, startDay, minHour, maxHour) => {
  const now = new Date();
  const day = startDay || getRandomIntInclusive(i * 3, i * 3 + 3);
  const hour = getRandomIntInclusive(minHour, maxHour);
  const date = new Date(now.getFullYear(), now.getMonth(), day, hour);
  return date;
};

const mockEvents = () => {
  const events = [];

  for (let i = 0; i < 10; i += 1) {
    const start = getRandomMoment(i, undefined, 0, 6);
    const end = getRandomMoment(i, start.getDate(), start.getHours(), 12);
    events.push({
      title: `Conference ${i}`,
      start,
      end,
      allDay: false,
      resource: "https://foodetective.co"
    });
  }

  return events;
};

const Month = () => (
  <CalendarWrapper height="550">
    <CalendarStyles />
    <BigCalendar
      localizer={localizer}
      components={{
        event: CalendarEvent,
        toolbar: CalendarToolbar
      }}
      defaultView="month"
      events={mockEvents()}
      startAccessor="start"
      endAccessor="end"
    />
  </CalendarWrapper>
);

export default Month;
