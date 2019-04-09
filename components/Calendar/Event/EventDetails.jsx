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

const EventDetails = ({ t, lng, event, setEditedCatering, sendOffer }) => (
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
      <IconWrapper
        onClick={() => {
          setEditedCatering(event.resource);
          Router.pushRoute(`/${lng}/app/catering/edit/`);
        }}
      >
        <EditIcon />
      </IconWrapper>
    </Header>
    <Details>
      <Detail>
        <DetailContent>{t("type")}</DetailContent>
        <DetailContent>{event.resource.typeOfEvent}</DetailContent>
      </Detail>
      <Detail>
        <DetailContent>{t("servings")}</DetailContent>
        <DetailContent>{event.resource.numberOfServings}</DetailContent>
      </Detail>
      <Detail>
        <DetailContent>{t("waiters")}</DetailContent>
        <DetailContent>{event.resource.numberOfWaiters}</DetailContent>
      </Detail>
      <Detail>
        <DetailContent>{t("outdoors")}</DetailContent>
        <DetailContent>
          {event.resource.outdoors ? t("yes") : t("no")}
        </DetailContent>
      </Detail>
      <Detail>
        <DetailContent>{t("corporateEvent")}</DetailContent>
        <DetailContent>
          {event.resource.corporateEvent ? t("yes") : t("no")}
        </DetailContent>
      </Detail>
      <Detail>
        <DetailContent>{t("cutlery")}</DetailContent>
        <DetailContent>
          {event.resource.cutlery ? t("yes") : t("no")}
        </DetailContent>
      </Detail>
      <Detail>
        <DetailContent>{t("chef")}</DetailContent>
        <DetailContent>
          {event.resource.chefAttendance ? t("yes") : t("no")}
        </DetailContent>
      </Detail>
    </Details>
    {event.resource.specifications && (
      <>
        <AdditionalHeader>{t("specifications")}</AdditionalHeader>
        <AdditionalParagraph>
          {event.resource.specifications}
        </AdditionalParagraph>
      </>
    )}
    <Details>
      {event.resource.companyName && (
        <Detail>
          <DetailContent>{t("companyName")}</DetailContent>
          <DetailContent>{event.resource.companyName}</DetailContent>
        </Detail>
      )}
      {event.resource.userName && (
        <Detail>
          <DetailContent>{t("contactPerson")}</DetailContent>
          <DetailContent>{event.resource.userName}</DetailContent>
        </Detail>
      )}
      {event.resource.email && (
        <Detail>
          <DetailContent>{t("email")}</DetailContent>
          <DetailContent>{event.resource.email}</DetailContent>
        </Detail>
      )}
      {event.resource.phone && (
        <Detail>
          <DetailContent>{t("phoneNumber")}</DetailContent>
          <DetailContent>{`${event.resource.phoneCountryPrefix} ${
            event.resource.phone
          }`}</DetailContent>
        </Detail>
      )}
    </Details>
    {event.resource.address && (
      <>
        <AdditionalHeader>{t("address")}</AdditionalHeader>
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
        {`${t("offerWasSentAt")} ${moment(event.resource.offerSendAt).format(
          "Do MMMM YYYY, h:mma"
        )}`}
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
              {t("downloadMenu")}
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
          {event.resource.offerSendAt ? t("resendOffer") : t("sendOffer")}
        </Button>
      </Box>
    </Flex>
  </>
);

EventDetails.propTypes = {
  event: shape().isRequired,
  t: func.isRequired,
  lng: string.isRequired,
  setEditedCatering: func.isRequired,
  sendOffer: func.isRequired
};

export default EventDetails;
