export const weekdays = [1, 2, 3, 4, 5, 6, 0];

// we store our hours in seconds from midnight
export const defaultOpenTime = 0;
// 23 hours 59 minutes as seconds
export const defaultCloseTime = 60 * 60 * 23 + 60 * 59;

export const parsePeriods = periods => {
  const days = {};
  if (periods && periods.forEach) {
    periods.forEach(p => {
      const dayKey = `day-${p.getIn(["attributes", "weekday"])}`;

      if (!days[dayKey]) {
        days[dayKey] = [];
      }

      days[dayKey].push({
        id: p.get("id"),
        location: p.getIn(["attributes", "location"]),
        openedFrom: p.getIn(["attributes", "openedFrom"]),
        openedTo: p.getIn(["attributes", "openedTo"]),
        weekday: p.getIn(["attributes", "weekday"])
      });
    });
  }
  Object.entries(days).forEach(([key, value]) => {
    days[key] = value.sort((a, b) => {
      const haveDefaultValues = entry =>
        entry.openedFrom === defaultOpenTime &&
        entry.openedTo === defaultCloseTime;
      if (haveDefaultValues(a)) {
        return 1;
      }
      if (haveDefaultValues(b)) {
        return -1;
      }
      return a.openedFrom - b.openedFrom;
    });
  });
  return days;
};

export const addNewPeriod = (addPeriod, weekday, formValues) => {
  let prevWeekdayData;

  if (formValues) {
    // trying to get prev weekday data to copy it to current weekday if possible
    const currentWeekdayIndex = weekdays.indexOf(weekday);
    let prevWeekdayIndex = currentWeekdayIndex - 1;
    while (!prevWeekdayData && prevWeekdayIndex >= 0) {
      const prevWeekday = weekdays[prevWeekdayIndex];
      prevWeekdayData = formValues[`day-${prevWeekday}`];
      prevWeekdayIndex -= 1;
    }
  }

  if (!prevWeekdayData) {
    const newPeriod = {
      openedFrom: defaultOpenTime,
      openedTo: defaultCloseTime,
      weekday
    };
    return addPeriod(newPeriod);
  }

  return Promise.all(
    prevWeekdayData.map(p => {
      const newPeriod = {
        openedFrom: p.openedFrom,
        openedTo: p.openedTo,
        weekday
      };
      return addPeriod(newPeriod);
    })
  );
};

export const preparePeriodUpdate = (value, fields) => {
  const lastShift = fields.length > 1 && fields[fields.length - 2];
  let updatedPeriod = value;
  let idToDelete;

  if (
    lastShift &&
    updatedPeriod.weekday === lastShift.weekday &&
    updatedPeriod.openedFrom === defaultOpenTime &&
    lastShift.openedTo === defaultCloseTime
  ) {
    updatedPeriod = {
      ...updatedPeriod,
      openedFrom: lastShift.openedFrom
    };
    idToDelete = lastShift.id;
  }
  updatedPeriod = {
    ...updatedPeriod,
    id: value.id
  };
  return { updatedPeriod, idToDelete };
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

export const checkIfAlwaysOpen = values => {
  let counter = 0;

  if (Object.keys(values).length === 0 || Object.keys(values).length < 7) {
    return false;
  }

  weekdays.forEach(weekday => {
    if (
      values[`day-${weekday}`][0].openedFrom === 0 &&
      values[`day-${weekday}`][0].openedTo === defaultCloseTime
    ) {
      counter += 1;
    }
  });

  return counter === 7;
};
