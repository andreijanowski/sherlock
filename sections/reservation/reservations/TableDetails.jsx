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

const TableDetails = ({
  isOpen,
  onStateChange,
  tableDetails,
  tableReservations,
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
        {tableReservations
          .sortBy(r => r.getIn(["attributes", "date"]))
          .valueSeq()
          .map(r => {
            const from = r.getIn(["attributes", "from"]);
            const to = r.getIn(["attributes", "to"]);

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
                    `${r.getIn(["attributes", "partySize"])} ${t("people")}`
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
  t: func.isRequired,
  handleReservationClick: func.isRequired
};

TableDetails.defaultProps = {
  tableDetails: null,
  tableReservations: null
};

export default reduxBurgerMenu(TableDetails, "TableDetails");
