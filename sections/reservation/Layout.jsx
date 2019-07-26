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
import Tippy from "@tippy.js/react";
import prepareBusinessesList from "utils/prepareBusinessesList";
import { Orange } from "./styled";

const ReservationLayout = ({
  t,
  lng,
  page,
  children,
  business,
  currentBusinessId,
  businesses,
  updateBusiness,
  changeCurrentBusiness
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

  return (
    <AppLayout
      {...{
        mainIcon: "reservation",
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
                <Link route="/app/reservation/tables/" lng={lng}>
                  <Orange as="a">{t("tablesInfo")}</Orange>
                </Link>
                {`, ${t("timeSlots")}, ${t("minTimeBeforeReservation")}, ${t(
                  "timeOfStay"
                )}, ${t("and")} ${t("maxReservationSize")}`}
              </Orange>
            </ItalicText>
            {` ${t("toSeeAnyNewReservations")}`}.
          </span>
        }
        complete={`0% ${t("complete")}`}
      />
      <Flex width={1} mt={3} flexWrap="wrap">
        <Box pr={3} mb={2}>
          <Link route="/app/reservation/reservations/" lng={lng}>
            <Button as="a" styleName="withImage" active={page === "orders"}>
              <ButtonWithImageIconWrapper>
                <ProfileContact />
              </ButtonWithImageIconWrapper>
              <ButtonWithImageText>{t("reservations")}</ButtonWithImageText>
            </Button>
          </Link>
        </Box>
        <Box pr={3} mb={2}>
          <Link route="/app/reservation/tables/" lng={lng}>
            <Button as="a" styleName="withImage" active={page === "orders"}>
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
  changeCurrentBusiness: func.isRequired,
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
  businesses: null
};

export default ReservationLayout;
