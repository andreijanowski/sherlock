import { useState, useEffect } from "react";
import { func, string, node, number, shape } from "prop-types";
import AppLayout from "layout/App";
import {
  Button,
  ButtonWithImageText,
  ButtonWithImageIconWrapper,
  Link,
  InfoBar,
  ItalicText,
  AutosizeInput,
  ActionIcon,
  ServiceStatusCheckbox
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
import Tippy from "@tippy.js/react";
import { Orange } from "./styled";

const ReservationLayout = ({
  t,
  lng,
  page,
  tables,
  children,
  business,
  currentBusinessId,
  updateBusiness
}) => {
  const [timeSlots, setTimeSlots] = useState(
    business && business.get("timeSlots") / 60
  );
  const [timeOfStay, setTimeOfStay] = useState(
    business && business.get("timeOfStay") / 60
  );
  const [minTimeBeforeReservation, setMinTimeBeforeReservation] = useState(
    business && business.get("minTimeBeforeReservation") / 60
  );
  const [maxReservationSize, setMaxReservationSize] = useState(
    business && business.get("maxReservationSize")
  );

  useEffect(() => {
    setTimeSlots(business && business.get("timeSlots") / 60);
    setTimeOfStay(business && business.get("timeOfStay") / 60);
    setMinTimeBeforeReservation(
      business && business.get("minTimeBeforeReservation") / 60
    );
    setMaxReservationSize(business && business.get("maxReservationSize"));
  }, [business]);

  const isInfoBarVisible =
    !(tables && tables.size) ||
    !timeSlots ||
    !timeOfStay ||
    !minTimeBeforeReservation ||
    !maxReservationSize;

  return (
    <AppLayout
      {...{
        mainIcon: "reservation",
        header: (
          <>
            {t(page)}
            <Box ml={3}>
              <ServiceStatusCheckbox
                {...{
                  t,
                  serviceActivationFieldName: "hasReservations",
                  business,
                  updateBusiness,
                  businessId: currentBusinessId
                }}
              />
            </Box>
          </>
        ),
        t,
        lng
      }}
    >
      {isInfoBarVisible && (
        <InfoBar
          info={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <span>
              {`${t("addInfo")} `}
              <ItalicText>
                <Orange>
                  {!(tables && tables.size) && (
                    <Link route="/app/reservation/tables/" lng={lng}>
                      <Orange as="a">{t("tablesInfo")},</Orange>
                    </Link>
                  )}
                  {`${timeSlots ? "" : ` ${t("timeSlots")},`}
                    ${
                      minTimeBeforeReservation
                        ? ""
                        : ` ${t("minTimeBeforeReservation")}, `
                    }
                    ${timeOfStay ? "" : ` ${t("timeOfStay")},`}
                    ${maxReservationSize ? "" : ` ${t("maxReservationSize")}`}`}
                </Orange>
              </ItalicText>
              {` ${t("toSeeAnyNewReservations")}`}.
            </span>
          }
        />
      )}
      <Flex width={1} mt={3} flexWrap="wrap">
        <Box pr={3} mb={2}>
          <Link route="/app/reservation/reservations/" lng={lng}>
            <Button
              as="a"
              styleName="withImage"
              active={page === "reservations"}
            >
              <ButtonWithImageIconWrapper>
                <ProfileContact />
              </ButtonWithImageIconWrapper>
              <ButtonWithImageText>{t("reservations")}</ButtonWithImageText>
            </Button>
          </Link>
        </Box>
        <Box pr={3} mb={2}>
          <Link route="/app/reservation/tables/" lng={lng}>
            <Button as="a" styleName="withImage" active={page === "tables"}>
              <ButtonWithImageIconWrapper>
                <ProfileAdditionaInfo />
              </ButtonWithImageIconWrapper>
              <ButtonWithImageText>{t("tables")}</ButtonWithImageText>
            </Button>
          </Link>
        </Box>
        <Box pr={3} mb={2}>
          <Tippy content={t("timeSlots")}>
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
                  onBlur={() =>
                    updateBusiness(currentBusinessId, {
                      timeSlots: timeSlots * 60
                    })
                  }
                />
                <span>{` ${t("min")}`}</span>
              </ButtonWithImageText>
            </Button>
          </Tippy>
        </Box>
        <Box pr={3} mb={2}>
          <Tippy content={t("timeOfStay")}>
            <Button styleName="withImage" as="label">
              <ButtonWithImageIconWrapper>
                <Clock />
              </ButtonWithImageIconWrapper>
              <ButtonWithImageText>
                <AutosizeInput
                  value={timeOfStay}
                  onChange={e => {
                    setTimeOfStay(e.target.value);
                  }}
                  onBlur={() =>
                    updateBusiness(currentBusinessId, {
                      timeOfStay: timeOfStay * 60
                    })
                  }
                />
                <span>{` ${t("min")}`}</span>
              </ButtonWithImageText>
            </Button>
          </Tippy>
        </Box>
        <Box pr={3} mb={2}>
          <Tippy content={t("minTimeBeforeReservation")}>
            <Button styleName="withImage" as="label">
              <ButtonWithImageIconWrapper>
                <ProfileOpeningHours />
              </ButtonWithImageIconWrapper>
              <ButtonWithImageText>
                <AutosizeInput
                  value={minTimeBeforeReservation}
                  onChange={e => {
                    setMinTimeBeforeReservation(e.target.value);
                  }}
                  onBlur={() =>
                    updateBusiness(currentBusinessId, {
                      minTimeBeforeReservation: minTimeBeforeReservation * 60
                    })
                  }
                />
                <span>{` ${t("min")}`}</span>
              </ButtonWithImageText>
            </Button>
          </Tippy>
        </Box>
        <Box pr={3} mb={2}>
          <Tippy content={t("maxReservationSize")}>
            <Button styleName="withImage" as="label">
              <ButtonWithImageIconWrapper>
                <ProfileMembers />
              </ButtonWithImageIconWrapper>
              <ButtonWithImageText>
                <AutosizeInput
                  value={maxReservationSize}
                  onChange={e => {
                    setMaxReservationSize(e.target.value);
                  }}
                  onBlur={() =>
                    updateBusiness(currentBusinessId, {
                      maxReservationSize
                    })
                  }
                />
                <span>{` ${t("people")}`}</span>
              </ButtonWithImageText>
            </Button>
          </Tippy>
        </Box>
        <ActionIcon
          size="sm"
          icon={["fa", "plus"]}
          white
          onClick={() => {
            Router.pushRoute(`/${lng}/app/reservation/create/`);
          }}
        />
      </Flex>
      {children}
    </AppLayout>
  );
};

ReservationLayout.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  page: string.isRequired,
  children: node.isRequired,
  pendingReservationsLength: number.isRequired,
  business: shape(),
  businesses: shape(),
  tables: shape(),
  updateBusiness: func.isRequired,
  currentBusinessId: string,
  dishesLength: number,
  deliveriesLength: number,
  orderPeriodsLength: number
};

ReservationLayout.defaultProps = {
  dishesLength: 0,
  deliveriesLength: 0,
  orderPeriodsLength: 0,
  currentBusinessId: "",
  business: null,
  businesses: null,
  tables: null
};

export default ReservationLayout;
