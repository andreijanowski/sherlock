import { Map } from "immutable";
import moment from "moment";

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
        reservationTables.some(t => t.get("id") === tableId) &&
        r.getIn(["attributes", "state"]) === "booked"
      );
    })) ||
  Map();

export const getReservationBookings = reservation =>
  reservation.getIn(["relationships", "bookings", "data"]);

export const getReservationTables = (reservationDetails, tables) => {
  const reservationTablesData = [];
  const reservationTables = reservationDetails.getIn([
    "relationships",
    "tables",
    "data"
  ]);

  if (reservationTables && reservationTables.size) {
    reservationTables.forEach(t => {
      const table = tables.get(t.get("id"));
      reservationTablesData.push({
        tableId: table.get("id"),
        tableNumber: table.getIn(["attributes", "number"]),
        numberOfSeats: table.getIn(["attributes", "numberOfSeats"])
      });
    });
  }

  return reservationTablesData;
};

export const calcReservedPeriodsForTables = reservations => {
  const reservedPeriodsForTables = {};
  if (reservations && reservations.size) {
    reservations
      .filter(a => a.getIn(["attributes", "state"]) === "booked")
      .forEach(r => {
        const reservationTables = r.getIn(["relationships", "tables", "data"]);
        if (reservationTables && reservationTables.size) {
          reservationTables.forEach(t => {
            const reservedPeriod = {
              date: r.getIn(["attributes", "date"]),
              from: r.getIn(["attributes", "from"]),
              to: r.getIn(["attributes", "to"]),
              partySize: r.getIn(["attributes", "partySize"]),
              isSplited: reservationTables.size > 1
            };
            if (reservedPeriod.from > reservedPeriod.to) {
              const reservedPeriodAfterMidnight = { ...reservedPeriod };
              reservedPeriodAfterMidnight.from = 0;
              reservedPeriodAfterMidnight.date = moment(reservedPeriod.date)
                .add(1, "d")
                .format("YYYY-MM-DD");
              reservedPeriod.to = 86400;
              if (reservedPeriodsForTables[t.get("id")]) {
                reservedPeriodsForTables[t.get("id")].push(reservedPeriod);
                reservedPeriodsForTables[t.get("id")].push(
                  reservedPeriodAfterMidnight
                );
              } else {
                reservedPeriodsForTables[t.get("id")] = [
                  reservedPeriod,
                  reservedPeriodAfterMidnight
                ];
              }
            } else if (reservedPeriodsForTables[t.get("id")]) {
              reservedPeriodsForTables[t.get("id")].push(reservedPeriod);
            } else {
              reservedPeriodsForTables[t.get("id")] = [reservedPeriod];
            }
          });
        }
      });
  }
  return reservedPeriodsForTables;
};

export const parseReservations = (
  reservations,
  tables,
  t,
  splitedReservation
) => {
  const columns = {
    newReservations: {
      id: columnsList.newReservations,
      title: t("newReservations"),
      reservationIds:
        reservations && reservations.size
          ? reservations
              .filter(
                r =>
                  r.getIn(["attributes", "state"]) === "placed" ||
                  (splitedReservation && splitedReservation.id === r.get("id"))
              )
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
  if (slotDuration) {
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

    periods.sort((a, b) => {
      if (a.from > b.from) {
        return 1;
      }
      if (a.from < b.from) {
        return -1;
      }
      return 0;
    });

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
  }

  return slotsArray;
};

export const getSlotClosestToPresent = slots => {
  const now = new Date();
  const nowInSeconds =
    now.getHours() * 60 * 60 + now.getMinutes() * 60 + now.getSeconds();
  return slots.find(s => s >= nowInSeconds) || slots[slots.length - 1];
};

export const getSlotFromMoment = (slots, m) => slots.find(s => s === m);

export const checkIfTableIsAvailable = ({
  reservedPeriods,
  choosenDate,
  choosenSlot,
  draggedReservation
}) => {
  if (draggedReservation) {
    return reservedPeriods.find(r => {
      const from = draggedReservation.getIn(["attributes", "from"]);
      const to = draggedReservation.getIn(["attributes", "to"]);
      const date = draggedReservation.getIn(["attributes", "date"]);
      if (from > to) {
        return (
          (r.date === date && r.to >= from && r.from <= 86400) ||
          (r.date ===
            moment(date)
              .add(1, "d")
              .format("YYYY-MM-DD") &&
            r.to >= 0 &&
            r.from <= from)
        );
      }
      return r.date === date && r.to >= from && r.from <= to;
    });
  }
  return reservedPeriods.find(
    r =>
      r.date === choosenDate.format("YYYY-MM-DD") &&
      r.to >= choosenSlot &&
      r.from <= choosenSlot
  );
};

export const getNewReservations = ({
  reservationIds,
  reservations,
  splitedReservation,
  slots
}) => {
  const newReservations = [];
  reservationIds.forEach(id => {
    if (reservations) {
      const reservation = reservations.get(id);
      if (reservation) {
        if (splitedReservation && splitedReservation.id === id) {
          splitedReservation.tickets.forEach((ticket, index) => {
            newReservations.push(
              reservation
                .setIn(["attributes", "partySize"], ticket.partySize)
                .set("splited", true)
                .set("id", `${id}@${index}`)
            );
          });
        } else {
          newReservations.push(reservation);
        }
      }
    }
  });

  return newReservations.map(r =>
    r.set("fitsSlots", slots.some(s => s === r.getIn(["attributes", "from"])))
  );
};
