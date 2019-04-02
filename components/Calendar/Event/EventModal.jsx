import { Button, Modal, Map } from "components";
import { shape, func, bool } from "prop-types";
import moment from "moment";
import { normalizePrice } from "utils/normalizers";
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

const EventModal = ({ event, isOpen, onClose, t }) => (
  <Modal {...{ open: isOpen, onClose }}>
    <Header>
      <MainInfo>
        <Time>
          {`${moment(event.date)
            .hour(0)
            .minute(0)
            .second(event.resource.realFrom || event.resource.from)
            .format("h:mm a")} - ${moment(event.date)
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
        <EditIcon />
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
    {event.resource.location && (
      <MapWrapper>
        <Map
          center={event.resource.location}
          points={[{ name: event.resource.name }]}
        />
      </MapWrapper>
    )}
    {event.resource.menu && (
      <Button styleName="blue" onClick={() => null} width="100%">
        {t("downloadMenu")}
      </Button>
    )}
  </Modal>
);

EventModal.propTypes = {
  event: shape().isRequired,
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  t: func.isRequired
};

export default EventModal;
