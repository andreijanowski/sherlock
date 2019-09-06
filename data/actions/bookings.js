import { FETCH_BOOKING_REQUEST } from "types/bookings";

export const fetchBooking = id => ({
  type: FETCH_BOOKING_REQUEST,
  payload: {
    endpoint: `/api/v1/bookings/${id}`,
    params: {
      include: "reservation,table"
    }
  }
});
