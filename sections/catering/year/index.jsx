import { CalendarToolbar } from "components";
import Calendar from "components/Calendar/FullYear/Calendar";
import moment from "moment";
import { CalendarWrapper } from "../styled";

const getRandomIntInclusive = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomMoment = (i, startDay, minHour, maxHour) => {
  const now = new Date();
  const day = startDay || getRandomIntInclusive(0, 365);
  const month = getRandomIntInclusive(0, 11);
  const hour = getRandomIntInclusive(minHour, maxHour);
  const date = new Date(now.getFullYear(), month, day, hour);
  return date;
};

const mockEvents = () => {
  const events = [];

  for (let i = 0; i < 200; i += 1) {
    const start = getRandomMoment(i, undefined, 0, 12);
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

const Week = () => (
  <CalendarWrapper>
    <CalendarToolbar
      label={moment()
        .startOf("year")
        .format("YYYY")}
    />
    <Calendar
      startDate={moment().startOf("year")}
      endDate={moment().endOf("year")}
      events={mockEvents()}
    />
  </CalendarWrapper>
);

export default Week;
