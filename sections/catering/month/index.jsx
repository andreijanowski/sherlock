import BigCalendar from "react-big-calendar";
import moment from "moment";
import { func } from "prop-types";
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
      title: "Italian Food",
      start,
      end,
      allDay: false,
      resource: {
        start,
        end,
        name: "Italian Food",
        price: `$${getRandomIntInclusive(1100, 50000)}`,
        servings: getRandomIntInclusive(100, 500),
        type: "Marriage",
        waiters: getRandomIntInclusive(10, 20),
        cutlery: !!getRandomIntInclusive(0, 1),
        chef: !!getRandomIntInclusive(0, 1),
        specifications: "Gluten Free",
        additional: "Don’t serve white bread.",
        location: { lat: 46.2008138, lng: 6.1560229 }
      }
    });
  }

  return events;
};

const Month = ({ t }) => (
  <CalendarWrapper height="550">
    <CalendarStyles />
    <BigCalendar
      localizer={localizer}
      components={{
        event: p => <CalendarEvent {...{ t, ...p }} />,
        toolbar: CalendarToolbar
      }}
      defaultView="month"
      events={mockEvents()}
      startAccessor="start"
      endAccessor="end"
    />
  </CalendarWrapper>
);

Month.propTypes = {
  t: func.isRequired
};

export default Month;
