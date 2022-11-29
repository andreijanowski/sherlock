import Slide from "react-burger-menu/lib/menus/slide";
import { decorator as reduxBurgerMenu } from "redux-burger-menu/immutable";
import { func, bool, shape } from "prop-types";
import {
  SliderDetail,
  SliderHeader,
  SliderSubheader,
  SliderSpacer
} from "components";
import moment from "moment";
import { getReservationBookings } from "../utils";

const TableDetails = ({
  isOpen,
  onStateChange,
  tableDetails,
  tableReservations,
  bookings,
  handleReservationClick,
  t
}) => (
  <Slide
    isOpen={isOpen}
    onStateChange={onStateChange}
    pageWrapId="app"
    outerContainerId="layout"
    right
    width={400}
  >
    {tableDetails && (
      <>
        <SliderHeader>{t("tableDetails")}</SliderHeader>
        <SliderDetail
          {...{
            name: t("number"),
            value: [tableDetails.getIn(["attributes", "number"])]
          }}
        />
        <SliderDetail
          {...{
            name: t("numberOfSeats"),
            value: [tableDetails.getIn(["attributes", "numberOfSeats"])]
          }}
        />
        <SliderSpacer />
        <SliderSubheader>{t("reservations")}</SliderSubheader>
        {tableReservations &&
          tableReservations
            .sort((a, b) => {
              if (
                new Date(a.getIn(["attributes", "date"])).getTime() <
                new Date(b.getIn(["attributes", "date"])).getTime()
              ) {
                return -1;
              }
              if (
                new Date(a.getIn(["attributes", "date"])).getTime() ===
                new Date(b.getIn(["attributes", "date"])).getTime()
              ) {
                if (
                  a.getIn(["attributes", "from"]) <
                  b.getIn(["attributes", "from"])
                ) {
                  return -1;
                }
                return 1;
              }
              return 1;
            })
            .filter(a => a.getIn(["attributes", "state"]) === "booked")
            .valueSeq()
            .map(r => {
              const from = r.getIn(["attributes", "from"]);
              const to = r.getIn(["attributes", "to"]);
              const reservationBookings = getReservationBookings(r);
              const tableReservationBooking =
                bookings &&
                reservationBookings
                  .map(b => bookings.get(b.get("id")))
                  .find(
                    b =>
                      b &&
                      b.getIn(["relationships", "table", "data", "id"]) ===
                        tableDetails.get("id")
                  );

              return (
                <SliderDetail
                  {...{
                    onClick: () => handleReservationClick(r.get("id")),
                    name: `${moment(r.getIn(["attributes", "date"])).format(
                      "Do MMM YYYY"
                    )}, ${moment({
                      minutes: (from / 60) % 60,
                      hours: (from / 60 / 60) % 24
                    }).format("hh:mm A")} - ${moment({
                      minutes: (to / 60) % 60,
                      hours: (to / 60 / 60) % 24
                    }).format("hh:mm A")}`,
                    value: [
                      `${r.getIn(["attributes", "name"])}`,
                      `${tableReservationBooking &&
                        tableReservationBooking.getIn([
                          "attributes",
                          "seatsTaken"
                        ])} ${t("seatsTaken")} (${t("partySize")}: ${r.getIn([
                        "attributes",
                        "partySize"
                      ])})`
                    ]
                  }}
                />
              );
            })}
      </>
    )}
  </Slide>
);

TableDetails.propTypes = {
  isOpen: bool.isRequired,
  onStateChange: func.isRequired,
  tableDetails: shape(),
  tableReservations: shape(),
  bookings: shape(),
  t: func.isRequired,
  handleReservationClick: func.isRequired
};

TableDetails.defaultProps = {
  tableDetails: null,
  tableReservations: null,
  bookings: null
};

export default reduxBurgerMenu(TableDetails, "TableDetails");
