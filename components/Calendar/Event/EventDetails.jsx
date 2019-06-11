import { Button, Map } from "components";
import { shape, func, string } from "prop-types";
import moment from "moment";
import { normalizePrice } from "utils/normalizers";
import { Router } from "routes";
import { Box, Flex } from "@rebass/grid";
import {
  Header,
  MainInfo,
  Time,
  Name,
  Price,
  IconWrapper,
  EditIcon,
  Details,
  Detail,
  DetailContent,
  AdditionalHeader,
  AdditionalParagraph,
  MapWrapper
} from "./styled";
import { parseDateTime } from "../utils";

const EventDetails = ({
  t,
  lng,
  event,
  setEditedEvent,
  eventType,
  sendOffer
}) => (
  <>
    <Header>
      <MainInfo>
        <Time>
          {`${parseDateTime(
            event.resource.date,
            event.resource.realFrom || event.resource.from
          )} - ${parseDateTime(event.resource.date, event.resource.to)} `}
        </Time>
        <Name>{event.resource.name}</Name>
        {!!event.resource.priceCents && (
          <Price>{`${normalizePrice(event.resource.priceCents)}${event.resource
            .currency || ""}`}</Price>
        )}
      </MainInfo>
      <IconWrapper
        onClick={() => {
          setEditedEvent(event.resource);
          Router.pushRoute(`/${lng}/app/${eventType}/edit/`);
        }}
      >
        <EditIcon />
      </IconWrapper>
    </Header>
    <Details>
      <Detail>
        <DetailContent>{t("events:type")}</DetailContent>
        <DetailContent>{event.resource.typeOfEvent}</DetailContent>
      </Detail>
      <Detail>
        <DetailContent>{t("events:servings")}</DetailContent>
        <DetailContent>{event.resource.numberOfServings}</DetailContent>
      </Detail>
      <Detail>
        <DetailContent>{t("events:waiters")}</DetailContent>
        <DetailContent>{event.resource.numberOfWaiters}</DetailContent>
      </Detail>
      <Detail>
        <DetailContent>{t("events:outdoors")}</DetailContent>
        <DetailContent>
          {event.resource.outdoors ? t("events:yes") : t("events:no")}
        </DetailContent>
      </Detail>
      <Detail>
        <DetailContent>{t("events:corporateEvent")}</DetailContent>
        <DetailContent>
          {event.resource.corporateEvent ? t("events:yes") : t("events:no")}
        </DetailContent>
      </Detail>
      <Detail>
        <DetailContent>{t("events:cutlery")}</DetailContent>
        <DetailContent>
          {event.resource.cutlery ? t("events:yes") : t("events:no")}
        </DetailContent>
      </Detail>
      <Detail>
        <DetailContent>{t("events:chef")}</DetailContent>
        <DetailContent>
          {event.resource.chefAttendance ? t("events:yes") : t("events:no")}
        </DetailContent>
      </Detail>
    </Details>
    {event.resource.specifications && (
      <>
        <AdditionalHeader>{t("events:specifications")}</AdditionalHeader>
        <AdditionalParagraph>
          {event.resource.specifications}
        </AdditionalParagraph>
      </>
    )}
    <Details>
      {event.resource.companyName && (
        <Detail>
          <DetailContent>{t("events:companyName")}</DetailContent>
          <DetailContent>{event.resource.companyName}</DetailContent>
        </Detail>
      )}
      {event.resource.userName && (
        <Detail>
          <DetailContent>{t("events:contactPerson")}</DetailContent>
          <DetailContent>{event.resource.userName}</DetailContent>
        </Detail>
      )}
      {event.resource.email && (
        <Detail>
          <DetailContent>{t("events:email")}</DetailContent>
          <DetailContent>{event.resource.email}</DetailContent>
        </Detail>
      )}
      {event.resource.phone && (
        <Detail>
          <DetailContent>{t("events:phoneNumber")}</DetailContent>
          <DetailContent>{`${event.resource.phoneCountryPrefix} ${
            event.resource.phone
          }`}</DetailContent>
        </Detail>
      )}
    </Details>
    {event.resource.address && (
      <>
        <AdditionalHeader>{t("events:address")}</AdditionalHeader>
        <AdditionalParagraph>
          {`${event.resource.address.street} ${
            event.resource.address.streetNumber
          }`}
          <br />
          {`${event.resource.address.postCode} ${event.resource.address.city}`}
          <br />
          {`${
            event.resource.address.region
              ? `${event.resource.address.region},`
              : ""
          } ${event.resource.address.country}`}
          <br />
          {event.resource.address.notes}
        </AdditionalParagraph>
        <MapWrapper>
          <Map
            center={{
              lat: event.resource.address.geolocationLat,
              lng: event.resource.address.geolocationLng
            }}
            points={[{ name: event.resource.name }]}
          />
        </MapWrapper>
      </>
    )}
    {event.resource.offerSendAt && (
      <AdditionalParagraph>
        {`${t("events:offerWasSentAt")} ${moment(
          event.resource.offerSendAt
        ).format("Do MMMM YYYY, h:mma")}`}
      </AdditionalParagraph>
    )}
    <Flex mx={-2}>
      {event.resource.menu.url && (
        <Box px={2} width={1 / 2}>
          <a
            href={event.resource.menu.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button styleName="blue" onClick={() => null} width="100%">
              {t("events:downloadMenu")}
            </Button>
          </a>
        </Box>
      )}
      <Box px={2} width={event.resource.menu.url ? 1 / 2 : 1}>
        <Button
          styleName="blue"
          onClick={() => sendOffer(event.resource.id)}
          width="100%"
        >
          {event.resource.offerSendAt
            ? t("events:resendOffer")
            : t("events:sendOffer")}
        </Button>
      </Box>
    </Flex>
  </>
);

EventDetails.propTypes = {
  event: shape().isRequired,
  t: func.isRequired,
  lng: string.isRequired,
  setEditedEvent: func.isRequired,
  sendOffer: func.isRequired,
  eventType: string.isRequired
};

export default EventDetails;
