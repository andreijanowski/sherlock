import { useState } from "react";
import { func, string, node, number, shape } from "prop-types";
import AppLayout from "layout/App";
import {
  Button,
  ButtonWithImageText,
  ButtonWithImageIconWrapper,
  Link,
  InfoBar,
  ItalicText,
  Select,
  AutosizeInput,
  ActionIcon
} from "components";
import { Router } from "routes";
import {
  ProfileMembers,
  ProfileOpeningHours,
  ProfileAdditionaInfo,
  ProfileContact,
  Time,
  Clock
} from "icons";
import { Flex, Box } from "@rebass/grid";
import prepareBusinessesList from "utils/prepareBusinessesList";
import { Orange } from "./styled";

const BookingLayout = ({
  t,
  lng,
  page,
  children,
  business,
  currentBusinessId,
  businesses,
  changeCurrentBusiness,
  slotDuration,
  setSlotDuration
}) => {
  // TODO: pass proper values from business as inital state
  const [maxAmountPerBooking, setMaxAmountPerBooking] = useState(15);
  const [timeOfEarliestReservation, setTimeOfEarliestReservation] = useState(
    15
  );
  const [
    timeOfGuestsStayingInRestaurant,
    setTimeOfGuestsStayingInRestaurant
  ] = useState(15);
  const [timeSlots, setTimeSlots] = useState(slotDuration);

  return (
    <AppLayout
      {...{
        mainIcon: "booking",
        header: t(page),
        t,
        lng
      }}
    >
      <Box width={[1, 1 / 2]} mb={3}>
        <Select
          value={{
            value: currentBusinessId,
            label:
              (business && business.get("name")) ||
              t("app:manageProfile.unnamedBusiness"),
            src: business && business.getIn(["logo", "url"])
          }}
          withImage
          items={prepareBusinessesList(t, businesses)}
          onChange={b => changeCurrentBusiness(b.value)}
        />
      </Box>
      <InfoBar
        info={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <span>
            {`${t("addInfo")} `}
            <ItalicText>
              <Orange>
                <Link route="/app/booking/tables/" lng={lng}>
                  <Orange as="a">{t("tablesInfo")}</Orange>
                </Link>
                {`, ${t("timeSlots")}, ${t("timeOfEarliestReservation")}, ${t(
                  "timeOfGuestsStayingInRestaurant"
                )}, ${t("and")} ${t("maxAmountPerBooking")}`}
              </Orange>
            </ItalicText>
            {` ${t("toSeeAnyNewBookings")}`}.
          </span>
        }
        complete={`0% ${t("complete")}`}
      />
      <Flex width={1} mt={3} flexWrap="wrap">
        <Box pr={3} mb={2}>
          <Link route="/app/booking/bookings/" lng={lng}>
            <Button as="a" styleName="withImage" active={page === "orders"}>
              <ButtonWithImageIconWrapper>
                <ProfileContact />
              </ButtonWithImageIconWrapper>
              <ButtonWithImageText>{t("bookings")}</ButtonWithImageText>
            </Button>
          </Link>
        </Box>
        <Box pr={3} mb={2}>
          <Link route="/app/booking/tables/" lng={lng}>
            <Button as="a" styleName="withImage" active={page === "orders"}>
              <ButtonWithImageIconWrapper>
                <ProfileAdditionaInfo />
              </ButtonWithImageIconWrapper>
              <ButtonWithImageText>{t("tables")}</ButtonWithImageText>
            </Button>
          </Link>
        </Box>
        <Box pr={3} mb={2}>
          <Button styleName="withImage" as="label">
            <ButtonWithImageIconWrapper>
              <Time />
            </ButtonWithImageIconWrapper>
            <ButtonWithImageText>
              <AutosizeInput
                value={timeSlots}
                onChange={e => {
                  setTimeSlots(e.target.value);
                }}
                onBlur={() => setSlotDuration(timeSlots)}
              />
              <span>{` ${t("min")}`}</span>
            </ButtonWithImageText>
          </Button>
        </Box>
        <Box pr={3} mb={2}>
          <Button styleName="withImage" as="label">
            <ButtonWithImageIconWrapper>
              <Clock />
            </ButtonWithImageIconWrapper>
            <ButtonWithImageText>
              <AutosizeInput
                value={timeOfGuestsStayingInRestaurant}
                onChange={e => {
                  setTimeOfGuestsStayingInRestaurant(e.target.value);
                }}
                onBlur={() =>
                  console.log(
                    "TODO: Here we should update business by API endpoint"
                  )
                }
              />
              <span>{` ${t("min")}`}</span>
            </ButtonWithImageText>
          </Button>
        </Box>
        <Box pr={3} mb={2}>
          <Button styleName="withImage" as="label">
            <ButtonWithImageIconWrapper>
              <ProfileOpeningHours />
            </ButtonWithImageIconWrapper>
            <ButtonWithImageText>
              <AutosizeInput
                value={timeOfEarliestReservation}
                onChange={e => {
                  setTimeOfEarliestReservation(e.target.value);
                }}
                onBlur={() =>
                  console.log(
                    "TODO: Here we should update business by API endpoint"
                  )
                }
              />
              <span>{` ${t("min")}`}</span>
            </ButtonWithImageText>
          </Button>
        </Box>
        <Box pr={3} mb={2}>
          <Button styleName="withImage" as="label">
            <ButtonWithImageIconWrapper>
              <ProfileMembers />
            </ButtonWithImageIconWrapper>
            <ButtonWithImageText>
              <AutosizeInput
                value={maxAmountPerBooking}
                onChange={e => {
                  setMaxAmountPerBooking(e.target.value);
                }}
                onBlur={() =>
                  console.log(
                    "TODO: Here we should update business by API endpoint"
                  )
                }
              />
              <span>{` ${t("people")}`}</span>
            </ButtonWithImageText>
          </Button>
        </Box>
        <ActionIcon
          size="sm"
          icon={["fa", "plus"]}
          white
          onClick={() => {
            Router.pushRoute(`/${lng}/app/booking/create/`);
          }}
        />
      </Flex>
      {children}
    </AppLayout>
  );
};

BookingLayout.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  page: string.isRequired,
  children: node.isRequired,
  pendingReservationsLength: number.isRequired,
  business: shape(),
  businesses: shape(),
  changeCurrentBusiness: func.isRequired,
  currentBusinessId: string,
  dishesLength: number,
  deliveriesLength: number,
  orderPeriodsLength: number,
  slotDuration: number.isRequired,
  setSlotDuration: func.isRequired
};

BookingLayout.defaultProps = {
  dishesLength: 0,
  deliveriesLength: 0,
  orderPeriodsLength: 0,
  currentBusinessId: "",
  business: null,
  businesses: null
};

export default BookingLayout;
