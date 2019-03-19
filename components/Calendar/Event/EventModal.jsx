import { Button, Modal, Map } from "components";
import { shape, func, bool } from "prop-types";
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
          {event.resource.start.getHours()} pm - {event.resource.end.getHours()}{" "}
          pm
        </Time>
        <Name>{event.resource.name}</Name>
        <Price>{event.resource.price}</Price>
      </MainInfo>
      <IconWrapper>
        <EditIcon />
      </IconWrapper>
    </Header>
    <Details>
      <Detail>
        <DetailContent>{t("servings")}</DetailContent>
        <DetailContent>{event.resource.servings}</DetailContent>
      </Detail>
      <Detail>
        <DetailContent>{t("type")}</DetailContent>
        <DetailContent>{event.resource.type}</DetailContent>
      </Detail>
      <Detail>
        <DetailContent>{t("waiters")}</DetailContent>
        <DetailContent>{event.resource.waiters}</DetailContent>
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
          {event.resource.chef ? t("yes") : t("no")}
        </DetailContent>
      </Detail>
      <Detail>
        <DetailContent>{t("specifications")}</DetailContent>
        <DetailContent>{event.resource.specifications}</DetailContent>
      </Detail>
    </Details>
    <AdditionalHeader>{t("additional")}</AdditionalHeader>
    <AdditionalParagraph>{event.resource.additional}</AdditionalParagraph>
    <MapWrapper>
      <Map
        center={event.resource.location}
        points={[{ name: event.resource.name }]}
      />
    </MapWrapper>
    <Button styleName="blue" onClick={() => null} width="100%">
      {t("downloadMenu")}
    </Button>
  </Modal>
);

EventModal.propTypes = {
  event: shape().isRequired,
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  t: func.isRequired
};

export default EventModal;
