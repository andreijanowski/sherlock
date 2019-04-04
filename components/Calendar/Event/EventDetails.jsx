import { Button, Map } from "components";
import { shape, func, string } from "prop-types";
import moment from "moment";
import { normalizePrice } from "utils/normalizers";
import { Router } from "routes";
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

const EventDetails = ({ t, lng, event, setEditedCatering }) => (
  <>
    <Header>
      <MainInfo>
        <Time>
          {`${moment(event.resource.date)
            .hour(0)
            .minute(0)
            .second(event.resource.realFrom || event.resource.from)
            .format("h:mm a")} - ${moment(event.resource.date)
            .hour(0)
            .minute(0)
            .second(event.resource.to)
            .format("h:mm a")} `}
        </Time>
        <Name>{event.resource.name}</Name>
        <Price>{`${normalizePrice(event.resource.priceCents)}${
          event.resource.currency
        }`}</Price>
      </MainInfo>
      <IconWrapper>
        <EditIcon
          onClick={() => {
            setEditedCatering(event.resource);
            Router.pushRoute(`/${lng}/app/catering/edit/`);
          }}
        />
      </IconWrapper>
    </Header>
    <Details>
      <Detail>
        <DetailContent>{t("servings")}</DetailContent>
        <DetailContent>{event.resource.numberOfServings}</DetailContent>
      </Detail>
      <Detail>
        <DetailContent>{t("type")}</DetailContent>
        <DetailContent>{event.resource.typeOfEvent}</DetailContent>
      </Detail>
      <Detail>
        <DetailContent>{t("waiters")}</DetailContent>
        <DetailContent>{event.resource.numberOfWaiters}</DetailContent>
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
      {event.resource.specifications && (
        <Detail>
          <DetailContent>{t("specifications")}</DetailContent>
          <DetailContent>{event.resource.specifications}</DetailContent>
        </Detail>
      )}
    </Details>
    {event.resource.additional && (
      <>
        <AdditionalHeader>{t("additional")}</AdditionalHeader>
        <AdditionalParagraph>{event.resource.additional}</AdditionalParagraph>
      </>
    )}
    {event.resource.address && (
      <MapWrapper>
        <Map
          center={{
            lat: event.resource.address.geolocationLat,
            lng: event.resource.address.geolocationLng
          }}
          points={[{ name: event.resource.name }]}
        />
      </MapWrapper>
    )}
    {event.resource.menu && (
      <Button styleName="blue" onClick={() => null} width="100%">
        {t("downloadMenu")}
      </Button>
    )}
  </>
);

EventDetails.propTypes = {
  event: shape().isRequired,
  t: func.isRequired,
  lng: string.isRequired,
  setEditedCatering: func.isRequired
};

export default EventDetails;
