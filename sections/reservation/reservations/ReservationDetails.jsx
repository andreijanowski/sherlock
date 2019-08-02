import Slide from "react-burger-menu/lib/menus/slide";
import { decorator as reduxBurgerMenu } from "redux-burger-menu/immutable";
import { func, bool, shape } from "prop-types";
import {
  SliderDetail,
  SliderHeader,
  SliderSubheader,
  SliderSpacer,
  Button
} from "components";
import moment from "moment";

const ReservationDetails = ({
  isOpen,
  onStateChange,
  reservationDetails,
  setRejectModalVisibility,
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
    {reservationDetails && (
      <>
        <SliderHeader>{t("reservationDetails")}</SliderHeader>
        <SliderDetail
          {...{
            name: t("date"),
            value: [
              moment(reservationDetails.getIn(["attributes", "date"])).format(
                "Do MMMM YYYY"
              )
            ]
          }}
        />
        <SliderDetail
          {...{
            name: t("from"),
            value: [
              moment({
                minutes:
                  (reservationDetails.getIn(["attributes", "from"]) / 60) % 60,
                hours:
                  (reservationDetails.getIn(["attributes", "from"]) / 60 / 60) %
                  24
              }).format("h:mm A")
            ]
          }}
        />
        <SliderDetail
          {...{
            name: t("to"),
            value: [
              moment({
                minutes:
                  (reservationDetails.getIn(["attributes", "to"]) / 60) % 60,
                hours:
                  (reservationDetails.getIn(["attributes", "to"]) / 60 / 60) %
                  24
              }).format("h:mm A")
            ]
          }}
        />
        <SliderDetail
          {...{
            name: t("partySize"),
            value: [
              `${reservationDetails.getIn(["attributes", "partySize"])} ${t(
                "people"
              )}`
            ]
          }}
        />
        <SliderSpacer />
        <SliderSubheader>{t("personalInformation")}</SliderSubheader>
        <SliderDetail
          {...{
            name: t("name"),
            value: [reservationDetails.getIn(["attributes", "name"])]
          }}
        />
        <SliderDetail
          {...{
            name: t("email"),
            value: [reservationDetails.getIn(["attributes", "email"])]
          }}
        />
        <SliderDetail
          {...{
            name: t("phone"),
            value: [
              `+${reservationDetails.getIn([
                "attributes",
                "phoneCountryPrefix"
              ])} ${reservationDetails.getIn(["attributes", "phone"])}`
            ]
          }}
        />
        <Button
          fluid
          styleName="reject"
          onClick={e => {
            e.stopPropagation();
            setRejectModalVisibility(reservationDetails.get("id"));
          }}
        >
          {t("reject")}
        </Button>
      </>
    )}
  </Slide>
);

ReservationDetails.propTypes = {
  isOpen: bool.isRequired,
  onStateChange: func.isRequired,
  reservationDetails: shape(),
  t: func.isRequired,
  setRejectModalVisibility: func.isRequired
};

ReservationDetails.defaultProps = {
  reservationDetails: null
};

export default reduxBurgerMenu(ReservationDetails, "ReservationDetails");
