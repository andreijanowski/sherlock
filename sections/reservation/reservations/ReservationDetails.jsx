import Slide from "react-burger-menu/lib/menus/slide";
import { decorator as reduxBurgerMenu } from "redux-burger-menu/immutable";
import { func, bool, shape, string } from "prop-types";
import {
  SliderDetail,
  SliderHeader,
  SliderSubheader,
  SliderSpacer,
  Button
} from "components";
import { Flex, Box } from "@rebass/grid";
import moment from "moment";
import { Router } from "routes";

const ReservationDetails = ({
  isOpen,
  onStateChange,
  reservationDetails,
  splitedReservation,
  reservationTables,
  setRejectModalVisibility,
  handleTableClick,
  t,
  lng,
  setEditedReservation
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
        {splitedReservation &&
          splitedReservation.id === reservationDetails.get("id") && (
            <>
              <SliderSpacer />
              <SliderSubheader>{t("ticketsList")}</SliderSubheader>
              {splitedReservation.tickets.map(ticket => (
                <SliderDetail
                  {...{
                    name: t("partySize"),
                    value: [ticket.partySize]
                  }}
                />
              ))}
            </>
          )}
        <SliderSpacer />
        {reservationTables && reservationTables.length !== 0 && (
          <>
            <SliderSubheader>{t("tablesList")}</SliderSubheader>
            {reservationTables.map(r => (
              <SliderDetail
                {...{
                  onClick: () => handleTableClick(r.tableId),
                  name: t("numberLabel"),
                  value: [r.tableNumber]
                }}
              />
            ))}
            <SliderSpacer />
          </>
        )}
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
        <Flex mx={-1} mt={3} pb={3}>
          <Box width={1 / 2} px={1}>
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
          </Box>
          <Box width={1 / 2} px={1}>
            <Button
              fluid
              styleName="accept"
              onClick={e => {
                e.stopPropagation();
                onStateChange(false);
                setEditedReservation(reservationDetails);
                Router.pushRoute(`/${lng}/app/reservation/edit`);
              }}
            >
              {t("edit")}
            </Button>
          </Box>
        </Flex>
      </>
    )}
  </Slide>
);

ReservationDetails.propTypes = {
  isOpen: bool.isRequired,
  onStateChange: func.isRequired,
  reservationDetails: shape(),
  splitedReservation: shape(),
  reservationTables: shape(),
  t: func.isRequired,
  lng: string.isRequired,
  handleTableClick: func.isRequired,
  setRejectModalVisibility: func.isRequired,
  setEditedReservation: func.isRequired
};

ReservationDetails.defaultProps = {
  reservationDetails: null,
  reservationTables: null,
  splitedReservation: undefined
};

export default reduxBurgerMenu(ReservationDetails, "ReservationDetails");
