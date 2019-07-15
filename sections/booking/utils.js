const ONE_DAY_IN_SECONDS = 86400;
const ONE_MINUTE_IN_SECONDS = 60;

export const columnsList = {
  newBookings: "newBookings"
};

export const parseBookings = (bookings, t) => ({
  newBookings: {
    id: columnsList.newBookings,
    title: t("newBookings"),
    bookingIds:
      bookings && bookings.size
        ? bookings
            .filter(o => o)
            .map(o => o.get("id"))
            .toList()
            .toArray()
        : []
  },
  table0: {
    id: "table0",
    seats: 1,
    name: "T1",
    bookingIds: []
  },
  table1: {
    id: "table1",
    seats: 2,
    name: "T2",
    bookingIds: []
  },
  table2: {
    id: "table2",
    seats: 3,
    name: "T3",
    bookingIds: []
  },
  table3: {
    id: "table3",
    seats: 4,
    name: "T4",
    bookingIds: []
  },
  table4: {
    id: "table4",
    seats: 5,
    name: "T5",
    bookingIds: []
  },
  table5: {
    id: "table5",
    seats: 6,
    name: "T6",
    bookingIds: []
  },
  table6: {
    id: "table6",
    seats: 7,
    name: "T7",
    bookingIds: []
  },
  table7: {
    id: "table7",
    seats: 8,
    name: "T8",
    bookingIds: []
  },
  table8: {
    id: "table8",
    seats: 9,
    name: "T9",
    bookingIds: []
  },
  table9: {
    id: "table9",
    seats: 10,
    name: "T10",
    bookingIds: []
  },
  table10: {
    id: "table10",
    seats: 11,
    name: "T11",
    bookingIds: []
  },
  table11: {
    id: "table11",
    seats: 12,
    name: "T12",
    bookingIds: []
  },
  table12: {
    id: "table12",
    seats: 13,
    name: "T13",
    bookingIds: []
  },
  table13: {
    id: "table13",
    seats: 14,
    name: "T14",
    bookingIds: []
  },
  table14: {
    id: "table14",
    seats: 15,
    name: "T15",
    bookingIds: []
  }
});

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

  const slotDurationInSeconds = slotDuration * ONE_MINUTE_IN_SECONDS;

  periods.forEach(({ from, to }) => {
    let i = 0;
    if (from < to) {
      while (from + slotDurationInSeconds * i < to) {
        slotsArray.push(from + slotDurationInSeconds * i);
        i += 1;
      }
    } else {
      while (from + slotDurationInSeconds * i < to + ONE_DAY_IN_SECONDS) {
        slotsArray.push(from + slotDurationInSeconds * i);
        i += 1;
      }
    }
  });

  return slotsArray;
};
