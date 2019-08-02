import Slide from "react-burger-menu/lib/menus/slide";
import { decorator as reduxBurgerMenu } from "redux-burger-menu/immutable";
import { func, bool, shape } from "prop-types";
import {
  SliderDetail,
  SliderHeader,
  SliderSubheader,
  SliderSpacer
} from "components";

const TableDetails = ({
  isOpen,
  onStateChange,
  tableDetails,
  // tableReservations,
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
      </>
    )}
  </Slide>
);

TableDetails.propTypes = {
  isOpen: bool.isRequired,
  onStateChange: func.isRequired,
  tableDetails: shape(),
  tableReservations: shape(),
  t: func.isRequired
};

TableDetails.defaultProps = {
  tableDetails: null,
  tableReservations: null
};

export default reduxBurgerMenu(TableDetails, "TableDetails");
