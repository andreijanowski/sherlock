import { Map } from "immutable";

const ONE_DAY_IN_SECONDS = 86400;

export const columnsList = {
  newReservations: "newReservations"
};

export const getTableReservations = (tableId, reservations) =>
  (reservations &&
    reservations.size &&
    reservations.filter(r => {
      const reservationTables = r.getIn(["relationships", "tables", "data"]);
      return (
        reservationTables &&
        reservationTables.size &&
        reservationTables.some(t => t.get("id") === tableId)
      );
    })) ||
  Map();

export const calcReservedPeriodsForTables = reservations => {
  const reservedPeriodsForTables = {};
  if (reservations && reservations.size) {
    reservations.forEach(r => {
      const reservationTables = r.getIn(["relationships", "tables", "data"]);
      if (reservationTables && reservationTables.size) {
        reservationTables.forEach(t => {
          if (reservedPeriodsForTables[t.get("id")]) {
            reservedPeriodsForTables[t.get("id")].push({
              date: r.getIn(["attributes", "date"]),
              from: r.getIn(["attributes", "from"]),
              to: r.getIn(["attributes", "to"])
            });
          } else {
            reservedPeriodsForTables[t.get("id")] = [
              {
                date: r.getIn(["attributes", "date"]),
                from: r.getIn(["attributes", "from"]),
                to: r.getIn(["attributes", "to"])
              }
            ];
          }
        });
      }
    });
  }
  return reservedPeriodsForTables;
};

export const parseReservations = (reservations, tables, t) => {
  const columns = {
    newReservations: {
      id: columnsList.newReservations,
      title: t("newReservations"),
      reservationIds:
        reservations && reservations.size
          ? reservations
              .filter(r => r.getIn(["attributes", "state"]) === "placed")
              .map(r => r.get("id"))
              .toList()
              .toArray()
          : []
    }
  };

  if (tables && tables.size) {
    const reservedPeriodsForTables = calcReservedPeriodsForTables(reservations);
    tables.forEach(table => {
      columns[table.get("id")] = {
        id: table.get("id"),
        number: table.getIn(["attributes", "number"]),
        numberOfSeats: table.getIn(["attributes", "numberOfSeats"]),
        reservationIds: getTableReservations(table.get("id"), reservations)
          .map(r => r.get("id"))
          .toList()
          .toArray(),
        reservedPeriods: reservedPeriodsForTables[table.get("id")] || []
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

export const checkIfTableIsAvailable = ({
  reservedPeriods,
  choosenDate,
  choosenSlot
}) =>
  reservedPeriods.some(
    r =>
      // TODO: handle case, when restaurant is open in day and night and dates are changing ex. from 23:30 -> 1:30
      r.date === choosenDate.format("YYYY-MM-DD") &&
      r.to >= choosenSlot &&
      r.from <= choosenSlot
  );
