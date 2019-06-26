import { useState, useEffect } from "react";
import BigCalendar from "react-big-calendar";
import { func, shape, string, number } from "prop-types";
import moment from "moment-timezone";
import CalendarEvent from "../Event";
import CalendarToolbar from "../Toolbar";
import CalendarStyles from "./calendarStyles";
import { parseEvents } from "../utils";
import EventModal from "../Event/EventModal";
import { CalendarWrapper } from "../styled";

const localizer = BigCalendar.momentLocalizer(moment);

const CustomBigCalendar = ({
  t,
  lng,
  events,
  addresses,
  currency,
  defaultView,
  timeZone,
  setEditedEvent,
  sendOffer,
  height,
  eventType
}) => {
  const [event, setEvent] = useState(null);
  useEffect(() => {
    if (event) {
      const parsedEvents = parseEvents(
        events,
        currency,
        defaultView,
        timeZone,
        t
      );
      const updatedEvent = event.resource.id
        ? parsedEvents.find(c => c.resource.id === event.resource.id)
        : parsedEvents.find(c =>
            c.start ? c.start.getTime() === event.start.getTime() : false
          );
      setEvent(updatedEvent);
    }
  }, [events]);

  const toggleModal = newEvent =>
    setEvent(oldEvent => (oldEvent ? null : newEvent));

  return (
    <CalendarWrapper height={height}>
      {timeZone && (
        <>
          <CalendarStyles />
          <BigCalendar
            localizer={localizer}
            components={{
              event: p => <CalendarEvent {...p} />,
              toolbar: CalendarToolbar
            }}
            onSelectEvent={toggleModal}
            onDrillDown={
              () => null /* TODO: After MVP add navigation between views */
            }
            defaultView={defaultView}
            showMultiDayTimes={false}
            events={parseEvents({
              events,
              addresses,
              currency,
              defaultView,
              timeZone,
              t
            })}
            startAccessor="start"
            endAccessor="end"
            step={60}
            timeslots={1}
          />
          {event && (
            <EventModal
              {...{
                isOpen: true,
                onClose: toggleModal,
                event,
                eventType,
                setEditedEvent,
                sendOffer,
                t,
                lng
              }}
            />
          )}
        </>
      )}
    </CalendarWrapper>
  );
};

CustomBigCalendar.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  setEditedEvent: func.isRequired,
  sendOffer: func.isRequired,
  defaultView: string.isRequired,
  timeZone: string,
  currency: string,
  events: shape(),
  addresses: shape(),
  height: number.isRequired,
  eventType: string.isRequired
};

CustomBigCalendar.defaultProps = {
  events: null,
  addresses: null,
  timeZone: null,
  currency: "EUR"
};

export default CustomBigCalendar;
