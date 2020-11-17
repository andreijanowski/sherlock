import React, { useState, useEffect } from "react";
import { Modal } from "components";
import { shape, func, bool, string } from "prop-types";
import EventDetails from "./EventDetails";
import EventChooser from "./EventChooser";
import { ModalContentWrapper } from "./styled";

const EventModal = ({
  event,
  isOpen,
  onClose,
  t,
  lng,
  setEditedEvent,
  sendOffer,
  eventType
}) => {
  const [chosenEvent, setChoosenEvent] = useState(
    event.resource.length ? undefined : event
  );

  const chooseEvent = newEvent => setChoosenEvent(newEvent);

  useEffect(() => {
    if (event.resource.id) {
      chooseEvent(event);
    } else {
      const updatedEvent = event.resource.find(
        e => e.resource.id === chosenEvent.resource.id
      );
      chooseEvent(updatedEvent);
    }
  }, [event, chosenEvent]);

  return (
    <Modal {...{ open: isOpen, onClose }}>
      <ModalContentWrapper>
        {chosenEvent ? (
          <EventDetails
            {...{
              event: chosenEvent,
              eventType,
              t,
              lng,
              setEditedEvent,
              sendOffer
            }}
          />
        ) : (
          <EventChooser {...{ event, t, chooseEvent }} />
        )}
      </ModalContentWrapper>
    </Modal>
  );
};

EventModal.propTypes = {
  event: shape().isRequired,
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  lng: string.isRequired,
  t: func.isRequired,
  setEditedEvent: func.isRequired,
  sendOffer: func.isRequired,
  eventType: string.isRequired
};

export default EventModal;
