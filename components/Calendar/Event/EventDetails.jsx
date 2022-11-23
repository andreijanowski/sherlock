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
  Details,
  Detail,
  DetailContent,
  DetailName,
  AdditionalHeader,
  AdditionalParagraph,
  MapWrapper,
  ExtendedButton
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
          <Price>{`${normalizePrice(event.resource.priceCents)}${
            event.resource.currency || ""
          }`}</Price>
        )}
      </MainInfo>
      <Flex
        flexDirection={["column", "row"]}
        alignItems={["flex-start", "center"]}
        mt={[2, 0]}
      >
        <ExtendedButton
          styleName="smallBlue"
          onClick={() => {
            setEditedEvent(event.resource);
            Router.pushRoute(
              `/${lng}/app/events-management/${eventType}/edit/`
            );
          }}
        >
          {t("events:prepareOfer")}
        </ExtendedButton>
      </Flex>
    </Header>
    <Details>
      <Detail>
        <DetailName>{t("events:type")}</DetailName>
        <DetailContent>{event.resource.typeOfEvent}</DetailContent>
      </Detail>
      <Detail>
        <DetailName>{t("events:servings")}</DetailName>
        <DetailContent>{event.resource.numberOfServings}</DetailContent>
      </Detail>
      <Detail>
        <DetailName>{t("events:outdoors")}</DetailName>
        <DetailContent>
          {event.resource.outdoors ? t("events:yes") : t("events:no")}
        </DetailContent>
      </Detail>
      <Detail>
        <DetailName>{t("events:corporateEvent")}</DetailName>
        <DetailContent>
          {event.resource.corporateEvent ? t("events:yes") : t("events:no")}
        </DetailContent>
      </Detail>
      <Detail>
        <DetailName>{t("events:chef")}</DetailName>
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
          <DetailName>{t("events:companyName")}</DetailName>
          <DetailContent>{event.resource.companyName}</DetailContent>
        </Detail>
      )}
      {event.resource.userName && (
        <Detail>
          <DetailName>{t("events:contactPerson")}</DetailName>
          <DetailContent>{event.resource.userName}</DetailContent>
        </Detail>
      )}
      {event.resource.email && (
        <Detail>
          <DetailName>{t("events:email")}</DetailName>
          <DetailContent>{event.resource.email}</DetailContent>
        </Detail>
      )}
      {event.resource.phone && (
        <Detail>
          <DetailName>{t("events:phoneNumber")}</DetailName>
          <DetailContent>{`${event.resource.phoneCountryPrefix} ${event.resource.phone}`}</DetailContent>
        </Detail>
      )}
    </Details>
    {event.resource.address && (
      <>
        <AdditionalHeader>{t("events:address")}</AdditionalHeader>
        <AdditionalParagraph>
          {`${event.resource.address.street} ${event.resource.address.streetNumber}`}
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
      <Flex width={1}>
        <ExtendedButton
          isFull
          styleName="blue"
          onClick={() => sendOffer(event.resource.id)}
          width="100%"
        >
          {event.resource.offerSendAt
            ? t("events:resendOffer")
            : t("events:sendOffer")}
        </ExtendedButton>
      </Flex>
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
