const ONE_DAY_IN_SECONDS = 86400;

export const columnsList = {
  newReservations: "newReservations"
};

export const parseReservations = (reservations, tables, t) => {
  const columns = {
    newReservations: {
      id: columnsList.newReservations,
      title: t("newReservations"),
      reservationIds:
        reservations && reservations.size
          ? reservations
              .filter(o => o)
              .map(o => o.get("id"))
              .toList()
              .toArray()
          : []
    }
  };

  if (tables && tables.size) {
    tables.forEach(table => {
      columns[table.get("id")] = {
        id: table.get("id"),
        number: table.getIn(["attributes", "number"]),
        numberOfSeats: table.getIn(["attributes", "numberOfSeats"]),
        reservationIds: []
      };
    });
  }

  return columns;
};

export const prepareTimelineSlots = ({
  openPeriods,
  choosenDate,
  slotDuration
}) => {
  const periods = [];
  const slotsArray = [];
  if (openPeriods && openPeriods.forEach) {
    openPeriods.forEach(p => {
      if (p.getIn(["attributes", "weekday"]) === choosenDate.day()) {
        periods.push({
          from: p.getIn(["attributes", "openedFrom"]),
          to: p.getIn(["attributes", "openedTo"])
        });
      }
    });
  }

  periods.forEach(({ from, to }) => {
    let i = 0;
    if (from < to) {
      while (from + slotDuration * i < to) {
        slotsArray.push(from + slotDuration * i);
        i += 1;
      }
    } else {
      while (from + slotDuration * i < to + ONE_DAY_IN_SECONDS) {
        slotsArray.push(from + slotDuration * i);
        i += 1;
      }
    }
  });

  return slotsArray;
};

export const getSlotClosestToPresent = slots => {
  const now = new Date();
  const nowInSeconds =
    now.getHours() * 60 * 60 + now.getMinutes() * 60 + now.getSeconds();
  return slots.find(s => s >= nowInSeconds) || slots[slots.length - 1];
};

export const getSlotFromMoment = (slots, moment) =>
  slots.find(s => s === moment);

export const getTableReservations = (tableId, reservations) => {
  console.log(tableId, reservations);
};
