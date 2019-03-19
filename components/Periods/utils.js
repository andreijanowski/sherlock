const parseTime = time => {
  const hour24 = Math.floor(time / 60 / 60);
  const hour = hour24 > 12 ? hour24 - 12 : hour24;
  const minute = `0${(time / 60) % 60}`.slice(-2);
  const meridiem = hour24 !== hour ? "pm" : "am";

  return {
    hour24,
    hour,
    minute,
    meridiem,
    formatted: `${hour}:${minute} ${meridiem}`
  };
};

const timeToNumber = ({ hour24, minute }) => hour24 * 60 * 60 + minute * 60;

export const parsePeriods = periods => {
  const days = {};
  if (periods) {
    periods.forEach(p => {
      if (days[`day-${p.weekday}`]) {
        days[`day-${p.weekday}`].push({
          id: p.id,
          location: p.location,
          openedFrom: parseTime(p.openedFrom),
          openedTo: parseTime(p.openedTo),
          weekday: p.weekday
        });
      } else {
        days[`day-${p.weekday}`] = [
          {
            id: p.id,
            location: p.location,
            openedFrom: parseTime(p.openedFrom),
            openedTo: parseTime(p.openedTo),
            weekday: p.weekday
          }
        ];
      }
    });
  }
  return days;
};

export const weekdays = [1, 2, 3, 4, 5, 6, 0];

export const parsePeriod = period => ({
  location: period.location,
  openedFrom: timeToNumber(period.openedFrom),
  openedTo: timeToNumber(period.openedTo),
  weekday: period.weekday
});

export const addNewPeriod = (addPeriod, fields, weekday) => {
  const defaultTime = {
    formatted: "12:00 am",
    formatted24: "0:00",
    formattedSimple: "12:00",
    hour: 12,
    hour24: 0,
    meridiem: "am",
    minute: 0
  };
  const newPeriod = {
    openedFrom: defaultTime,
    openedTo: defaultTime,
    weekday
  };
  addPeriod(newPeriod);
};
