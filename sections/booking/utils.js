export const columns = {
  newBookings: "newBookings"
};

export const parseBookings = (bookings, t) => ({
  newBookings: {
    id: columns.newBookings,
    title: t("newBookings"),
    bookingIds:
      bookings && bookings.size
        ? bookings
            .filter(o => o)
            .map(o => o.get("id"))
            .toList()
            .toArray()
        : []
  }
});
