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

const parsePeriods = periods => {
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

export const getInitialValues = business => {
  if (business) {
    const { openPeriods } = business;

    return parsePeriods(openPeriods);
  }
  return undefined;
};

export const parseOpenPeriod = openPeriod => ({
  location: openPeriod.location,
  openedFrom: timeToNumber(openPeriod.openedFrom),
  openedTo: timeToNumber(openPeriod.openedTo),
  weekday: openPeriod.weekday
});

export const addNewOpenPeriod = async (addOpenPeriod, fields, weekday) => {
  try {
    const defaultTime = {
      hour24: 12,
      hour: 12,
      minute: 0,
      meridiem: "am",
      formatted: "12:00 am"
    };
    const newOpenPeriod = {
      openedFrom: defaultTime,
      openedTo: defaultTime,
      weekday
    };
    const res = await addOpenPeriod(newOpenPeriod);
    if (res.status === 201) {
      fields.push({
        ...newOpenPeriod,
        id: res.rawData.data.id
      });
    }
  } catch (e) {
    console.log(e);
  }
};
