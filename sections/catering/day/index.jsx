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
  const day = now.getDate();
  const hour = getRandomIntInclusive(minHour, maxHour);
  const date = new Date(now.getFullYear(), now.getMonth(), day, hour);
  return date;
};

const mockEvents = () => {
  const events = [];

  for (let i = 0; i < 10; i += 1) {
    const start = getRandomMoment(i, undefined, 0, i * 2);
    const end = getRandomMoment(i, start.getDate(), start.getHours(), 24);
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

const Day = () => (
  <CalendarWrapper height="1500">
    <CalendarStyles />
    <BigCalendar
      localizer={localizer}
      components={{
        event: CalendarEvent,
        toolbar: CalendarToolbar
      }}
      defaultView="day"
      events={mockEvents()}
      startAccessor="start"
      endAccessor="end"
      step={60}
      timeslots={1}
    />
  </CalendarWrapper>
);

export default Day;
