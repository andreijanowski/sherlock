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

const BookingDetails = ({ isOpen, onStateChange, bookingDetails, t }) => (
  <Slide
    isOpen={isOpen}
    onStateChange={onStateChange}
    pageWrapId="app"
    outerContainerId="layout"
    right
    width={400}
  >
    {bookingDetails && (
      <>
        <SliderHeader>{t("bookingDetails")}</SliderHeader>
        <SliderDetail
          {...{
            name: t("date"),
            value: [
              moment(bookingDetails.getIn(["attributes", "date"])).format(
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
                  (bookingDetails.getIn(["attributes", "from"]) / 60) % 60,
                hours:
                  (bookingDetails.getIn(["attributes", "from"]) / 60 / 60) % 24
              }).format("h:mm A")
            ]
          }}
        />
        <SliderDetail
          {...{
            name: t("to"),
            value: [
              moment({
                minutes: (bookingDetails.getIn(["attributes", "to"]) / 60) % 60,
                hours:
                  (bookingDetails.getIn(["attributes", "to"]) / 60 / 60) % 24
              }).format("h:mm A")
            ]
          }}
        />
        <SliderDetail
          {...{
            name: t("partySize"),
            value: [
              `${bookingDetails.getIn(["attributes", "partySize"])} ${t(
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
            value: [bookingDetails.getIn(["attributes", "name"])]
          }}
        />
        <SliderDetail
          {...{
            name: t("email"),
            value: [bookingDetails.getIn(["attributes", "email"])]
          }}
        />
        <SliderDetail
          {...{
            name: t("phone"),
            value: [
              `${bookingDetails.getIn([
                "attributes",
                "phoneCountryPrefix"
              ])} ${bookingDetails.getIn(["attributes", "phone"])}`
            ]
          }}
        />
      </>
    )}
  </Slide>
);

BookingDetails.propTypes = {
  isOpen: bool.isRequired,
  onStateChange: func.isRequired,
  bookingDetails: shape(),
  setRejectModalVisibility: func.isRequired,
  updateOrder: func.isRequired,
  t: func.isRequired
};

BookingDetails.defaultProps = {
  bookingDetails: null
};

export default reduxBurgerMenu(BookingDetails);
