export const parseTime = time => {
  const hour24 = Math.floor(time / 60 / 60) % 24;
  const hour = hour24 > 12 ? hour24 - 12 : hour24;
  const minute = `0${(time / 60) % 60}`.slice(-2);
  const meridiem = hour24 !== hour || hour === 12 ? "pm" : "am";

  return {
    hour24,
    hour,
    minute,
    meridiem,
    formatted: `${hour === 0 ? 12 : hour}:${minute} ${meridiem}`
  };
};

export const timeToNumber = ({ hour24, minute }, startOrEnd) => {
  const timeInSeconds = hour24 * 60 * 60 + minute * 60;
  if (startOrEnd === "end" && timeInSeconds === 0) {
    return 86400;
  }
  return timeInSeconds;
};

export const parsePeriods = periods => {
  const days = {};
  if (periods && periods.forEach) {
    periods.forEach(p => {
      if (days[`day-${p.getIn(["attributes", "weekday"])}`]) {
        days[`day-${p.getIn(["attributes", "weekday"])}`].push({
          id: p.get("id"),
          location: p.getIn(["attributes", "location"]),
          openedFrom: parseTime(p.getIn(["attributes", "openedFrom"])),
          openedTo: parseTime(p.getIn(["attributes", "openedTo"])),
          weekday: p.getIn(["attributes", "weekday"])
        });
      } else {
        days[`day-${p.getIn(["attributes", "weekday"])}`] = [
          {
            id: p.get("id"),
            location: p.getIn(["attributes", "location"]),
            openedFrom: parseTime(p.getIn(["attributes", "openedFrom"])),
            openedTo: parseTime(p.getIn(["attributes", "openedTo"])),
            weekday: p.getIn(["attributes", "weekday"])
          }
        ];
      }
    });
  }
  Object.entries(days).forEach(([key, value]) => {
    days[key] = value.sort((a, b) => {
      const aFrom = timeToNumber(a.openedFrom);
      const bFrom = timeToNumber(b.openedFrom);
      if (aFrom > bFrom) {
        return 1;
      }
      if (aFrom < bFrom) {
        return -1;
      }
      return 0;
    });
  });
  return days;
};

export const weekdays = [1, 2, 3, 4, 5, 6, 0];

export const parsePeriod = period => ({
  location: period.location,
  openedFrom: timeToNumber(period.openedFrom, "start"),
  openedTo: timeToNumber(period.openedTo, "end"),
  weekday: period.weekday
});

export const addNewPeriod = (addPeriod, weekday) => {
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
  addPeriod(parsePeriod(newPeriod));
};

export const preparePeriodUpdate = value => {
  let newPeriod;
  let updatedPeriod = parsePeriod(value);
  if (updatedPeriod.openedFrom > updatedPeriod.openedTo) {
    newPeriod = {
      ...updatedPeriod,
      openedFrom: 0,
      weekday: (updatedPeriod.weekday + 1) % 7
    };
    updatedPeriod = {
      ...updatedPeriod,
      openedTo: 86400
    };
  }
  updatedPeriod = {
    ...updatedPeriod,
    id: value.id
  };
  return { newPeriod, updatedPeriod };
};

export const isMovableBusiness = groups =>
  groups.some(
    g =>
      g.name === "Food Court" ||
      g.name === "Food Festival" ||
      g.name === "Food Stand" ||
      g.name === "Food Truck" ||
      g.name === "Ice Cream Stand" ||
      g.name === "Street Food"
  );
